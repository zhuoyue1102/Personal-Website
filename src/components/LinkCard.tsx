import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, GraduationCap, Video, ExternalLink, Bookmark, Award, Play, Eye, Flame, Share2, Sparkles, ArrowUpRight } from 'lucide-react';
import { ProfileConfig, LinkItem } from '../types';
import { ThemeColors, MOCK_SCHOLAR_PAPERS, MOCK_BILIBILI_VIDEOS, MOCK_INSTAGRAM_POSTS } from '../data';

interface LinkCardProps {
  platform: 'instagram' | 'bilibili' | 'scholar';
  config: ProfileConfig;
  colors: ThemeColors;
  liveStats?: any;
}

export default function LinkCard({ platform, config, colors, liveStats }: LinkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'W';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return String(num);
  };

  const getPlatformDetails = () => {
    switch (platform) {
      case 'scholar': {
        const citations = config.scholarCitations || String(liveStats?.scholar?.citations || '294');
        const hIndex = config.scholarHIndex || String(liveStats?.scholar?.hIndex || '5');
        const i10Index = config.scholarI10Index || String(liveStats?.scholar?.i10Index || '5');
        return {
          title: 'Google Scholar',
          username: config.scholarName || liveStats?.scholar?.name || config.scholarUsername || 'Zhuo Yue',
          url: config.scholarUrl,
          icon: <GraduationCap className="w-6 h-6 text-indigo-400" id="icon-scholar" />,
          colorTheme: 'from-[#e0e7ff] to-[#c7d2fe]',
          badgeText: 'Academic Profile',
          description: `Peer-reviewed publications, citation index, and biomedical machine learning models. H-Index: ${hIndex} | i10-Index: ${i10Index}`,
          quickStats: { main: citations, label: 'Citations', sub: `H-Index: ${hIndex}` },
        };
      }
      case 'instagram': {
        const follower = config.instagramFollower || liveStats?.instagram?.follower || '1,520';
        const posts = config.instagramPosts || liveStats?.instagram?.posts || '128';
        return {
          title: 'Instagram',
          username: config.instagramUsername || '@jasonlalala_zy',
          url: config.instagramUrl,
          icon: <Instagram className="w-6 h-6 text-pink-500" id="icon-instagram" />,
          colorTheme: 'from-[#fdf2f8] to-[#fbcfe8]',
          badgeText: 'Lifestyle & Photography',
          description: config.instagramBio || 'Visual chronicles, capture frames, travel logs, and transient thoughts.',
          quickStats: { main: follower, label: 'Followers', sub: `${posts} Posts` },
        };
      }
      case 'bilibili': {
        const follower = config.bilibiliFollower || (liveStats?.bilibili?.follower !== undefined ? formatNumber(liveStats.bilibili.follower) : '18,500');
        const views = config.bilibiliViews || (liveStats?.bilibili?.views !== undefined ? formatNumber(liveStats.bilibili.views) : '650,000');
        const bBio = config.bilibiliBio || liveStats?.bilibili?.bio || '卓呆呆啦啦啦 | UID: 284956483';
        return {
          title: 'Bilibili',
          username: config.bilibiliName || liveStats?.bilibili?.name || '卓越的日常',
          url: config.bilibiliUrl,
          icon: <Video className="w-6 h-6 text-sky-400" id="icon-bilibili" />,
          colorTheme: 'from-[#e0f2fe] to-[#bae6fd]',
          badgeText: 'Vlogs & Tech Sharing',
          description: bBio,
          quickStats: { main: follower, label: 'Subs', sub: `${views} Views` },
        };
      }
    }
  };

  const details = getPlatformDetails();

  const cleanJournalName = (journal: string) => {
    if (!journal) return '';
    const digitIndex = journal.search(/\s\d+/);
    if (digitIndex !== -1) {
      return journal.substring(0, digitIndex).replace(/,\s*$/, '').trim();
    }
    return journal.trim();
  };

  const papersToUse = config.scholarPapers && config.scholarPapers.length > 0 
    ? config.scholarPapers 
    : (liveStats?.scholar?.papers?.length > 0 ? liveStats.scholar.papers : MOCK_SCHOLAR_PAPERS);

  return (
    <motion.div
      layout
      id={`link-card-${platform}`}
      className={`rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${colors.cardBg} ${colors.border}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Decorative subtle background block for Cosmic Slate */}
      {colors.glowingAccent && (
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.glowingAccent} pointer-events-none`} />
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${details.colorTheme} shadow-sm flex items-center justify-center`}>
            {details.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-display text-xl font-bold ${colors.textPrimary}`}>
                {details.title}
              </h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono font-medium bg-black/5 dark:bg-white/10 text-gray-500">
                {details.badgeText}
              </span>
            </div>
            <p className="text-sm font-mono text-indigo-500 font-medium mt-0.5">
              {details.username}
            </p>
            <p className={`text-sm mt-2 max-w-lg leading-relaxed ${colors.textSecondary}`}>
              {details.description}
            </p>
          </div>
        </div>

        {/* Quick Statistics Tag */}
        <div className="flex md:flex-col items-center md:items-end justify-between border-t border-gray-100 dark:border-zinc-800/50 md:border-0 pt-3 md:pt-0 mt-3 md:mt-0">
          <div className="text-left md:text-right">
            <span className={`block font-display text-2xl font-black ${colors.textPrimary}`}>
              {details.quickStats.main}
            </span>
            <span className={`block text-[10px] tracking-wide uppercase font-mono ${colors.textSecondary}`}>
              {details.quickStats.label} {details.quickStats.sub ? `(${details.quickStats.sub})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Accordion / Embedded Content section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-6 border-t border-gray-100 dark:border-zinc-800 pt-5"
          >
            {platform === 'scholar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs uppercase tracking-widest font-mono font-bold ${colors.textSecondary} flex items-center gap-1.5`}>
                    <Award className="w-3.5 h-3.5 text-yellow-500" /> Recent Publications
                  </h4>
                </div>

                <div className="space-y-3">
                  {papersToUse.map((paper: any, idx: number) => (
                    <a
                      key={idx}
                      href={paper.url || details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/[0.03] flex items-center justify-between gap-4 group hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer text-left"
                    >
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <h5 className={`font-medium text-xs md:text-sm leading-snug ${colors.textPrimary} group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5`}>
                          <span className="line-clamp-2 md:line-clamp-none">{paper.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-indigo-500 dark:text-indigo-400" />
                        </h5>
                        <p className={`text-[11px] font-mono ${colors.textSecondary}`}>
                          {paper.authors} • <span className="italic">{cleanJournalName(paper.journal)}</span> ({paper.year})
                        </p>
                      </div>

                      {paper.citations !== undefined && (
                        <div className="flex flex-col items-center justify-center shrink-0 min-w-[72px] px-2.5 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/15 text-center">
                          <span className="text-sm md:text-base font-black font-mono leading-none">
                            {paper.citations}
                          </span>
                          <span className="text-[8px] md:text-[9px] uppercase tracking-wider font-mono opacity-80 mt-1 leading-none">
                            Citations
                          </span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {platform === 'instagram' && (() => {
              const postsToUse = config.instagramPostsList && config.instagramPostsList.length > 0
                ? config.instagramPostsList
                : MOCK_INSTAGRAM_POSTS;
              return (
                <div className="space-y-3">
                  <h4 className={`text-xs uppercase tracking-widest font-mono font-bold ${colors.textSecondary} flex items-center gap-1.5`}>
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Recent Frames Feed
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {postsToUse.map((post: any, idx: number) => (
                      <a
                        key={idx}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer border border-black/5 dark:border-white/5 block"
                      >
                        <img
                          src={post.imageUrl}
                          alt="Instagram Feed Item"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

            {platform === 'bilibili' && (() => {
              const videosToUse = config.bilibiliVideosList && config.bilibiliVideosList.length > 0
                ? config.bilibiliVideosList
                : MOCK_BILIBILI_VIDEOS;
              return (
                <div className="space-y-3">
                  <h4 className={`text-xs uppercase tracking-widest font-mono font-bold ${colors.textSecondary} flex items-center gap-1.5`}>
                    <Flame className="w-3.5 h-3.5 text-orange-500" /> Latest Uploaded Videos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {videosToUse.map((video: any, idx: number) => (
                      <a
                        key={idx}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/[0.03] group hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all block"
                      >
                        <div className="aspect-video relative overflow-hidden bg-zinc-850">
                          <img
                            src={video.imageUrl}
                            alt="Video Cover"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex justify-between items-center text-[10px] text-white font-mono">
                            <span className="flex items-center gap-0.5">
                              {video.playCount ? (
                                <>
                                  <Eye className="w-3 h-3 text-sky-400" /> {video.playCount}
                                </>
                              ) : null}
                            </span>
                            <span>{video.duration}</span>
                          </div>
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-2.5 rounded-full bg-sky-500 text-white shadow-lg">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 text-left">
                          <h5 className="font-medium text-xs leading-snug line-clamp-2 text-zinc-800 dark:text-zinc-200 group-hover:text-sky-500 transition-colors">
                            {video.title}
                          </h5>
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-2">
                            <span>👍 {video.likes} likes</span>
                            <span>💬 {video.comments || video.danmakuCount || '0'} dm</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer controls inside card */}
      <div className="flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.04] pt-4 mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shadow-sm ${
            isExpanded
              ? 'bg-zinc-800 dark:bg-zinc-200 text-[#fcfbfa] dark:text-[#1a1a1a]'
              : 'bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] ' + colors.textSecondary
          } cursor-pointer`}
        >
          {isExpanded ? 'Hide Previews' : `Reveal Feed Preview`}
        </button>

        <a
          href={details.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold ${colors.accent} ${colors.accentHover} transition-all shadow-sm`}
        >
          <span>Visit Official</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
