import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, Palette, RefreshCw, Sparkles, User, GraduationCap, 
  Instagram, Video, Lock, LogOut, MapPin, Mail, Image, Link, FileText
} from 'lucide-react';
import { ProfileConfig } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProfileConfig;
  onSave: (newConfig: ProfileConfig) => void;
  onReset?: () => void;
}

type TabType = 'profile' | 'scholar' | 'instagram' | 'bilibili';

export default function EditProfileModal({ isOpen, onClose, config, onSave, onReset }: EditProfileModalProps) {
  // Authorization credentials state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Persistence of login state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });

  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Input states mapped from ProfileConfig
  const [name, setName] = useState(config.name);
  const [title, setTitle] = useState(config.title);
  const [bio, setBio] = useState(config.bio);
  const [location, setLocation] = useState(config.location);
  const [email, setEmail] = useState(config.email);
  const [avatarUrl, setAvatarUrl] = useState(config.avatarUrl);
  const [bannerUrl, setBannerUrl] = useState(config.bannerUrl);
  const [themePreset, setThemePreset] = useState<ProfileConfig['themePreset']>(config.themePreset);

  // Stats input states
  const [scholarUrl, setScholarUrl] = useState(config.scholarUrl);
  const [scholarUsername, setScholarUsername] = useState(config.scholarUsername);
  const [scholarCitations, setScholarCitations] = useState(config.scholarCitations || '294');
  const [scholarHIndex, setScholarHIndex] = useState(config.scholarHIndex || '5');
  const [scholarI10Index, setScholarI10Index] = useState(config.scholarI10Index || '5');
  const [scholarName, setScholarName] = useState(config.scholarName || 'Zhuo Yue');

  const [instagramUrl, setInstagramUrl] = useState(config.instagramUrl);
  const [instagramUsername, setInstagramUsername] = useState(config.instagramUsername);
  const [instagramFollower, setInstagramFollower] = useState(config.instagramFollower || '1,520');
  const [instagramFollowing, setInstagramFollowing] = useState(config.instagramFollowing || '450');
  const [instagramPosts, setInstagramPosts] = useState(config.instagramPosts || '128');
  const [instagramName, setInstagramName] = useState(config.instagramName || 'Jason Zhao (@jasonlalala_zy)');
  const [instagramBio, setInstagramBio] = useState(config.instagramBio || 'Living, learning, and framing lifestyle moments.');

  const [bilibiliUrl, setBilibiliUrl] = useState(config.bilibiliUrl);
  const [bilibiliUsername, setBilibiliUsername] = useState(config.bilibiliUsername);
  const [bilibiliFollower, setBilibiliFollower] = useState(config.bilibiliFollower || '18,500');
  const [bilibiliFollowing, setBilibiliFollowing] = useState(config.bilibiliFollowing || '120');
  const [bilibiliViews, setBilibiliViews] = useState(config.bilibiliViews || '650,000');
  const [bilibiliLikes, setBilibiliLikes] = useState(config.bilibiliLikes || '28,000');
  const [bilibiliName, setBilibiliName] = useState(config.bilibiliName || '卓越的日常');
  const [bilibiliBio, setBilibiliBio] = useState(config.bilibiliBio || '卓呆呆啦啦啦 | UID: 284956483');

  const [scholarPapers, setScholarPapers] = useState<any[]>(config.scholarPapers || []);
  const [instagramPostsList, setInstagramPostsList] = useState<any[]>(config.instagramPostsList || []);
  const [bilibiliVideosList, setBilibiliVideosList] = useState<any[]>(config.bilibiliVideosList || []);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

  const handleAddPaper = () => {
    setScholarPapers([...scholarPapers, { title: '', authors: '', journal: '', year: (new Date().getFullYear().toString()), citations: '0', url: '' }]);
  };

  const handleRemovePaper = (index: number) => {
    setScholarPapers(scholarPapers.filter((_, i) => i !== index));
  };

  const handlePaperChange = (index: number, field: string, value: string) => {
    setScholarPapers(scholarPapers.map((paper, i) => i === index ? { ...paper, [field]: value } : paper));
  };

  const handleAddInstaPost = () => {
    setInstagramPostsList([...instagramPostsList, { url: '', imageUrl: '' }]);
  };

  const handleRemoveInstaPost = (index: number) => {
    setInstagramPostsList(instagramPostsList.filter((_, i) => i !== index));
  };

  const handleInstaPostChange = (index: number, field: string, value: string) => {
    setInstagramPostsList(instagramPostsList.map((post, i) => i === index ? { ...post, [field]: value } : post));
  };

  const handleAddBiliVideo = () => {
    setBilibiliVideosList([...bilibiliVideosList, { title: '', duration: '10:00', imageUrl: '', url: 'https://space.bilibili.com', likes: '0', comments: '0', playCount: '' }]);
  };

  const handleRemoveBiliVideo = (index: number) => {
    setBilibiliVideosList(bilibiliVideosList.filter((_, i) => i !== index));
  };

  const handleBiliVideoChange = (index: number, field: string, value: string) => {
    setBilibiliVideosList(bilibiliVideosList.map((video, i) => i === index ? { ...video, [field]: value } : video));
  };

  // Sync state whenever configuration changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setName(config.name);
      setTitle(config.title);
      setBio(config.bio);
      setLocation(config.location);
      setEmail(config.email);
      setAvatarUrl(config.avatarUrl);
      setBannerUrl(config.bannerUrl);
      setThemePreset(config.themePreset);

      setScholarUrl(config.scholarUrl);
      setScholarUsername(config.scholarUsername);
      setScholarCitations(config.scholarCitations || '294');
      setScholarHIndex(config.scholarHIndex || '5');
      setScholarI10Index(config.scholarI10Index || '5');
      setScholarName(config.scholarName || 'Zhuo Yue');

      setInstagramUrl(config.instagramUrl);
      setInstagramUsername(config.instagramUsername);
      setInstagramFollower(config.instagramFollower || '1,520');
      setInstagramFollowing(config.instagramFollowing || '450');
      setInstagramPosts(config.instagramPosts || '128');
      setInstagramName(config.instagramName || 'Jason Zhao (@jasonlalala_zy)');
      setInstagramBio(config.instagramBio || 'Living, learning, and framing lifestyle moments.');

      setBilibiliUrl(config.bilibiliUrl);
      setBilibiliUsername(config.bilibiliUsername);
      setBilibiliFollower(config.bilibiliFollower || '18,500');
      setBilibiliFollowing(config.bilibiliFollowing || '120');
      setBilibiliViews(config.bilibiliViews || '650,000');
      setBilibiliLikes(config.bilibiliLikes || '28,000');
      setBilibiliName(config.bilibiliName || '卓越的日常');
      setBilibiliBio(config.bilibiliBio || '卓呆呆啦啦啦 | UID: 284956483');

      setScholarPapers(config.scholarPapers || []);
      setInstagramPostsList(config.instagramPostsList || []);
      setBilibiliVideosList(config.bilibiliVideosList || []);
      
      setSaveMessage({ text: '', type: '' });
      setLoginError('');
    }
  }, [config, isOpen]);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'zhuoyue1102' && passwordInput === 'zhuoyue1102') {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_user', 'zhuoyue1102');
      localStorage.setItem('admin_pwd', 'zhuoyue1102');
    } else {
      setLoginError('账号或密码不正确，请重新输入');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_pwd');
    setUsernameInput('');
    setPasswordInput('');
  };

  // Handle Saving of configuration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ text: '', type: '' });

    const newConfig: ProfileConfig = {
      name,
      title,
      bio,
      location,
      email,
      avatarUrl,
      bannerUrl,
      themePreset,
      
      scholarUrl,
      scholarUsername,
      scholarCitations,
      scholarHIndex,
      scholarI10Index,
      scholarName,

      instagramUrl,
      instagramUsername,
      instagramFollower,
      instagramFollowing,
      instagramPosts,
      instagramName,
      instagramBio,

      bilibiliUrl,
      bilibiliUsername,
      bilibiliFollower,
      bilibiliFollowing,
      bilibiliViews,
      bilibiliLikes,
      bilibiliName,
      bilibiliBio,

      scholarPapers,
      instagramPostsList,
      bilibiliVideosList,
    };

    // Attempt to persist config server-side with authorization details!
    const savedUser = localStorage.getItem('admin_user') || 'zhuoyue1102';
    const savedPwd = localStorage.getItem('admin_pwd') || 'zhuoyue1102';

    try {
      const response = await fetch('/api/profile-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: savedUser,
          password: savedPwd,
          config: newConfig,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSaveMessage({ text: '全站内容配置已成功同步保存至服务器！', type: 'success' });
        
        // Pass up updated state to trigger client state change
        onSave(newConfig);
        
        // Safely close dialog after a tiny informative delay
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setSaveMessage({ text: `保存失败: ${data.error || '无法保存到服务器'}`, type: 'error' });
      }
    } catch (err) {
      console.error('Failed to submit configuration details:', err);
      setSaveMessage({ text: '由于网络请求发生异常，已退回到本地缓存保存。', type: 'error' });
      // Keep state locally as backup fallback
      onSave(newConfig);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const presetOptions: Array<{
    id: ProfileConfig['themePreset'];
    label: string;
    colors: string[];
  }> = [
    { id: 'auto', label: 'Auto (时间自适应)', colors: ['bg-[#FAF6F0]', 'bg-[#09090B]'] },
    { id: 'warm-sand', label: 'Warm Sand (暖沙☀️)', colors: ['bg-[#FAF6F0]', 'bg-[#765E47]'] },
    { id: 'cosmic', label: 'Cosmic (梦幻极客🌙)', colors: ['bg-[#09090B]', 'bg-[#8B5CF6]'] },
    { id: 'minimal-charcoal', label: 'Charcoal (经典简约)', colors: ['bg-[#F2F4F7]', 'bg-[#0F172A]'] },
    { id: 'emerald-glass', label: 'Emerald (绿野复古)', colors: ['bg-[#C9E4D4]', 'bg-[#2E6B47]'] },
    { id: 'sakura', label: 'Sakura (春櫻流沙)', colors: ['bg-[#FFF3F5]', 'bg-[#F33A5F]'] },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 flex flex-col h-[85vh] max-h-[750px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800/80 shrink-0">
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-500" /> 
                {isLoggedIn ? '后台内容管理器 (Admin Deck)' : '管理员权限验证 (Admin Verify)'}
              </h2>
              <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                {isLoggedIn ? 'Configure page texts, images, hyperlinks, and metrics' : 'Requires administrator credentials to alter contents'}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-[10px] font-bold font-mono text-rose-500 border border-rose-500/25 bg-rose-500/5 hover:bg-rose-500/10 rounded-lg flex items-center gap-1 cursor-pointer transition"
                  title="Logout"
                >
                  <LogOut className="w-3 h-3" /> 登出 Admin
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Core Body Container */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-gray-50/50 dark:bg-zinc-950/35">
            {!isLoggedIn ? (
              /* Administrative verification state screen */
              <div className="p-8 max-w-sm mx-auto h-full flex flex-col justify-center">
                <form onSubmit={handleLogin} className="space-y-4.5">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-full flex items-center justify-center mx-auto mb-3 border border-indigo-100 dark:border-indigo-900/30">
                      <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-display font-bold text-gray-800 dark:text-zinc-200 text-sm">请输入管理员身份信息以取得编辑权</h3>
                    <p className="text-[11px] text-gray-400 mt-1">Credentials (zhuoyue1102)</p>
                  </div>

                  {loginError && (
                    <div className="p-3 text-center bg-rose-500/10 border border-rose-500/25 rounded-xl text-rose-500 text-xs font-mono">
                      ⚠️ {loginError}
                    </div>
                  )}

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 font-mono mb-1.5">
                        Manager Account (账号)
                      </label>
                      <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="请输入管理账号"
                        required
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 font-mono mb-1.5">
                        Security Password (密码)
                      </label>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="请输入登录密码"
                        required
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 transition cursor-pointer"
                  >
                    验证并进入 (Login)
                  </button>
                </form>
              </div>
            ) : (
              /* Inside active configuration manager deck */
              <div className="flex h-full flex-col md:flex-row">
                
                {/* Lateral Tab Control lists */}
                <div className="w-full md:w-44 bg-white dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-800/80 p-3 flex md:flex-col gap-1.5 justify-start shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 md:flex-initial text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'profile'
                        ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <User className="w-4 h-4 shrink-0" /> 个人资料
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('scholar')}
                    className={`flex-1 md:flex-initial text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'scholar'
                        ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" /> 谷歌学术
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('instagram')}
                    className={`flex-1 md:flex-initial text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'instagram'
                        ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <Instagram className="w-4 h-4 shrink-0" /> Instagram
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bilibili')}
                    className={`flex-1 md:flex-initial text-left px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
                      activeTab === 'bilibili'
                        ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <Video className="w-4 h-4 shrink-0" /> 哔哩哔哩
                  </button>
                </div>

                {/* Main scrollable editing panel block */}
                <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto space-y-5">
                  {saveMessage.text && (
                    <div className={`p-3.5 rounded-xl text-xs font-mono tracking-wide ${
                      saveMessage.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 border border-rose-500/20 text-rose-500'
                    }`}>
                      {saveMessage.type === 'success' ? '✅' : '❌'} {saveMessage.text}
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-500">
                        1. Visuals & Base Profiles (基本形象设定)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Real Name (展示姓名)
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Job occupation title (职业头衔)
                          </label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Current Location (生活坐标)
                          </label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Primary Email (联系邮箱)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                          Personal biography (传记描述)
                        </label>
                        <textarea
                          rows={3}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-sans leading-relaxed resize-none"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1 flex items-center gap-1">
                            <Image className="w-3 h-3 text-indigo-500" /> Avatar Image URL (头像链接)
                          </label>
                          <input
                            type="text"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1 flex items-center gap-1">
                            <Image className="w-3 h-3 text-indigo-500" /> Banner Image URL (大图背景链接)
                          </label>
                          <input
                            type="text"
                            value={bannerUrl}
                            onChange={(e) => setBannerUrl(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block text-[10px] uppercase tracking-wider font-mono font-bold text-gray-400">
                          Aesthetics Theme Preset
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {presetOptions.map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => setThemePreset(preset.id)}
                              className={`p-2.5 rounded-xl border flex items-center justify-between text-left cursor-pointer text-xs ${
                                themePreset === preset.id
                                  ? 'border-indigo-500 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/20'
                                  : 'border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 hover:bg-gray-100/40 text-gray-700 dark:text-zinc-300'
                              }`}
                            >
                              <span>{preset.label}</span>
                              <div className="flex gap-0.5">
                                {preset.colors.map((c, i) => (
                                  <span key={i} className={`w-2 h-2 rounded-full ${c} border border-black/10`} />
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'scholar' && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-500 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-indigo-500" /> 2. Google Scholar Metrics (谷歌学术名片)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Scholar Official Address (学者主页URL)
                          </label>
                          <input
                            type="text"
                            value={scholarUrl}
                            onChange={(e) => setScholarUrl(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Scholar Name/Handle (展示姓名)
                          </label>
                          <input
                            type="text"
                            value={scholarName}
                            onChange={(e) => setScholarName(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Citations Count (总被引频次)
                          </label>
                          <input
                            type="text"
                            value={scholarCitations}
                            onChange={(e) => setScholarCitations(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Scholar h-index (学科H指数)
                          </label>
                          <input
                            type="text"
                            value={scholarHIndex}
                            onChange={(e) => setScholarHIndex(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Scholar i10-index (i10指数)
                          </label>
                          <input
                            type="text"
                            value={scholarI10Index}
                            onChange={(e) => setScholarI10Index(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-500/5 dark:bg-indigo-950/10 rounded-xl border border-indigo-500/10 text-[11px] text-gray-500">
                        * 提示: 学科科研数据已被调整为手动修改模式，您在此键入的数值将即时覆盖，并全网真实可见！
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-[11px] uppercase tracking-wide font-mono font-bold text-gray-500">
                            文献列表 (Publications, {scholarPapers.length}篇)
                          </h5>
                          <button
                            type="button"
                            onClick={handleAddPaper}
                            className="px-2.5 py-1 text-[10px] font-bold font-mono text-indigo-500 border border-indigo-500/25 bg-indigo-500/5 hover:bg-indigo-500/10 rounded-lg flex items-center gap-1 cursor-pointer transition select-none"
                          >
                            + 添加文献 Paper
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {scholarPapers.map((paper, index) => (
                            <div key={index} className="p-3.5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] rounded-xl relative space-y-2.5">
                              <button
                                type="button"
                                onClick={() => handleRemovePaper(index)}
                                className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 px-2 py-0.5 bg-rose-500/5 hover:bg-rose-500/10 rounded border border-rose-500/15 cursor-pointer text-[10px] font-mono select-none"
                                title="删除此文献"
                              >
                                删除
                              </button>
                              
                              <div className="text-[10px] font-mono text-indigo-500 font-bold">文献 #{index + 1}</div>
                              
                              <div>
                                <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">论文标题 (Title)</label>
                                <input
                                  type="text"
                                  value={paper.title}
                                  onChange={(e) => handlePaperChange(index, 'title', e.target.value)}
                                  className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 focus:outline-none dark:text-white"
                                  placeholder="Type paper title"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">作者 (Authors)</label>
                                  <input
                                    type="text"
                                    value={paper.authors}
                                    onChange={(e) => handlePaperChange(index, 'authors', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 focus:outline-none dark:text-white"
                                    placeholder="Authors e.g. Y Zhuo..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">期刊/会议 (Journal)</label>
                                  <input
                                    type="text"
                                    value={paper.journal}
                                    onChange={(e) => handlePaperChange(index, 'journal', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 focus:outline-none dark:text-white"
                                    placeholder="Journal e.g. Molecules 29..."
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">发表年份 (Year)</label>
                                  <input
                                    type="text"
                                    value={paper.year}
                                    onChange={(e) => handlePaperChange(index, 'year', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-805 focus:outline-none dark:text-white font-mono"
                                    placeholder="2024"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">被引频次 (Citations)</label>
                                  <input
                                    type="text"
                                    value={paper.citations}
                                    onChange={(e) => handlePaperChange(index, 'citations', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-805 focus:outline-none dark:text-white font-mono"
                                    placeholder="Citation count"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">文章链接 (URL)</label>
                                  <input
                                    type="text"
                                    value={paper.url}
                                    onChange={(e) => handlePaperChange(index, 'url', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-805 focus:outline-none dark:text-white font-mono"
                                    placeholder="Scholar link"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'instagram' && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-500 flex items-center gap-1.5">
                        <Instagram className="w-4 h-4 text-pink-500" /> 3. Instagram Specs (摄影名片参数)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Instagram Profile URL (个人主页链接)
                          </label>
                          <input
                            type="text"
                            value={instagramUrl}
                            onChange={(e) => setInstagramUrl(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Instagram Username (@账号)
                          </label>
                          <input
                            type="text"
                            value={instagramUsername}
                            onChange={(e) => setInstagramUsername(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Instagram Nickname (显示昵称)
                          </label>
                          <input
                            type="text"
                            value={instagramName}
                            onChange={(e) => setInstagramName(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Followers count (粉丝量)
                          </label>
                          <input
                            type="text"
                            value={instagramFollower}
                            onChange={(e) => setInstagramFollower(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Following count (关注量)
                          </label>
                          <input
                            type="text"
                            value={instagramFollowing}
                            onChange={(e) => setInstagramFollowing(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Posts count (发帖数)
                          </label>
                          <input
                            type="text"
                            value={instagramPosts}
                            onChange={(e) => setInstagramPosts(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                          Instagram Profile Intro (简介描述)
                        </label>
                        <input
                          type="text"
                          value={instagramBio}
                          onChange={(e) => setInstagramBio(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-[11px] uppercase tracking-wide font-mono font-bold text-gray-500">
                            帖子照片列表 (Instagram Feed, {instagramPostsList.length}个)
                          </h5>
                          <button
                            type="button"
                            onClick={handleAddInstaPost}
                            className="px-2.5 py-1 text-[10px] font-bold font-mono text-pink-500 border border-pink-500/25 bg-pink-500/5 hover:bg-pink-500/10 rounded-lg flex items-center gap-1 cursor-pointer transition select-none"
                          >
                            + 添加帖子 Post
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {instagramPostsList.map((post, index) => (
                            <div key={index} className="p-3.5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] rounded-xl relative space-y-2.5 flex gap-4 items-start">
                              <div className="flex-1 space-y-2">
                                <div className="text-[10px] font-mono text-pink-500 font-bold">帖子 #{index + 1}</div>
                                
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">图片链接 (Image URL)</label>
                                  <input
                                    type="text"
                                    value={post.imageUrl || ''}
                                    onChange={(e) => handleInstaPostChange(index, 'imageUrl', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-805 focus:outline-none dark:text-white font-mono"
                                    placeholder="https://..."
                                  />
                                </div>

                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">文章跳转链接 (Post URL)</label>
                                  <input
                                    type="text"
                                    value={post.url || ''}
                                    onChange={(e) => handleInstaPostChange(index, 'url', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-805 focus:outline-none dark:text-white font-mono"
                                    placeholder="https://instagram.com/p/..."
                                  />
                                </div>
                              </div>

                              {post.imageUrl && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 shrink-0 self-center bg-zinc-100">
                                  <img src={post.imageUrl} alt="preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => handleRemoveInstaPost(index)}
                                className="text-rose-500 hover:text-rose-700 px-2 py-1 bg-rose-500/5 hover:bg-rose-500/10 rounded border border-rose-500/15 cursor-pointer text-[10px] font-mono select-none self-start"
                              >
                                删除
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'bilibili' && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-500 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-sky-455" /> 4. Bilibili Vlogs Specs (哔哩哔哩名片)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Bilibili Profile URL (空间主页链接)
                          </label>
                          <input
                            type="text"
                            value={bilibiliUrl}
                            onChange={(e) => setBilibiliUrl(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Bilibili Name (空间昵称)
                          </label>
                          <input
                            type="text"
                            value={bilibiliName}
                            onChange={(e) => setBilibiliName(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Followers subscribers (订阅数/粉丝)
                          </label>
                          <input
                            type="text"
                            value={bilibiliFollower}
                            onChange={(e) => setBilibiliFollower(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Following count (关注量)
                          </label>
                          <input
                            type="text"
                            value={bilibiliFollowing}
                            onChange={(e) => setBilibiliFollowing(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Total Video Views (累计播放量)
                          </label>
                          <input
                            type="text"
                            value={bilibiliViews}
                            onChange={(e) => setBilibiliViews(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                            Total Likes count (总获赞数)
                          </label>
                          <input
                            type="text"
                            value={bilibiliLikes}
                            onChange={(e) => setBilibiliLikes(e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 font-mono mb-1">
                          Bilibili signature bio (空间个性签名)
                        </label>
                        <input
                          type="text"
                          value={bilibiliBio}
                          onChange={(e) => setBilibiliBio(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none dark:text-white"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-[11px] uppercase tracking-wide font-mono font-bold text-gray-500">
                            视频 Feed 列表 (Bilibili Uploads, {bilibiliVideosList.length}个)
                          </h5>
                          <button
                            type="button"
                            onClick={handleAddBiliVideo}
                            className="px-2.5 py-1 text-[10px] font-bold font-mono text-sky-500 border border-sky-500/25 bg-sky-500/5 hover:bg-sky-500/10 rounded-lg flex items-center gap-1 cursor-pointer transition select-none"
                          >
                            + 添加视频 Video
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {bilibiliVideosList.map((video, index) => (
                            <div key={index} className="p-3.5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] rounded-xl relative space-y-2.5">
                              <button
                                type="button"
                                onClick={() => handleRemoveBiliVideo(index)}
                                className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 px-2 py-0.5 bg-rose-500/5 hover:bg-rose-500/10 rounded border border-rose-500/15 cursor-pointer text-[10px] font-mono select-none"
                                title="删除此视频"
                              >
                                删除
                              </button>
                              
                              <div className="text-[10px] font-mono text-sky-500 font-bold">视频 #{index + 1}</div>
                              
                              <div>
                                <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">视频标题 (Video Title)</label>
                                <input
                                  type="text"
                                  value={video.title || ''}
                                  onChange={(e) => handleBiliVideoChange(index, 'title', e.target.value)}
                                  className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 focus:outline-none dark:text-white"
                                  placeholder="Type video title"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">视频跳转链接 (Video URL)</label>
                                  <input
                                    type="text"
                                    value={video.url || ''}
                                    onChange={(e) => handleBiliVideoChange(index, 'url', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-808 focus:outline-none dark:text-white font-mono"
                                    placeholder="https://..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">封面图链接 (Cover Image URL)</label>
                                  <input
                                    type="text"
                                    value={video.imageUrl || ''}
                                    onChange={(e) => handleBiliVideoChange(index, 'imageUrl', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-808 focus:outline-none dark:text-white font-mono"
                                    placeholder="https://"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">时长, eg '10:15' (Duration)</label>
                                  <input
                                    type="text"
                                    value={video.duration || ''}
                                    onChange={(e) => handleBiliVideoChange(index, 'duration', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-808 focus:outline-none dark:text-white font-mono"
                                    placeholder="e.g. 14:25"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">获赞数, eg '12K' (Likes)</label>
                                  <input
                                    type="text"
                                    value={video.likes || ''}
                                    onChange={(e) => handleBiliVideoChange(index, 'likes', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-808 focus:outline-none dark:text-white font-mono"
                                    placeholder="e.g. 12K"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-mono tracking-wider font-bold text-gray-400 mb-0.5">评论/弹幕数 (Comments/DM)</label>
                                  <input
                                    type="text"
                                    value={video.comments || ''}
                                    onChange={(e) => handleBiliVideoChange(index, 'comments', e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-808 focus:outline-none dark:text-white font-mono"
                                    placeholder="e.g. 958"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-950/80 border-t border-gray-100 dark:border-zinc-850 flex justify-between items-center shrink-0">
            {isLoggedIn && onReset ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('是否确定要一键初始化回归出厂默认的祝卓越(Zhuo Yue)设置？')) {
                    setName(config.name);
                    onReset();
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-900 transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3" /> Reset Defaults
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer"
              >
                Cancel
              </button>
              {isLoggedIn && (
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  type="submit"
                  className="px-5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> 
                  {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
