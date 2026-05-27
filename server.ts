import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON bodies parsing
app.use(express.json());

const CONFIG_FILE_PATH = path.join(process.cwd(), 'profile-config.json');

// Helper to load config
function loadSavedConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const raw = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading saved config file:', err);
  }
  return null;
}

// REST Endpoint to fetch profile-config
app.get('/api/profile-config', (req, res) => {
  const config = loadSavedConfig();
  res.json({ config });
});

// REST Endpoint to update profile-config with password check
app.post('/api/profile-config', (req, res) => {
  const { username, password, config } = req.body;

  // Verify administrator credentials details
  if (username !== 'zhuoyue1102' || password !== 'zhuoyue1102') {
    return res.status(401).json({ success: false, error: 'Incorrect administrator credentials.' });
  }

  if (!config) {
    return res.status(400).json({ success: false, error: 'Missing configuration payload.' });
  }

  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
    res.json({ success: true, config });
  } catch (err: any) {
    console.error('Failed to save profile config:', err);
    res.status(500).json({ success: false, error: 'Failed to write config storage on server.' });
  }
});

// Mock/Static Endpoint to fetch profile stats derived from the edited profile-config
app.get('/api/profile-stats', (req, res) => {
  const saved = loadSavedConfig();
  
  if (saved) {
    res.json({
      scholar: {
        citations: saved.scholarCitations ? parseInt(saved.scholarCitations.replace(/,/g, ''), 10) : 294,
        hIndex: saved.scholarHIndex ? parseInt(saved.scholarHIndex.replace(/,/g, ''), 10) : 5,
        i10Index: saved.scholarI10Index ? parseInt(saved.scholarI10Index.replace(/,/g, ''), 10) : 5,
        name: saved.scholarName || saved.scholarUsername || 'Zhuo Yue',
        papers: []
      },
      bilibili: {
        follower: saved.bilibiliFollower ? parseInt(saved.bilibiliFollower.replace(/,/g, ''), 10) : 18500,
        following: saved.bilibiliFollowing ? parseInt(saved.bilibiliFollowing.replace(/,/g, ''), 10) : 120,
        views: saved.bilibiliViews ? parseInt(saved.bilibiliViews.replace(/,/g, ''), 10) : 650000,
        likes: saved.bilibiliLikes ? parseInt(saved.bilibiliLikes.replace(/,/g, ''), 10) : 28000,
        name: saved.bilibiliName || '卓越的日常',
        bio: saved.bilibiliBio || '卓呆呆啦啦啦 | UID: 284956483',
        videos: []
      },
      instagram: {
        follower: saved.instagramFollower || '1,520',
        following: saved.instagramFollowing || '450',
        posts: saved.instagramPosts || '128',
        name: saved.instagramName || 'Jason Zhao (@jasonlalala_zy)',
        bio: saved.instagramBio || 'Living, learning, and framing lifestyle moments.',
      }
    });
  } else {
    // Default fallback stats
    res.json({
      scholar: { citations: 294, hIndex: 5, i10Index: 5, name: 'Zhuo Yue', papers: [] },
      bilibili: { follower: 18500, following: 120, views: 650000, likes: 28000, name: '卓越的日常', bio: '卓呆呆啦啦啦 | UID: 284956483', videos: [] },
      instagram: { follower: '1,520', following: '450', posts: '128', name: 'Jason Zhao (@jasonlalala_zy)', bio: 'Living, learning, and framing lifestyle moments.' }
    });
  }
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
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Fatal initialization error:', err);
});
