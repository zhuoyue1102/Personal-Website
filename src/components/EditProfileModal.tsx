import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RefreshCw, Layout, Key, User, Globe, Mail, Link, AlertCircle } from 'lucide-react';
import { ProfileConfig } from '../types';
import { ThemeColors, THEME_PRESETS } from '../data';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProfileConfig;
  onSave: (newConfig: ProfileConfig) => void;
  onReset: () => void;
}

export default function EditProfileModal({ isOpen, onClose, config, onSave, onReset }: EditProfileModalProps) {
  const [formData, setFormData] = React.useState<ProfileConfig>(config);

  React.useEffect(() => {
    setFormData(config);
  }, [config, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const presetOptions: Array<{ id: ProfileConfig['themePreset']; label: string; colors: string[] }> = [
    { id: 'warm-sand', label: 'Warm Sand', colors: ['bg-[#FAF6F0]', 'bg-[#765E47]', 'bg-[#E3DEC3]'] },
    { id: 'minimal-charcoal', label: 'Tech Charcoal', colors: ['bg-[#F2F4F7]', 'bg-[#0F172A]', 'bg-[#CBD5E1]'] },
    { id: 'emerald-glass', label: 'Emerald Glass', colors: ['bg-[#C9E4D4]', 'bg-[#2E6B47]', 'bg-[#A3D2B5]'] },
    { id: 'cosmic', label: 'Cosmic Slate', colors: ['bg-[#09090B]', 'bg-[#8B5CF6]', 'bg-[#3F3F46]'] },
    { id: 'sakura', label: 'Sakura Blush', colors: ['bg-[#FFF3F5]', 'bg-[#F33A5F]', 'bg-[#FCBAC5]'] },
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
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800/60 shrink-0">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <Layout className="w-5 h-5 text-indigo-500" /> Customizer Workbench
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-0.5">Customize your personal homepage aesthetics & handles</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Theme Presets Selection */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-mono font-bold text-gray-500">
                Aesthetic Profile Theme Preset
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {presetOptions.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, themePreset: preset.id }))}
                    className={`p-3 rounded-xl border-2 text-left transition relative cursor-pointer flex flex-col justify-between h-20 ${
                      formData.themePreset === preset.id
                        ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20'
                        : 'border-gray-200 dark:border-zinc-800 bg-transparent hover:border-gray-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-gray-800 dark:text-zinc-200 select-none">
                      {preset.label}
                    </span>
                    <div className="flex gap-1.5 items-center mt-1.5">
                      {preset.colors.map((bg, index) => (
                        <div key={index} className={`w-3.5 h-3.5 rounded-full ${bg} border border-black/10`} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold font-display text-gray-800 dark:text-zinc-200 border-b border-gray-100 dark:border-zinc-800 pb-1.5">
                  Core Biography
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-500">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-500">Role / Title Description</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-gray-500">Bio Sentence</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 transition resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-gray-500">Location</label>
                    <div className="relative">
                      <Globe className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-8 pr-2 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-gray-500">Public Email</label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-8 pr-2 py-2 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform specific links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold font-display text-gray-800 dark:text-zinc-200 border-b border-gray-100 dark:border-zinc-800 pb-1.5">
                  Platform URLs & Handles
                </h3>

                {/* Instagram Fields */}
                <div className="space-y-2 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
                  <span className="text-xs font-semibold text-pink-500 flex items-center gap-1.5">
                    📷 Instagram
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="instagramUsername"
                      placeholder="Username (e.g. @name)"
                      value={formData.instagramUsername}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-pink-500"
                    />
                    <input
                      type="url"
                      name="instagramUrl"
                      placeholder="Full Destination URL"
                      value={formData.instagramUrl}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Bilibili Fields */}
                <div className="space-y-2 p-3 rounded-xl bg-sky-500/5 border border-sky-500/10">
                  <span className="text-xs font-semibold text-sky-500 flex items-center gap-1.5">
                    📺 Bilibili
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="bilibiliUsername"
                      placeholder="Space Handle/Name"
                      value={formData.bilibiliUsername}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                    />
                    <input
                      type="url"
                      name="bilibiliUrl"
                      placeholder="Bilibili Space Link"
                      value={formData.bilibiliUrl}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Scholar Fields */}
                <div className="space-y-2 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                  <span className="text-xs font-semibold text-indigo-500 flex items-center gap-1.5">
                    🎓 Google Scholar
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="scholarUsername"
                      placeholder="Scholar Name/Query"
                      value={formData.scholarUsername}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="url"
                      name="scholarUrl"
                      placeholder="Scholar Profile Link"
                      value={formData.scholarUrl}
                      onChange={handleChange}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Info */}
            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 flex gap-3 text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed font-sans">
                <span className="font-semibold block">Browser Persistent Sandbox</span>
                All configuration is saved instantly to your localized environment. Your URLs must start with <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">http://</code> or <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">https://</code>.
              </div>
            </div>
          </form>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 flex justify-between items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to revert all changes to fallback developer properties?')) {
                  onReset();
                  onClose();
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-gray-300 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Default Properties
            </button>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/10 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Profile Specs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
