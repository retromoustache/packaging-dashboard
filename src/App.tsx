import React, { useState, useMemo } from 'react';
import { Package } from './types/Package';
import { mockPackages } from './data/mockData';
import FilterBar from './components/FilterBar';
import PackageGrid from './components/PackageGrid';
import PackageModal from './components/PackageModal';
import AddPackageForm from './components/AddPackageForm';
import SettingsModal from './components/SettingsModal';
import ServerInfoModal from './components/ServerInfoModal';
import ConfirmationModal from './components/ConfirmationModal';
import AuthModal from './components/AuthModal';
import { Package as PackageIcon, Settings, Info, User, LogOut } from 'lucide-react';

function App() {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isServerInfoOpen, setIsServerInfoOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; role: 'admin' | 'user' } | null>(null);
  const [theme, setTheme] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('lastUpdated');

  // Handle status filter from header clicks
  const handleStatusFilterClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus('');
      setStatusFilter('');
    } else {
      setSelectedStatus(status);
      setStatusFilter(status);
    }
  };

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    const filtered = packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pkg.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = !selectedPlatform || pkg.platform.includes(selectedPlatform as (typeof pkg.platform)[number]);
      const matchesStatus = !selectedStatus || pkg.status === selectedStatus || (statusFilter && pkg.status === statusFilter);
      
      return matchesSearch && matchesPlatform && matchesStatus;
    });

    // Sort packages
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'lastUpdated':
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

    return filtered;
  }, [packages, searchQuery, selectedPlatform, selectedStatus, sortBy]);

  const handlePackageClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsAddFormOpen(true);
  };

  const handleEditPackage = () => {
    if (selectedPackage) {
      setEditingPackage(selectedPackage);
      setIsModalOpen(false);
      setIsAddFormOpen(true);
    }
  };

  const handleDeletePackage = () => {
    setPackageToDelete(selectedPackage);
  };

  const confirmDeletePackage = () => {
    if (packageToDelete) {
      setPackages(prev => prev.filter(pkg => pkg.id !== packageToDelete.id));
      setIsModalOpen(false);
      setSelectedPackage(null);
      setPackageToDelete(null);
    }
  };

  const handleLogin = (username: string, password: string) => {
    // Demo authentication
    if (username === 'admin') {
      setUser({ username, role: 'admin' });
    } else {
      setUser({ username, role: 'user' });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleCancelEdit = () => {
    setIsAddFormOpen(false);
    setIsModalOpen(true); // Re-open PackageModal
    setEditingPackage(null);
  };

  const handleUpdatePackage = (updatedPackage: Package) => {
    setPackages(prev => prev.map(pkg => (pkg.id === updatedPackage.id ? updatedPackage : pkg)));
    setSelectedPackage(updatedPackage);
  };

  const handleSavePackage = (packageData: Omit<Package, 'id' | 'createdAt'>) => {
    if (editingPackage) {
      // Update existing package
      setPackages(prev => prev.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...pkg, ...packageData }
          : pkg
      ));
    } else {
      // Add new package
      const newPackage: Package = {
        ...packageData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPackages(prev => [newPackage, ...prev]);
    }
    setIsAddFormOpen(false);
    setEditingPackage(null);
    if (editingPackage) {
      setIsModalOpen(true); // Re-open PackageModal after saving an edit
    }
  };

  const getStatusCounts = () => {
    return {
      live: packages.filter(pkg => pkg.status === 'live').length,
      inProgress: packages.filter(pkg => pkg.status === 'in-progress').length,
      deprecated: packages.filter(pkg => pkg.status === 'deprecated').length
    };
  };

  const statusCounts = getStatusCounts();

  // Apply theme and no-scroll classes to body
  React.useEffect(() => {
    const body = document.body;
    body.className = ''; // Clear existing classes
    
    switch (theme) {
      case 'amoled':
        body.classList.add('theme-amoled');
        break;
      case 'light':
        body.classList.add('theme-light');
        break;
      default:
        body.classList.add('theme-default');
    }

    if (isModalOpen || isAddFormOpen || isSettingsOpen || isServerInfoOpen || packageToDelete || isAuthModalOpen) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [theme, isModalOpen, isAddFormOpen, isSettingsOpen, isServerInfoOpen, packageToDelete, isAuthModalOpen]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'amoled':
        return 'min-h-screen bg-black';
      case 'light':
        return 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100';
      default:
        return 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';
    }
  };

  const getHeaderClasses = () => {
    switch (theme) {
      case 'amoled':
        return 'border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-40';
      case 'light':
        return 'border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40';
      default:
        return 'border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40';
    }
  };

  const getTextClasses = () => {
    switch (theme) {
      case 'light':
        return {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          tertiary: 'text-gray-500'
        };
      default:
        return {
          primary: 'text-slate-100',
          secondary: 'text-slate-400',
          tertiary: 'text-slate-300'
        };
    }
  };

  const getStatusHighlight = (status: string) => {
    if (selectedStatus === status || statusFilter === status) {
      return status === 'live' ? 'text-emerald-400' : 
             status === 'in-progress' ? 'text-amber-400' : 'text-red-400';
    }
    return textClasses.tertiary;
  };

  const textClasses = getTextClasses();

  return (
    <div className={getThemeClasses()}>
      {/* Header */}
      <header className={getHeaderClasses()}>
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <PackageIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textClasses.primary}`}>SCCM Package Manager</h1>
                <p className={textClasses.secondary}>Centralized software package administration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusFilterClick('live')}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className={getStatusHighlight('live')}>{statusCounts.live} Live</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusFilterClick('in-progress')}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className={getStatusHighlight('in-progress')}>{statusCounts.inProgress} In Progress</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusFilterClick('deprecated')}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className={getStatusHighlight('deprecated')}>{statusCounts.deprecated} Deprecated</span>
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsServerInfoOpen(true)}
                className={`p-2 ${textClasses.secondary} hover:${textClasses.tertiary} transition-colors`}
                title="Server Information"
              >
                <Info className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`p-2 ${textClasses.secondary} hover:${textClasses.tertiary} transition-colors`}
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textClasses.secondary}`}>
                    {user.username} ({user.role})
                  </span>
                  <button 
                    onClick={handleLogout}
                    className={`p-2 ${textClasses.secondary} hover:${textClasses.tertiary} transition-colors`}
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`p-2 ${textClasses.secondary} hover:${textClasses.tertiary} transition-colors`}
                  title="Sign In"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-6 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddPackage={handleAddPackage}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="mb-6">
          <p className={textClasses.secondary}>
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        <PackageGrid
          packages={filteredPackages}
          onPackageClick={handlePackageClick}
          viewMode={viewMode}
          theme={theme}
        />
      </main>

      {/* Modals */}
      {selectedPackage && (
        <PackageModal
          package={selectedPackage}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPackage(null);
          }}
          onEdit={handleEditPackage}
          onDelete={handleDeletePackage}
          onUpdatePackage={handleUpdatePackage}
          theme={theme}
        />
      )}

      <AddPackageForm
        isOpen={isAddFormOpen}
        onClose={() => {
          setIsAddFormOpen(false);
          setEditingPackage(null);
        }}
        onSave={handleSavePackage}
        editingPackage={editingPackage}
        onCancelEdit={handleCancelEdit}
        theme={theme}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />

      <ServerInfoModal
        isOpen={isServerInfoOpen}
        onClose={() => setIsServerInfoOpen(false)}
        theme={theme}
      />

      <ConfirmationModal
        isOpen={packageToDelete !== null}
        onClose={() => setPackageToDelete(null)}
        onConfirm={confirmDeletePackage}
        title="Delete Package"
        message={`Are you sure you want to delete "${packageToDelete?.name}"? This will permanently remove the package and all its associated data. This action cannot be undone.`}
        confirmText="Delete Package"
        type="danger"
        theme={theme}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        theme={theme}
      />
    </div>
  );
}

export default App;