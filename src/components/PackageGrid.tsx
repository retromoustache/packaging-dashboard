import React from 'react';
import { Package } from '../types/Package';
import PackageTile from './PackageTile';

interface PackageGridProps {
  packages: Package[];
  onPackageClick: (pkg: Package) => void;
  viewMode: 'grid' | 'compact' | 'list';
  theme: string;
}

export default function PackageGrid({ packages, onPackageClick, viewMode, theme }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-slate-400 text-2xl">📦</span>
          </div>
          <h3 className="text-slate-300 text-lg font-medium mb-2">No packages found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  const getGridClasses = () => {
    switch (viewMode) {
      case 'compact':
        return 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4';
      case 'list':
        return 'flex flex-col gap-3';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6';
    }
  };
  return (
    <div className={getGridClasses()}>
      {packages.map((pkg) => (
        <PackageTile
          key={pkg.id}
          package={pkg}
          onClick={() => onPackageClick(pkg)}
          viewMode={viewMode}
          theme={theme}
        />
      ))}
    </div>
  );
}