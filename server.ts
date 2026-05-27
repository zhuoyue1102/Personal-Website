import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Set up server-side cache to bypass strict rate limit blocks
interface StatsCache {
  data: any | null;
  lastUpdated: number;
}
let profileStatsCache: StatsCache = {
  data: null,
  lastUpdated: 0,
};

// Auto update and scrapes profiles
async function scrapeDynamicStats() {
  const stats = {
    scholar: {
      citations: 2,
      hIndex: 2,
      i10Index: 2,
      name: 'Y Zhuo',
      avatar: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=Q82dL_IAAAAJ',
      papers: [] as any[],
    },
    bilibili: {
      follower: 18500,
      following: 120,
      views: 650000,
      likes: 28000,
      name: '卓越日常Space',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      bio: '机器学习博士在读 / 自媒体 Vlogger 🎨🤖',
      videos: [] as any[],
    },
    instagram: {
      follower: '2.4K',
      following: '450',
      posts: '128',
      name: 'Jason Zhao (@jasonlalala_zy)',
      avatar: '',
      bio: 'Living, learning, and framing lifestyle moments.',
    }
  };

  // 1. Scraping Google Scholar
  try {
    const response = await fetch('https://scholar.google.com/citations?user=Q82dL_IAAAAJ&hl=en', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (response.ok) {
      const html = await response.text();
      
      // Extraction of core metrics
      const stdMatches = [...html.matchAll(/<td class="gsc_rsb_std">([0-9,]+)<\/td>/g)].map(m => parseInt(m[1].replace(/,/g, ''), 10));
      if (stdMatches.length > 0) {
        stats.scholar.citations = stdMatches[0] || stats.scholar.citations;
        stats.scholar.hIndex = stdMatches[2] || stats.scholar.hIndex;
        stats.scholar.i10Index = stdMatches[4] || stats.scholar.i10Index;
      }

      // Name extraction
      const nameMatch = html.match(/id="gsc_prf_in">([^<]+)</);
      if (nameMatch) {
        stats.scholar.name = nameMatch[1].trim();
      }

      // Avatar extraction
      const avatarMatch = html.match(/id="gsc_prf_pup-art"\s*src="([^"]+)"/);
      if (avatarMatch) {
        let scholarAvatar = avatarMatch[1];
        if (!scholarAvatar.startsWith('http')) {
          scholarAvatar = 'https://scholar.google.com' + scholarAvatar;
        }
        stats.scholar.avatar = scholarAvatar;
      }

      // Top Publication papers extraction
      const paperRows = html.match(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g);
      if (paperRows) {
        const parsedPapers = [];
        for (const row of paperRows.slice(0, 5)) {
          const titleMatch = row.match(/class="gsc_a_at">([^<]+)<\/a>/);
          const authorMatch = row.match(/<div class="gs_gray">([^<]+)<\/div>/);
          const venueMatches = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)];
          const yearMatch = row.match(/<span class="gsc_a_h gsc_a_y">(\d+)<\/span>/);
          const citeMatch = row.match(/class="gsc_a_ac[^"]*">([\s\S]*?)<\/a>/);
          const linkMatch = row.match(/href="([^"]+)"\s*class="gsc_a_at"/);

          const title = titleMatch ? titleMatch[1].trim() : '';
          const authors = authorMatch ? authorMatch[1].trim() : '';
          const venueText = venueMatches[1] ? venueMatches[1][1].trim() : '';
          const year = yearMatch ? yearMatch[1] : '2025';
          const citeVal = citeMatch ? parseInt(citeMatch[1].trim().replace(/[^0-9]/g, '') || '0', 10) : 0;
          const link = linkMatch ? 'https://scholar.google.com' + linkMatch[1].replace(/&amp;/g, '&') : '';

          if (title) {
            parsedPapers.push({
              title,
              authors,
              journal: venueText ? venueText.replace(/,\s*\d+$/, '') : 'Publication Venue Info',
              year,
              citations: citeVal,
              url: link
            });
          }
        }
        if (parsedPapers.length > 0) {
          stats.scholar.papers = parsedPapers;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching/scraping Google Scholar:', err);
  }

  // 2. Fetching Bilibili
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://space.bilibili.com/284956483'
    };

    const [infoRes, statRes, upstatRes] = await Promise.all([
      fetch('https://api.bilibili.com/x/space/acc/info?mid=284956483', { headers }).then(r => r.json() as any).catch(() => null),
      fetch('https://api.bilibili.com/x/relation/stat?vmid=284956483', { headers }).then(r => r.json() as any).catch(() => null),
      fetch('https://api.bilibili.com/x/space/upstat?mid=284956483', { headers }).then(r => r.json() as any).catch(() => null),
    ]);

    if (infoRes && infoRes.code === 0 && infoRes.data) {
      stats.bilibili.name = infoRes.data.name || stats.bilibili.name;
      stats.bilibili.avatar = infoRes.data.face || stats.bilibili.avatar;
      stats.bilibili.bio = infoRes.data.sign || stats.bilibili.bio;
    }

    if (statRes && statRes.code === 0 && statRes.data) {
      stats.bilibili.follower = statRes.data.follower || stats.bilibili.follower;
      stats.bilibili.following = statRes.data.following || stats.bilibili.following;
    }

    if (upstatRes && upstatRes.code === 0 && upstatRes.data) {
      stats.bilibili.views = upstatRes.data.archive?.view || stats.bilibili.views;
      stats.bilibili.likes = upstatRes.data.likes || stats.bilibili.likes;
    }
  } catch (err) {
    console.error('Error fetching Bilibili APIs:', err);
  }

  // 3. Scraping Instagram
  try {
    const res = await fetch('https://www.instagram.com/jasonlalala_zy/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (res.ok) {
      const text = await res.text();
      // Scan for meta content tags containing numbers and Followers/Following keywords
      const followersMatch = text.match(/([0-9,.]+)\s*Followers/i);
      const followingMatch = text.match(/([0-9,.]+)\s*Following/i);
      const postsMatch = text.match(/([0-9,.]+)\s*Posts/i);

      if (followersMatch) stats.instagram.follower = followersMatch[1];
      if (followingMatch) stats.instagram.following = followingMatch[1];
      if (postsMatch) stats.instagram.posts = postsMatch[1];

      const nameMatch = text.match(/<title>([^<]+)<\/title>/i);
      if (nameMatch) {
        const rawTitle = nameMatch[1].trim(); // Usually is: "Jason Zhao (@jasonlalala_zy) • Instagram photos and videos"
        stats.instagram.name = rawTitle.split('•')[0].trim();
      }
    }
  } catch (err) {
    console.error('Error scraping Instagram details:', err);
  }

  return stats;
}

// REST Endpoint to fetch profile updates
app.get('/api/profile-stats', async (req, res) => {
  const cacheDuration = 10 * 60 * 1000; // 10 minute server caching to avoid rate limit bans
  const now = Date.now();

  if (profileStatsCache.data && (now - profileStatsCache.lastUpdated) < cacheDuration) {
    return res.json({ ...profileStatsCache.data, fromCache: true });
  }

  const freshStats = await scrapeDynamicStats();
  profileStatsCache = {
    data: freshStats,
    lastUpdated: now,
  };

  res.json({ ...freshStats, fromCache: false });
});

// Setup Vite & static assets routing
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dynamic stats server active at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Fatal initialization error:', err);
});
