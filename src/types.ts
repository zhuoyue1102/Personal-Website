export interface LinkItem {
  id: 'instagram' | 'bilibili' | 'scholar';
  label: string;
  url: string;
  platform: string;
  description: string;
  username: string;
}

export interface ProfileConfig {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  instagramUrl: string;
  instagramUsername: string;
  bilibiliUrl: string;
  bilibiliUsername: string;
  scholarUrl: string;
  scholarUsername: string;
  themePreset: 'warm-sand' | 'minimal-charcoal' | 'emerald-glass' | 'cosmic' | 'sakura';
}
