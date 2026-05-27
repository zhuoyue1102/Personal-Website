import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Settings, Share2, Check, Sparkles, AlertCircle, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { ProfileConfig } from './types';
import { DEFAULT_PROFILE, THEME_PRESETS } from './data';
import LinkCard from './components/LinkCard';
import EditProfileModal from './components/EditProfileModal';

export default function App() {
  const [config, setConfig] = useState<ProfileConfig>(() => {
    const saved = localStorage.getItem('personal_links_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically upgrade to new NUS BME details if old default is detected
        if (
          parsed.name === 'Zhuoyue Zhao' ||
          parsed.title === "Master's Student & Digital Lifestyle Creator" ||
          parsed.title === "PhD Candidate & Digital Lifestyle Creator" ||
          parsed.location === 'Shanghai, China' ||
          parsed.location === 'Zhejiang, China' ||
          parsed.bio?.includes('Ph.D. student researching') ||
          parsed.bio?.includes('capture everyday beauty')
        ) {
          return DEFAULT_PROFILE;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved config, loading default profile', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const [liveStats, setLiveStats] = useState<any | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchServerConfig = () => {
    fetch('/api/profile-config')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve server configuration');
        return res.json();
      })
      .then((data) => {
        if (data && data.config) {
          setConfig(data.config);
        }
      })
      .catch((err) => console.error('Failed to query custom configuration:', err));
  };

  const fetchLiveStats = () => {
    setStatsLoading(true);
    fetch('/api/profile-stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve stats');
        return res.json();
      })
      .then((data) => {
        setLiveStats(data);
        setLastSynced(new Date());
      })
      .catch((err) => console.error('Failed to query dynamic metadata:', err))
      .finally(() => setStatsLoading(false));
  };

  useEffect(() => {
    fetchServerConfig();
    fetchLiveStats();
  }, []);

  useEffect(() => {
    localStorage.setItem('personal_links_config', JSON.stringify(config));
  }, [config]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if it is currently dark mode in the system
  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const [isThemeHovered, setIsThemeHovered] = useState(false);

  const resolvedPreset = config.themePreset === 'auto'
    ? (systemDark ? 'cosmic' : 'warm-sand')
    : config.themePreset;

  const activeTheme = THEME_PRESETS[resolvedPreset] || THEME_PRESETS['warm-sand'];

  const handleCycleTheme = () => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let nextPreset: ProfileConfig['themePreset'] = 'auto';

    if (isSystemDark) {
      // Cycle: auto -> warm-sand -> cosmic -> auto
      if (config.themePreset === 'auto') {
        nextPreset = 'warm-sand';
      } else if (config.themePreset === 'warm-sand') {
        nextPreset = 'cosmic';
      } else {
        nextPreset = 'auto';
      }
    } else {
      // Cycle: auto -> cosmic -> warm-sand -> auto
      if (config.themePreset === 'auto') {
        nextPreset = 'cosmic';
      } else if (config.themePreset === 'cosmic') {
        nextPreset = 'warm-sand';
      } else {
        nextPreset = 'auto';
      }
    }

    setConfig(prev => ({ ...prev, themePreset: nextPreset }));
  };

  const handleSave = (newConfig: ProfileConfig) => {
    setConfig(newConfig);
  };

  const handleReset = () => {
    setConfig(DEFAULT_PROFILE);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className={`min-h-screen pb-20 transition-all duration-500 font-sans ${activeTheme.bg} relative overflow-hidden selection:bg-indigo-500 selection:text-white`}>
      
      {/* Decorative Floating Liquid Glass Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 md:left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500/15 to-indigo-500/10 blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-10 md:right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-500/15 to-fuchsia-500/10 blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, 30, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 blur-[70px]"
        />
      </div>

      {/* Dynamic Background Banner Cover */}
      <div className="h-56 md:h-64 w-full relative overflow-hidden shrink-0 shadow-sm bg-zinc-950">
        <AnimatePresence>
          <motion.img
            key={resolvedPreset === 'cosmic' ? 'dark' : 'light'}
            src={resolvedPreset === 'cosmic' ? (config.darkBannerUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200&h=400') : config.bannerUrl}
            alt="Personal Banner"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full h-full object-cover select-none absolute inset-0"
          />
        </AnimatePresence>
        {/* Transparent glass overlay style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none z-10" />
      </div>

      {/* Main Single-View responsive container */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-24 relative z-10">
        
        {/* Personal Profile Info Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden backdrop-blur-md shadow-xl ${activeTheme.cardBg} ${activeTheme.border}`}
        >
          {/* Subtle accent light inside card for Cosmic Theme */}
          {activeTheme.glowingAccent && (
            <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.glowingAccent} pointer-events-none`} />
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10 w-full">
            {/* Avatar & text details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left w-full">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 via-pink-500 to-amber-400 rounded-2xl opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-900 bg-zinc-200">
                  <img
                    src={config.avatarUrl}
                    alt={config.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-1 flex-1 flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1
                      className={`font-display text-3xl md:text-4xl font-black tracking-tight ${activeTheme.textPrimary}`}
                      style={{ height: '58px', lineHeight: '48.2px', display: 'flex', alignItems: 'center' }}
                    >
                      {config.name}
                    </h1>
                  </div>

                  <p
                    className={`text-sm font-mono font-medium mt-1 text-indigo-500 dark:text-indigo-400`}
                    style={{ lineHeight: '1.4', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', height: isMobile ? 'auto' : '17px' }}
                  >
                    {config.title}
                  </p>

                  {/* Badges for locations and details */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 flex-wrap text-xs font-mono font-medium">
                    {config.location && (
                      <span
                        className={`flex items-center gap-1 ${activeTheme.textSecondary}`}
                        style={{ fontSize: '13px', lineHeight: '1.4' }}
                      >
                        <MapPin className="w-3.5 h-3.5" /> {config.location}
                      </span>
                    )}
                    {config.email && (
                      <a
                        href={`mailto:${config.email}`}
                        className={`flex items-center gap-1 hover:text-indigo-500 transition-colors ${activeTheme.textSecondary}`}
                        style={{ fontSize: '13px', lineHeight: '1.4' }}
                      >
                        <Mail className="w-3.5 h-3.5" /> {config.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Contact Me action */}
                <div className="flex sm:flex-col gap-2.5 items-center justify-center sm:items-end self-center sm:self-end w-full sm:w-auto mt-2 sm:mt-0">
                  <a
                    href={`mailto:${config.email}`}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition cursor-pointer select-none ${activeTheme.accent} ${activeTheme.accentHover}`}
                    style={{ height: '36px' }}
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Biography paragraph */}
          <div className="mt-6 pt-5 border-t border-black/[0.04] dark:border-white/[0.04] relative z-10 text-center sm:text-left">
            <p className={`text-sm leading-relaxed ${activeTheme.textSecondary}`}>
              {config.bio}
            </p>
          </div>
        </motion.div>

        {/* Cards Spotlight Header with Interactive Theme Switcher */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <span className={`text-[17px] font-mono tracking-widest uppercase font-bold ${activeTheme.textSecondary}`}>
              Websites & Links
            </span>
          </div>

          <button
            onClick={handleCycleTheme}
            onMouseEnter={() => setIsThemeHovered(true)}
            onMouseLeave={() => setIsThemeHovered(false)}
            className={`h-8 px-3.5 rounded-full border flex items-center justify-center transition-all duration-300 select-none cursor-pointer active:scale-95 text-xs font-mono font-bold tracking-wider ${
              resolvedPreset === 'cosmic'
                ? 'bg-zinc-950/60 border-indigo-500/30 text-indigo-400 hover:border-indigo-500/60 shadow-[0_0_12px_rgba(99,102,241,0.25)] hover:shadow-[0_0_18px_rgba(139,92,246,0.5)] hover:bg-zinc-900/80 hover:px-4'
                : `bg-white/35 dark:bg-zinc-900/35 border-black/[0.06] dark:border-white/[0.06] hover:bg-white/60 dark:hover:bg-zinc-900/50 hover:px-4 shadow-sm ${activeTheme.textSecondary}`
            }`}
            title="Switch Theme Mode"
          >
            <AnimatePresence mode="wait">
              {isThemeHovered ? (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center gap-1 shrink-0 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest ${
                    resolvedPreset === 'cosmic' ? 'text-indigo-400' : ''
                  }`}
                >
                  {config.themePreset === 'auto' ? 'System' : (config.themePreset === 'cosmic' ? 'Dark' : 'Light')}
                </motion.span>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center shrink-0"
                >
                  {resolvedPreset === 'cosmic' ? (
                    <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-[spin_12s_linear_infinite]" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Links Cards List (Instagram, Bilibili, Google Scholar) */}
        <div className="space-y-5">
          <LinkCard platform="scholar" config={config} colors={activeTheme} liveStats={liveStats} />
          <LinkCard platform="instagram" config={config} colors={activeTheme} liveStats={liveStats} />
          <LinkCard platform="bilibili" config={config} colors={activeTheme} liveStats={liveStats} />
        </div>

        {/* Custom humble clean footer (No AI slop elements or logs) */}
        <div className="text-center mt-12 mb-6">
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {config.name} • Shared Links Directory
          </p>
        </div>

      </div>

      {/* Floating Design Studio Customizer Action Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsEditOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3.5 rounded-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 relative group cursor-pointer flex items-center justify-center border border-indigo-400/20"
        >
          <Settings className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
          <span className="absolute right-14 whitespace-nowrap bg-zinc-900 border border-zinc-800 text-zinc-100 text-[11px] font-mono px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Customize Aesthetics
          </span>
        </motion.button>
      </div>

      {/* Profile specs Customization modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        config={config}
        onSave={handleSave}
        onReset={handleReset}
      />

    </div>
  );
}
