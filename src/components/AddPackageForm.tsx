import React, { useState, useEffect } from 'react';
import { Package } from '../types/Package';
import { X, Save, Package as PackageIcon, Monitor, Apple, Zap, Wrench } from 'lucide-react';

interface AddPackageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Omit<Package, 'id' | 'createdAt'>) => void;
  editingPackage?: Package | null;
  onCancelEdit?: () => void;
  theme: string;
}

const getInitialFormData = (pkg?: Package | null): Omit<Package, 'id' | 'createdAt'> => ({
  name: pkg?.name || '',
  version: pkg?.version || '',
  platform: pkg?.platform || ['Windows'],
  status: pkg?.status || 'in-progress',
  summary: pkg?.summary || '',
  lastUpdated: pkg?.lastUpdated || new Date().toISOString().split('T')[0],
  lastPackagedBy: pkg?.lastPackagedBy || '',
  packagedByHistory: pkg?.packagedByHistory || [],
  sponsor: pkg?.sponsor || { name: '', department: '' },
  deploymentType: pkg?.deploymentType || 'sccm',
  isPatchMyPC: pkg?.isPatchMyPC || false,
  isDynamicInstall: pkg?.isDynamicInstall || false,
  packagingMethodology: pkg?.packagingMethodology || '',
  fileTypes: pkg?.fileTypes || { primary: 'msi', hasScript: false },
  toolsUsed: pkg?.toolsUsed || [],
  folderPaths: pkg?.folderPaths || {
    source: '',
    deployment: '',
    logs: ''
  },
  sccmDeployment: pkg?.sccmDeployment || {
    installCommand: '',
    uninstallCommand: '',
    repairCommand: '',
    installStartIn: '',
    uninstallStartIn: '',
    repairStartIn: '',
    productCode: ''
  },
  scripts: pkg?.scripts || [],
  licensing: pkg?.licensing || {
    type: '',
    fileLinks: [],
    notes: '',
    expiryDate: undefined
  },
  comments: pkg?.comments || '',
  auditHistory: pkg?.auditHistory || []
});


export default function AddPackageForm({ isOpen, onClose, onSave, editingPackage, onCancelEdit, theme }: AddPackageFormProps) {
  const [formData, setFormData] = useState<Omit<Package, 'id' | 'createdAt'>>(getInitialFormData(editingPackage));

  const getModalClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white border-gray-200';
      case 'amoled':
        return 'bg-black border-gray-800';
      default:
        return 'bg-slate-900 border-slate-700/50';
    }
  };

  const getBorderClasses = () => {
    switch (theme) {
      case 'light':
        return 'border-gray-200';
      case 'amoled':
        return 'border-gray-800';
      default:
        return 'border-slate-700/50';
    }
  };

  const getTextClasses = (type: 'primary' | 'secondary' | 'input') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary': return 'text-gray-900';
          case 'secondary': return 'text-gray-600';
          case 'input': return 'text-gray-800';
        }
      case 'amoled':
        switch (type) {
          case 'primary': return 'text-white';
          case 'secondary': return 'text-gray-300';
          case 'input': return 'text-gray-200';
        }
      default:
        switch (type) {
          case 'primary': return 'text-slate-100';
          case 'secondary': return 'text-slate-400';
          case 'input': return 'text-slate-100';
        }
    }
  };

  const getBgClasses = (type: 'section' | 'input' | 'button') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'section': return 'bg-gray-50';
          case 'input': return 'bg-gray-100';
          case 'button': return 'bg-gray-200 hover:bg-gray-300';
        }
      case 'amoled':
        switch (type) {
          case 'section': return 'bg-gray-900';
          case 'input': return 'bg-gray-950';
          case 'button': return 'bg-gray-700 hover:bg-gray-600';
        }
      default:
        switch (type) {
          case 'section': return 'bg-slate-800/50';
          case 'input': return 'bg-slate-700/50';
          case 'button': return 'bg-gray-700 hover:bg-gray-600';
        }
    }
  };

  const getButtonClasses = (type: 'primary' | 'secondary' | 'toggle' | 'ghost') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary': return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25';
          case 'secondary': return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
          case 'toggle': return 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300';
          case 'ghost': return 'text-gray-500 hover:text-gray-700';
        }
      case 'amoled':
        switch (type) {
          case 'primary': return 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-blue-700/25';
          case 'secondary': return 'bg-gray-800 hover:bg-gray-700 text-white';
          case 'toggle': return 'bg-gray-800 text-white border-gray-800 hover:bg-gray-700';
          case 'ghost': return 'text-gray-400 hover:text-gray-200';
        }
      default:
        switch (type) {
          case 'primary': return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25';
          case 'secondary': return 'bg-slate-700 hover:bg-slate-600 text-slate-100';
          case 'toggle': return 'bg-slate-700/50 text-slate-300';
          case 'ghost': return 'text-slate-400 hover:text-slate-300';
        }
    }
  };

  const getInputClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-gray-100 border-gray-300 text-gray-800 focus:ring-blue-500/50 focus:border-blue-500/50';
      case 'amoled':
        return 'bg-gray-950 border-gray-700 text-gray-200 focus:ring-blue-500/50 focus:border-blue-500/50';
      default:
        return 'bg-slate-700/50 border-slate-600/50 text-slate-100 focus:ring-blue-500/50 focus:border-blue-500/50';
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(editingPackage));
    }
  }, [editingPackage, isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !editingPackage) {
      onClose();
    }
  };

  const handleCancelClick = () => {
    if (editingPackage && onCancelEdit) {
      onCancelEdit();
    } else {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        platform: [...prev.platform, platform as 'Windows' | 'Mac' | 'Linux']
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        platform: prev.platform.filter(p => p !== platform)
      }));
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Windows':
        return <Monitor className="h-4 w-4" />;
      case 'Mac':
        return <Apple className="h-4 w-4" />;
      case 'Linux':
        return <PackageIcon className="h-4 w-4" />;
      default:
        return <PackageIcon className="h-4 w-4" />;
    }
  };
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${getModalClasses()} rounded-2xl w-full max-w-7xl max-h-[70vh] overflow-hidden shadow-2xl flex flex-col`}>
        <div className={`flex items-center justify-between p-6 border-b ${getBorderClasses()}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <PackageIcon className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className={`text-2xl font-bold ${getTextClasses('primary')}`}>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancelClick}
              className={`px-4 py-2 ${getButtonClasses('secondary')} rounded-lg font-medium transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-package-form"
              className={`flex items-center gap-2 px-4 py-2 ${getButtonClasses('primary')} rounded-lg font-medium transition-all duration-200 transform hover:scale-105`}
            >
              <Save className="h-4 w-4" />
              {editingPackage ? 'Update Package' : 'Save Package'}
            </button>
            <button
              onClick={onClose}
              className={`p-2 ${getButtonClasses('ghost')} transition-colors`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form id="add-package-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Deployment Type */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Deployment Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Deployment Type
                    </label>
                    <div className={`flex items-center space-x-2 p-1 ${getBgClasses('input')} rounded-lg`}>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, deploymentType: 'sccm' }))}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                          ${formData.deploymentType === 'sccm' ? 'bg-blue-600 text-white shadow-md' : `${getButtonClasses('toggle')}`}`}
                      >
                        SCCM
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, deploymentType: 'intune', isPatchMyPC: false, isDynamicInstall: false }))}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                          ${formData.deploymentType === 'intune' ? 'bg-blue-600 text-white shadow-md' : `${getButtonClasses('toggle')}`}`}
                      >
                        Intune
                      </button>
                    </div>
                  </div>
                  
                  {formData.deploymentType === 'sccm' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                          Patch My PC
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isPatchMyPC: !prev.isPatchMyPC }))}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border
                            ${formData.isPatchMyPC 
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                              : `${getButtonClasses('toggle')} border-${getBorderClasses()}`}`}
                        >
                          <Wrench className="h-4 w-4" />
                          {formData.isPatchMyPC ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                          Dynamic Install (C/D)
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isDynamicInstall: !prev.isDynamicInstall }))}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border
                            ${formData.isDynamicInstall 
                              ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
                              : `${getButtonClasses('toggle')} border-${getBorderClasses()}`}`}
                        >
                          <Zap className="h-4 w-4" />
                          {formData.isDynamicInstall ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Platform and Status */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Platform & Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Platforms *
                    </label>
                    <div className="flex gap-3">
                      {['Windows', 'Mac', 'Linux'].map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => handlePlatformChange(platform, !formData.platform.includes(platform as 'Windows' | 'Mac' | 'Linux'))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border
                            ${formData.platform.includes(platform as 'Windows' | 'Mac' | 'Linux')
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                              : `${getButtonClasses('toggle')} border-${getBorderClasses()}`}`}
                        >
                          {getPlatformIcon(platform)}
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'in-progress' | 'live' | 'deprecated' }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')}`}
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="live">Live</option>
                      <option value="deprecated">Deprecated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Licensing */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Licensing Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      License Type
                    </label>
                    <input
                      type="text"
                      value={formData.licensing.type}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, type: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., Volume License, Enterprise Subscription"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.licensing.expiryDate || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, expiryDate: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} appearance-none`}
                      style={{ colorScheme: theme === 'light' ? 'light' : 'dark' }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      License Notes
                    </label>
                    <textarea
                      value={formData.licensing.notes}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, notes: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      rows={3}
                      placeholder="Additional licensing information"
                    />
                  </div>
                </div>
              </div>

              {/* Packaging Details */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Packaging Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Packaging Methodology
                    </label>
                    <input
                      type="text"
                      value={formData.packagingMethodology}
                      onChange={(e) => setFormData(prev => ({ ...prev, packagingMethodology: e.target.value }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., Silent Install with Configuration"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Primary File Type
                    </label>
                    <select
                      value={formData.fileTypes.primary}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        fileTypes: { ...prev.fileTypes, primary: e.target.value as 'msi' | 'msi-mst' | 'exe' | 'appx' }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')}`}
                    >
                      <option value="msi">MSI</option>
                      <option value="msi-mst">MSI with MST</option>
                      <option value="exe">EXE</option>
                      <option value="appx">APPX (Intune)</option>
                    </select>
                  </div>
                  <div>
                    <label className={`flex items-center gap-2`}>
                      <input
                        type="checkbox"
                        checked={formData.fileTypes.hasScript}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          fileTypes: { ...prev.fileTypes, hasScript: e.target.checked }
                        }))}
                        className={`rounded border-${getBorderClasses()} ${getBgClasses('input')} text-blue-600 focus:ring-blue-500`}
                      />
                      <span className={`${getTextClasses('primary')} text-sm`}>Includes PowerShell Script</span>
                    </label>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Tools Used (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.toolsUsed.join(', ')}
                      onChange={(e) => {
                        const items = e.target.value.split(',').map(item => item.trim()).filter(item => item.length > 0);
                        setFormData(prev => ({ ...prev, toolsUsed: items }));
                      }}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., PACE Recorded Install, Master Packager"
                    />
                  </div>
                </div>
              </div>

              {/* Packager & Sponsor Information */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Packager & Sponsor</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Last Packaged By
                    </label>
                    <input
                      type="text"
                      value={formData.lastPackagedBy}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastPackagedBy: e.target.value }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Sponsor Name
                    </label>
                    <input
                      type="text"
                      value={formData.sponsor.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        sponsor: { ...prev.sponsor, name: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., Emily Chen"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Sponsor Department
                    </label>
                    <input
                      type="text"
                      value={formData.sponsor.department}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        sponsor: { ...prev.sponsor, department: e.target.value }
                      }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., IT Operations"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Folder Paths */}
              {formData.deploymentType === 'sccm' && (
                <>
                  <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                    <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Folder Paths</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                          Source Path
                        </label>
                        <input
                          type="text"
                          value={formData.folderPaths.source}
                          onChange={(e) => setFormData(prev => ({ ...prev, folderPaths: { ...prev.folderPaths, source: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')} font-mono text-sm`}
                          placeholder="\\server\packages\..."
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                          Deployment Path
                        </label>
                        <input
                          type="text"
                          value={formData.folderPaths.deployment}
                          onChange={(e) => setFormData(prev => ({ ...prev, folderPaths: { ...prev.folderPaths, deployment: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')} font-mono text-sm`}
                          placeholder="\\server\sccm\Applications\..."
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                          Logs Path
                        </label>
                        <input
                          type="text"
                          value={formData.folderPaths.logs}
                          onChange={(e) => setFormData(prev => ({ ...prev, folderPaths: { ...prev.folderPaths, logs: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')} font-mono text-sm`}
                          placeholder="\\server\logs\..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                    <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>SCCM Deployment Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>Installation Command</label>
                        <input
                          type="text"
                          value={formData.sccmDeployment?.installCommand || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, sccmDeployment: { ...prev.sccmDeployment, installCommand: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} font-mono text-sm`}
                          placeholder="e.g., Powershell.exe -File .\install.ps1"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>Uninstall Command</label>
                        <input
                          type="text"
                          value={formData.sccmDeployment?.uninstallCommand || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, sccmDeployment: { ...prev.sccmDeployment, uninstallCommand: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} font-mono text-sm`}
                          placeholder="e.g., msiexec.exe /x {GUID} /qn"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>Repair Command</label>
                        <input
                          type="text"
                          value={formData.sccmDeployment?.repairCommand || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, sccmDeployment: { ...prev.sccmDeployment, repairCommand: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} font-mono text-sm`}
                          placeholder="e.g., msiexec.exe /f {GUID} /qn"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>Product Code/GUID</label>
                        <input
                          type="text"
                          value={formData.sccmDeployment?.productCode || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, sccmDeployment: { ...prev.sccmDeployment, productCode: e.target.value } }))}
                          className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} font-mono text-sm`}
                          placeholder="e.g., {12345678-ABCD-1234-ABCD-1234567890AB}"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Basic Information */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., Adobe Acrobat Pro DC"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Version *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.version}
                      onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      placeholder="e.g., 2024.001.20643"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${getTextClasses('primary')} mb-2`}>
                      Summary *
                    </label>
                    <textarea
                      required
                      value={formData.summary}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                      rows={3}
                      placeholder="Brief description or status"
                    />
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4`}>Comments & Notes</h3>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  className={`w-full px-3 py-2 ${getInputClasses()} rounded-lg ${getTextClasses('input')} placeholder-${getTextClasses('secondary')}`}
                  rows={4}
                  placeholder="Additional comments, deployment notes, or configuration details"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
