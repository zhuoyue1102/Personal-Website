export interface LinkItem {
  id: 'instagram' | 'bilibili' | 'scholar';
  label: string;
  url: string;
  platform: string;
  description: string;
  username: string;
}

export interface ScholarPaper {
  title: string;
  authors: string;
  journal: string;
  year: string;
  citations: string;
  url: string;
}

export interface InstagramPost {
  url: string;
  imageUrl: string;
  likes?: string;
  comments?: string;
}

export interface BilibiliVideo {
  title: string;
  duration: string;
  imageUrl: string;
  url: string;
  likes: string;
  comments: string;
  playCount: string;
}

export interface ProfileConfig {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  darkBannerUrl?: string;
  instagramUrl: string;
  instagramUsername: string;
  bilibiliUrl: string;
  bilibiliUsername: string;
  scholarUrl: string;
  scholarUsername: string;
  themePreset: 'warm-sand' | 'minimal-charcoal' | 'emerald-glass' | 'cosmic' | 'sakura' | 'auto';

  // Manual metrics/data for Bilibili, Instagram, Scholar to allow manually editing
  scholarCitations: string;
  scholarHIndex: string;
  scholarI10Index: string;
  scholarName: string;
  
  instagramFollower: string;
  instagramFollowing: string;
  instagramPosts: string;
  instagramName: string;
  instagramBio: string;
  
  bilibiliFollower: string;
  bilibiliFollowing: string;
  bilibiliViews: string;
  bilibiliLikes: string;
  bilibiliName: string;
  bilibiliBio: string;

  // New customizable lists
  scholarPapers?: ScholarPaper[];
  instagramPostsList?: InstagramPost[];
  bilibiliVideosList?: BilibiliVideo[];
}
