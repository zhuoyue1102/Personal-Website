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
          parsed.avatarUrl?.includes('profile_photo_1779758202074') ||
          parsed.title === "Master's Student & Digital Lifestyle Creator" ||
          parsed.title === "PhD Candidate & Digital Lifestyle Creator" ||
          parsed.location === 'Shanghai, China' ||
          parsed.location === 'Zhejiang, China' ||
          parsed.bio?.includes('Ph.D. student researching') ||
          parsed.bio?.includes('capture everyday beauty') ||
          parsed.bio?.endsWith('driving')
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

  // Determine if it is currently daytime (6:00 AM to 6:00 PM) for the visitor
  const [isDay, setIsDay] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  });

  // Periodically refresh the day/night state in case they leave page open
  useEffect(() => {
    const handle = setInterval(() => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    }, 60000);
    return () => clearInterval(handle);
  }, []);

  const resolvedPreset = config.themePreset === 'auto'
    ? (isDay ? 'warm-sand' : 'cosmic')
    : config.themePreset;

  const activeTheme = THEME_PRESETS[resolvedPreset] || THEME_PRESETS['warm-sand'];

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
      <div className="h-56 md:h-64 w-full relative overflow-hidden shrink-0 shadow-sm">
        <img
          src={config.bannerUrl}
          alt="Personal Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />
        {/* Transparent glass overlay style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
            {/* Avatar & text details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
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

              <div className="mt-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className={`font-display text-3xl md:text-4xl font-black tracking-tight ${activeTheme.textPrimary}`}>
                    {config.name}
                  </h1>
                  <span className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold border border-indigo-500/15">
                    <Sparkles className="w-3 h-3 text-amber-500" /> NUS BME
                  </span>
                </div>

                <p className={`text-sm font-mono font-medium mt-1.5 text-indigo-500 dark:text-indigo-400`}>
                  {config.title}
                </p>

                {/* Badges for locations and details */}
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 flex-wrap text-xs font-mono font-medium">
                  {config.location && (
                    <span className={`flex items-center gap-1 ${activeTheme.textSecondary}`}>
                      <MapPin className="w-3.5 h-3.5" /> {config.location}
                    </span>
                  )}
                  {config.email && (
                    <a
                      href={`mailto:${config.email}`}
                      className={`flex items-center gap-1 hover:text-indigo-500 transition-colors ${activeTheme.textSecondary}`}
                    >
                      <Mail className="w-3.5 h-3.5" /> {config.email}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Me action */}
            <div className="flex sm:flex-col gap-2.5 items-center justify-center sm:items-end self-center sm:self-end w-full sm:w-auto mt-2 sm:mt-0">
              <a
                href={`mailto:${config.email}`}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition cursor-pointer select-none ${activeTheme.accent} ${activeTheme.accentHover}`}
              >
                <Mail className="w-3.5 h-3.5" /> Contact Me
              </a>
            </div>
          </div>

          {/* Biography paragraph */}
          <div className="mt-6 pt-5 border-t border-black/[0.04] dark:border-white/[0.04] relative z-10 text-center sm:text-left">
            <p className={`text-sm md:text-base leading-relaxed ${activeTheme.textSecondary}`}>
              {config.bio}
            </p>
          </div>
        </motion.div>

        {/* Cards Spotlight Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-mono tracking-widest uppercase font-bold ${activeTheme.textSecondary}`}>
              Websites & Links
            </span>
          </div>

          {config.themePreset === 'auto' && (
            <div className="flex items-center justify-center select-none text-xl md:text-2xl animate-[pulse_2.5s_infinite_ease-in-out]" title={isDay ? "Daytime (Warm Sand)" : "Nighttime (Cosmic Slate)"}>
              {isDay ? "☀️" : "🌙"}
            </div>
          )}
        </div>

        {/* Links Cards List (Instagram, Bilibili, Google Scholar) */}
        <div className="space-y-5">
          <LinkCard platform="scholar" config={config} colors={activeTheme} liveStats={liveStats} />
          <LinkCard platform="instagram" config={config} colors={activeTheme} liveStats={liveStats} />
          <LinkCard platform="bilibili" config={config} colors={activeTheme} liveStats={liveStats} />
        </div>

        {/* Developer Sandbox Notice / Setup instructions */}
        <div className="mt-12 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-widest">
                Deployable Configuration Sandbox
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed mt-1">
                You can instantly customize the names, handles, bios, and redirect destinations by clicking the Floating Design Tool gear in the bottom-right corner! Updates persist locally.
              </p>
            </div>
          </div>
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
