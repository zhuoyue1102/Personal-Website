import { ProfileConfig } from './types';

export const DEFAULT_PROFILE: ProfileConfig = {
  name: 'Zhuo Yue',
  title: 'Content Creator & Academic Researcher',
  bio: "NUS master's student currently studying biomedical engineering. Beyond research, I explore photography, especially film photography, alongside PC building and driving.",
  location: 'Ningbo / Singapore',
  email: 'zhuoyue1102@gmail.com',
  avatarUrl: '/src/assets/images/profile_photo_new_1779843145487.png',
  bannerUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200&h=400',
  darkBannerUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200&h=400',
  instagramUrl: 'https://www.instagram.com/jasonlalala_zy/',
  instagramUsername: '@jasonlalala_zy',
  bilibiliUrl: 'https://space.bilibili.com/284956483',
  bilibiliUsername: '卓呆呆啦啦啦 (UID 284956483)',
  scholarUrl: 'https://scholar.google.com/citations?user=Q82dL_IAAAAJ&hl=en',
  scholarUsername: 'Zhuo Yue',
  themePreset: 'auto',

  // Default editable manual stats
  scholarCitations: '294',
  scholarHIndex: '5',
  scholarI10Index: '5',
  scholarName: 'Zhuo Yue',
  
  instagramFollower: '1,520',
  instagramFollowing: '450',
  instagramPosts: '128',
  instagramName: 'Jason Zhao (@jasonlalala_zy)',
  instagramBio: 'Living, learning, and framing lifestyle moments.',
  
  bilibiliFollower: '18,500',
  bilibiliFollowing: '120',
  bilibiliViews: '650,000',
  bilibiliLikes: '28,000',
  bilibiliName: '卓越的日常',
  bilibiliBio: '卓呆呆啦啦啦 | UID: 284956483',

  scholarPapers: [
    {
      title: 'Enhancing drug solubility, bioavailability, and targeted therapeutic applications through magnetic nanoparticles',
      authors: 'Y Zhuo, YG Zhao, Y Zhang',
      journal: 'Molecules 29 (20), 4854',
      year: '2024',
      citations: '179',
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Q82dL_IAAAAJ&citation_for_view=Q82dL_IAAAAJ:u-x6o8ySG0sC',
    },
    {
      title: 'Ionic liquids in pharmaceutical and biomedical applications: A review',
      authors: 'Y Zhuo, HL Cheng, YG Zhao, HR Cui',
      journal: 'Pharmaceutics 16 (1), 151',
      year: '2024',
      citations: '115',
      url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Q82dL_IAAAAJ&citation_for_view=Q82dL_IAAAAJ:u5HHmVD_uO8C',
    }
  ],
  instagramPostsList: [
    {
      url: 'https://www.instagram.com/p/DYuiCVkk3-P/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DYuiCVkk3-P/media/?size=l',
      likes: '142',
      comments: '12',
    },
    {
      url: 'https://www.instagram.com/p/DMIx7jRSPKK/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DMIx7jRSPKK/media/?size=l',
      likes: '98',
      comments: '8',
    },
    {
      url: 'https://www.instagram.com/p/DLP3-hRSXX8/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DLP3-hRSXX8/media/?size=l',
      likes: '120',
      comments: '15',
    },
    {
      url: 'https://www.instagram.com/p/DKs-GxEyxs6/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DKs-GxEyxs6/media/?size=l',
      likes: '175',
      comments: '19',
    },
    {
      url: 'https://www.instagram.com/p/DDV0IQPTkIs/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DDV0IQPTkIs/media/?size=l',
      likes: '210',
      comments: '26',
    },
    {
      url: 'https://www.instagram.com/p/DDKLxItObfR/?img_index=1',
      imageUrl: 'https://www.instagram.com/p/DDKLxItObfR/media/?size=l',
      likes: '114',
      comments: '9',
    }
  ],
  bilibiliVideosList: [
    {
      title: '【卓越日常】我的读博生存指南 | 论文写作与自律习惯 🎓🔥',
      playCount: '194K',
      duration: '14:25',
      likes: '12K',
      comments: '3.4K',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=380',
      url: 'https://space.bilibili.com',
    },
    {
      title: '科研人日常！当机器学习博士搞起短视频自媒体 📷🤖',
      playCount: '87K',
      duration: '11:12',
      likes: '6.2K',
      comments: '958',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=380',
      url: 'https://space.bilibili.com',
    },
    {
      title: '极简学术风书房桌面搭建 2.0 | 效率与仪式感并存 💻✨',
      playCount: '312K',
      duration: '08:48',
      likes: '28K',
      comments: '5.1K',
      imageUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=600&h=380',
      url: 'https://space.bilibili.com',
    }
  ]
};

export interface ThemeColors {
  name: string;
  bg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  glowingAccent?: string;
}

export const THEME_PRESETS: Record<Exclude<ProfileConfig['themePreset'], 'auto'>, ThemeColors> = {
  'warm-sand': {
    name: 'Liquid Amber',
    bg: 'bg-[#FAF6F0] text-[#2F2922] relative overflow-hidden',
    cardBg: 'bg-white/45 backdrop-blur-xl border-white/50 shadow-[0_8px_32px_0_rgba(118,94,71,0.06)]',
    textPrimary: 'text-[#2F2922]',
    textSecondary: 'text-[#6E6458]',
    accent: 'bg-[#765E47] text-[#FCFBFA]',
    accentHover: 'hover:bg-[#5C4835]',
    border: 'border-white/40',
  },
  'minimal-charcoal': {
    name: 'Tech Glass',
    bg: 'bg-[#F2F4F7] text-[#0F172A] relative overflow-hidden',
    cardBg: 'bg-white/50 backdrop-blur-xl border-white/60 shadow-[0_8px_32px_0_rgba(15,23,42,0.05)]',
    textPrimary: 'text-[#0F172A]',
    textSecondary: 'text-[#64748B]',
    accent: 'bg-[#0F172A] text-white',
    accentHover: 'hover:bg-[#202E4E]',
    border: 'border-white/40',
  },
  'emerald-glass': {
    name: 'Mint Refresh',
    bg: 'bg-gradient-to-br from-[#E2F1E7] to-[#C9E4D4] text-[#1E392A] relative overflow-hidden',
    cardBg: 'bg-white/30 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_0_rgba(46,107,71,0.06)]',
    textPrimary: 'text-[#1B3524]',
    textSecondary: 'text-[#4A6E56]',
    accent: 'bg-[#2E6B47] text-[#FCFBFA]',
    accentHover: 'hover:bg-[#205234]',
    border: 'border-white/30',
  },
  'cosmic': {
    name: 'Liquid Cosmic',
    bg: 'bg-[#06060c] text-[#FAFAFA] relative overflow-hidden',
    cardBg: 'bg-[#0d0d15]/55 backdrop-blur-xl border-white/[0.06] shadow-[0_12px_40px_0_rgba(139,92,246,0.1)]',
    textPrimary: 'text-[#FAFAFA]',
    textSecondary: 'text-[#A1A1AA]',
    accent: 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]',
    accentHover: 'hover:bg-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
    border: 'border-white/[0.08]',
    glowingAccent: 'from-blue-500/10 via-violet-500/10 to-transparent',
  },
  'sakura': {
    name: 'Rose Glass',
    bg: 'bg-[#FFF3F5] text-[#4A1D24] relative overflow-hidden',
    cardBg: 'bg-[#FFFFFF]/45 backdrop-blur-xl border-white/60 shadow-[0_8px_32px_0_rgba(243,58,95,0.05)]',
    textPrimary: 'text-[#4A1D24]',
    textSecondary: 'text-[#8E565F]',
    accent: 'bg-[#F33A5F] text-white',
    accentHover: 'hover:bg-[#D6224A]',
    border: 'border-white/40',
  },
};

export const MOCK_SCHOLAR_PAPERS = [
  {
    title: 'Enhancing drug solubility, bioavailability, and targeted therapeutic applications through magnetic nanoparticles',
    authors: 'Y Zhuo, YG Zhao, Y Zhang',
    journal: 'Molecules 29 (20), 4854',
    year: '2024',
    citations: 179,
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Q82dL_IAAAAJ&citation_for_view=Q82dL_IAAAAJ:u-x6o8ySG0sC',
  },
  {
    title: 'Ionic liquids in pharmaceutical and biomedical applications: A review',
    authors: 'Y Zhuo, HL Cheng, YG Zhao, HR Cui',
    journal: 'Pharmaceutics 16 (1), 151',
    year: '2024',
    citations: 115,
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Q82dL_IAAAAJ&citation_for_view=Q82dL_IAAAAJ:u5HHmVD_uO8C',
  }
];

export const MOCK_BILIBILI_VIDEOS = [
  {
    title: '【卓越日常】我的读博生存指南 | 论文写作与自律习惯 🎓🔥',
    playCount: '194K',
    danmakuCount: '3.4K',
    duration: '14:25',
    likes: '12K',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=380',
    url: 'https://space.bilibili.com',
  },
  {
    title: '科研人日常！当机器学习博士搞起短视频自媒体 📷🤖',
    playCount: '87K',
    danmakuCount: '958',
    duration: '11:12',
    likes: '6.2K',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=380',
    url: 'https://space.bilibili.com',
  },
  {
    title: '极简学术风书房桌面搭建 2.0 | 效率与仪式感并存 💻✨',
    playCount: '312K',
    danmakuCount: '5.1K',
    duration: '08:48',
    likes: '28K',
    imageUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=600&h=380',
    url: 'https://space.bilibili.com',
  },
];

export const MOCK_INSTAGRAM_POSTS = [
  {
    url: 'https://www.instagram.com/p/DYuiCVkk3-P/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DYuiCVkk3-P/media/?size=l',
    likes: '142',
    comments: '12',
  },
  {
    url: 'https://www.instagram.com/p/DMIx7jRSPKK/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DMIx7jRSPKK/media/?size=l',
    likes: '98',
    comments: '8',
  },
  {
    url: 'https://www.instagram.com/p/DLP3-hRSXX8/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DLP3-hRSXX8/media/?size=l',
    likes: '120',
    comments: '15',
  },
  {
    url: 'https://www.instagram.com/p/DKs-GxEyxs6/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DKs-GxEyxs6/media/?size=l',
    likes: '175',
    comments: '19',
  },
  {
    url: 'https://www.instagram.com/p/DDV0IQPTkIs/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DDV0IQPTkIs/media/?size=l',
    likes: '210',
    comments: '26',
  },
  {
    url: 'https://www.instagram.com/p/DDKLxItObfR/?img_index=1',
    imageUrl: 'https://www.instagram.com/p/DDKLxItObfR/media/?size=l',
    likes: '114',
    comments: '9',
  },
];
