import React, { useState, useEffect } from 'react';
import { Package } from '../types/Package';
import { X, Save, Package as PackageIcon, Monitor, Apple, Zap, Wrench } from 'lucide-react';

interface AddPackageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Omit<Package, 'id' | 'createdAt'>) => void;
  editingPackage?: Package | null;
  onCancelEdit?: () => void;
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
  licensing: pkg?.licensing || {
    type: '',
    fileLinks: [],
    notes: '',
    expiryDate: undefined
  },
  comments: pkg?.comments || '',
  auditHistory: pkg?.auditHistory || []
});


export default function AddPackageForm({ isOpen, onClose, onSave, editingPackage, onCancelEdit }: AddPackageFormProps) {
  const [formData, setFormData] = useState<Omit<Package, 'id' | 'createdAt'>>(getInitialFormData(editingPackage));

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
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <PackageIcon className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Deployment Type */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Deployment Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Deployment Type
                    </label>
                    <div className="flex items-center space-x-2 p-1 bg-slate-700/50 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, deploymentType: 'sccm' }))}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                          ${formData.deploymentType === 'sccm' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-600/50'}`}
                      >
                        SCCM
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, deploymentType: 'intune', isPatchMyPC: false, isDynamicInstall: false }))}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                          ${formData.deploymentType === 'intune' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-600/50'}`}
                      >
                        Intune
                      </button>
                    </div>
                  </div>
                  
                  {formData.deploymentType === 'sccm' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Patch My PC
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isPatchMyPC: !prev.isPatchMyPC }))}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border
                            ${formData.isPatchMyPC 
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                              : 'text-slate-300 border-slate-600/50 hover:bg-slate-600/50'}`}
                        >
                          <Wrench className="h-4 w-4" />
                          {formData.isPatchMyPC ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Dynamic Install (C/D)
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isDynamicInstall: !prev.isDynamicInstall }))}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border
                            ${formData.isDynamicInstall 
                              ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
                              : 'text-slate-300 border-slate-600/50 hover:bg-slate-600/50'}`}
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
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Platform & Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
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
                              : 'text-slate-300 border-slate-600/50 hover:bg-slate-600/50'}`}
                        >
                          {getPlatformIcon(platform)}
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'in-progress' | 'live' | 'deprecated' }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="live">Live</option>
                      <option value="deprecated">Deprecated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Licensing */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Licensing Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      License Type
                    </label>
                    <input
                      type="text"
                      value={formData.licensing.type}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, type: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., Volume License, Enterprise Subscription"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.licensing.expiryDate || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, expiryDate: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      License Notes
                    </label>
                    <textarea
                      value={formData.licensing.notes}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        licensing: { ...prev.licensing, notes: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      rows={3}
                      placeholder="Additional licensing information"
                    />
                  </div>
                </div>
              </div>

              {/* Packaging Details */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Packaging Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Packaging Methodology
                    </label>
                    <input
                      type="text"
                      value={formData.packagingMethodology}
                      onChange={(e) => setFormData(prev => ({ ...prev, packagingMethodology: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., Silent Install with Configuration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Primary File Type
                    </label>
                    <select
                      value={formData.fileTypes.primary}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        fileTypes: { ...prev.fileTypes, primary: e.target.value as 'msi' | 'msi-mst' | 'exe' | 'appx' }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    >
                      <option value="msi">MSI</option>
                      <option value="msi-mst">MSI with MST</option>
                      <option value="exe">EXE</option>
                      <option value="appx">APPX (Intune)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.fileTypes.hasScript}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          fileTypes: { ...prev.fileTypes, hasScript: e.target.checked }
                        }))}
                        className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-300 text-sm">Includes PowerShell Script</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tools Used (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.toolsUsed.join(', ')}
                      onChange={(e) => {
                        const items = e.target.value.split(',').map(item => item.trim()).filter(item => item.length > 0);
                        setFormData(prev => ({ ...prev, toolsUsed: items }));
                      }}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., PACE Recorded Install, Master Packager"
                    />
                  </div>
                </div>
              </div>

              {/* Packager & Sponsor Information */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Packager & Sponsor</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Packaged By
                    </label>
                    <input
                      type="text"
                      value={formData.lastPackagedBy}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastPackagedBy: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Sponsor Name
                    </label>
                    <input
                      type="text"
                      value={formData.sponsor.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        sponsor: { ...prev.sponsor, name: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., Emily Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Sponsor Department
                    </label>
                    <input
                      type="text"
                      value={formData.sponsor.department}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        sponsor: { ...prev.sponsor, department: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
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
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Folder Paths</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Source Path
                    </label>
                    <input
                      type="text"
                      value={formData.folderPaths.source}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        folderPaths: { ...prev.folderPaths, source: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 font-mono text-sm"
                      placeholder="\\server\packages\..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Deployment Path
                    </label>
                    <input
                      type="text"
                      value={formData.folderPaths.deployment}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        folderPaths: { ...prev.folderPaths, deployment: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 font-mono text-sm"
                      placeholder="\\server\sccm\Applications\..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Logs Path
                    </label>
                    <input
                      type="text"
                      value={formData.folderPaths.logs}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, 
                        folderPaths: { ...prev.folderPaths, logs: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 font-mono text-sm"
                      placeholder="\\server\logs\..."
                    />
                  </div>
                </div>
              </div>
              )}

              {/* Basic Information */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., Adobe Acrobat Pro DC"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Version *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.version}
                      onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="e.g., 2024.001.20643"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Summary *
                    </label>
                    <textarea
                      required
                      value={formData.summary}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      rows={3}
                      placeholder="Brief description or status"
                    />
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4">Comments & Notes</h3>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  rows={4}
                  placeholder="Additional comments, deployment notes, or configuration details"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-6 py-2.5 text-slate-300 hover:text-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <Save className="h-4 w-4" />
              {editingPackage ? 'Update Package' : 'Save Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}