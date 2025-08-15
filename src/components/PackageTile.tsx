import React from 'react';
import { Package } from '../types/Package';
import { Monitor, Apple, Calendar, Package as PackageIcon, ChevronRight, Zap, Wrench } from 'lucide-react';

interface PackageTileProps {
  package: Package;
  onClick: () => void;
}

export default function PackageTile({ package: pkg, onClick }: PackageTileProps) {
  const getThemeClasses = () => {
    const body = document.body;
    if (body.classList.contains('theme-amoled')) {
      return {
        container: 'bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800/50 hover:from-gray-800/80 hover:to-gray-900/80 hover:border-gray-700/50',
        title: 'text-white group-hover:text-gray-100',
        version: 'text-gray-400',
        summary: 'text-gray-300',
        badge: 'bg-gray-800/50 text-gray-300 border-gray-700/50',
        date: 'text-gray-400',
        chevron: 'text-gray-400 group-hover:text-gray-300'
      };
    } else if (body.classList.contains('theme-light')) {
      return {
        container: 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 hover:from-gray-50/90 hover:to-white/90 hover:border-gray-300/50',
        title: 'text-gray-900 group-hover:text-gray-800',
        version: 'text-gray-600',
        summary: 'text-gray-700',
        badge: 'bg-gray-100/50 text-gray-700 border-gray-300/50',
        date: 'text-gray-600',
        chevron: 'text-gray-600 group-hover:text-gray-700'
      };
    } else {
      return {
        container: 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:from-slate-700/80 hover:to-slate-800/80 hover:border-slate-600/50',
        title: 'text-slate-100 group-hover:text-white',
        version: 'text-slate-400',
        summary: 'text-slate-300',
        badge: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
        date: 'text-slate-400',
        chevron: 'text-slate-400 group-hover:text-slate-300'
      };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'in-progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'deprecated':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getFileTypeDisplay = (fileTypes: { primary: string; hasScript: boolean }) => {
    let display = fileTypes.primary.toUpperCase();
    if (fileTypes.primary === 'msi-mst') {
      display = 'MSI + MST';
    }
    if (fileTypes.hasScript) {
      display += ' + PS1';
    }
    return display;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Windows':
        return <Monitor className="h-4 w-4" />;
      case 'Mac':
        return <Apple className="h-4 w-4" />;
      default:
        return <PackageIcon className="h-4 w-4" />;
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      onClick={onClick}
      className={`group ${themeClasses.container} rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <PackageIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-lg transition-colors ${themeClasses.title}`}>
                {pkg.name}
              </h3>
              <div className="flex items-center gap-1">
                {pkg.deploymentType === 'intune' && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                    Intune
                  </span>
                )}
                {pkg.isPatchMyPC && (
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    PMPC
                  </span>
                )}
                {pkg.isDynamicInstall && (
                  <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/30 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    C/D
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-sm ${themeClasses.version}`}>{pkg.version}</p>
              <span className={`text-xs px-2 py-1 rounded ${themeClasses.badge}`}>
                {getFileTypeDisplay(pkg.fileTypes)}
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className={`h-5 w-5 group-hover:translate-x-1 transition-all duration-200 ${themeClasses.chevron}`} />
      </div>

      <div className="space-y-3">
        {/* Platform badges */}
        <div className="flex gap-2">
          {pkg.platform.map((platform) => (
            <span
              key={platform}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md ${themeClasses.badge}`}
            >
              {getPlatformIcon(platform)}
              {platform}
            </span>
          ))}
        </div>

        {/* Status badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-md border ${getStatusColor(pkg.status)}`}>
            {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1).replace('-', ' ')}
          </span>
          <div className={`flex items-center gap-1 text-xs ${themeClasses.date}`}>
            <Calendar className="h-3 w-3" />
            {new Date(pkg.lastUpdated).toLocaleDateString()}
          </div>
        </div>

        {/* Summary */}
        <p className={`text-sm leading-relaxed ${themeClasses.summary}`}>
          {pkg.summary}
        </p>
      </div>
    </div>
  );
}