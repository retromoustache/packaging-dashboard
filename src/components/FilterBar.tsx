import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onAddPackage: () => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onAddPackage
}: FilterBarProps) {
  const getThemeClasses = () => {
    const body = document.body;
    if (body.classList.contains('theme-amoled')) {
      return {
        container: 'bg-black/50 backdrop-blur-sm border border-gray-800/50',
        input: 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
        select: 'bg-gray-900/50 border border-gray-700/50 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 [&>option]:bg-gray-900 [&>option]:text-white',
        button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
      };
    } else if (body.classList.contains('theme-light')) {
      return {
        container: 'bg-white/80 backdrop-blur-sm border border-gray-200/50',
        input: 'bg-gray-50/50 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
        select: 'bg-gray-50/50 border border-gray-300/50 text-gray-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 [&>option]:bg-white [&>option]:text-gray-900',
        button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
      };
    } else {
      return {
        container: 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50',
        input: 'bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
        select: 'bg-slate-700/50 border border-slate-600/50 text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 [&>option]:bg-slate-800 [&>option]:text-slate-100',
        button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`${themeClasses.container} rounded-xl p-6 mb-8`}>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg transition-all duration-200 ${themeClasses.input}`}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedPlatform}
              onChange={(e) => onPlatformChange(e.target.value)}
              className={`px-3 py-2.5 rounded-lg transition-all duration-200 ${themeClasses.select}`}
            >
              <option value="">All Platforms</option>
              <option value="Windows">Windows</option>
              <option value="Mac">Mac</option>
              <option value="Linux">Linux</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className={`px-3 py-2.5 rounded-lg transition-all duration-200 ${themeClasses.select}`}
            >
              <option value="">All Status</option>
              <option value="live">Live</option>
              <option value="in-progress">In Progress</option>
              <option value="deprecated">Deprecated</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={`px-3 py-2.5 rounded-lg transition-all duration-200 ${themeClasses.select}`}
            >
              <option value="lastUpdated">Latest Updated</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Add Package Button */}
        <button
          onClick={onAddPackage}
          className={`flex items-center gap-2 px-4 py-2.5 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ${themeClasses.button}`}
        >
          <Plus className="h-4 w-4" />
          Add Package
        </button>
      </div>
    </div>
  );
}