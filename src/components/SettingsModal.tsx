import React from 'react';
import { X, Palette, Monitor, Sun, Moon } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function SettingsModal({ isOpen, onClose, theme, onThemeChange }: SettingsModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const themes = [
    {
      id: 'default',
      name: 'Default Dark',
      description: 'Professional dark theme with blue accents',
      icon: <Monitor className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    },
    {
      id: 'amoled',
      name: 'AMOLED Dark',
      description: 'Pure black theme for OLED displays',
      icon: <Moon className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-black via-gray-900 to-black'
    },
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean light theme for bright environments',
      icon: <Sun className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <Palette className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Theme Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Theme Selection</h3>
            <div className="grid gap-4">
              {themes.map((themeOption) => (
                <div
                  key={themeOption.id}
                  onClick={() => onThemeChange(themeOption.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    theme === themeOption.id
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-12 rounded-lg ${themeOption.preview} border border-slate-600/50`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {themeOption.icon}
                        <h4 className="font-medium text-slate-100">{themeOption.name}</h4>
                        {theme === themeOption.id && (
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{themeOption.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Additional Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div>
                  <p className="text-slate-300 font-medium">Auto-refresh packages</p>
                  <p className="text-slate-500 text-sm">Automatically refresh package data every 5 minutes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div>
                  <p className="text-slate-300 font-medium">Show license expiry warnings</p>
                  <p className="text-slate-500 text-sm">Display warnings for licenses expiring within 90 days</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}