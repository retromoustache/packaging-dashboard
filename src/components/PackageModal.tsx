import React, { useState, useEffect } from 'react';
import { Package } from '../types/Package';
import { X, Copy, Calendar, FolderOpen, FileText, PenTool as Tool, Shield, MessageSquare, CheckCircle, AlertCircle, Clock, XCircle, User, Users, History, Cloud, FileCode, ArrowLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import ScriptWizardModal from './ScriptWizardModal';
import ConfirmationModal from './ConfirmationModal';

interface PackageModalProps {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdatePackage: (updatedPackage: Package) => void;
  theme: string;
}

export default function PackageModal({ package: pkg, isOpen, onClose, onEdit, onDelete, onUpdatePackage, theme }: PackageModalProps) {
  const [showTechnical, setShowTechnical] = useState(false);
  const [selectedScript, setSelectedScript] = useState<NonNullable<Package['scripts']>[number] | null>(null);
  const [isScriptWizardOpen, setIsScriptWizardOpen] = useState(false);
  const [copiedIdentifier, setCopiedIdentifier] = useState<string | null>(null);
  const [scriptToDelete, setScriptToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShowTechnical(false);
      setSelectedScript(null);
      setIsScriptWizardOpen(false);
      setCopiedIdentifier(null);
      setScriptToDelete(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddScriptClick = () => {
    setIsScriptWizardOpen(true);
  };

  const handleSaveScript = (newScript: NonNullable<Package['scripts']>[number]) => {
    const updatedPackage = {
      ...pkg,
      scripts: [...(pkg.scripts || []), newScript],
    };
    onUpdatePackage(updatedPackage);
    setIsScriptWizardOpen(false);
  };

  const handleCloseScriptWizard = () => {
    setIsScriptWizardOpen(false);
  };

  const handleDeleteScript = (index: number) => {
    setScriptToDelete(index);
  };

  const confirmDeleteScript = () => {
    if (scriptToDelete !== null && pkg.scripts) {
      const updatedScripts = pkg.scripts.filter((_, index) => index !== scriptToDelete);
      const updatedPackage = {
        ...pkg,
        scripts: updatedScripts,
      };
      onUpdatePackage(updatedPackage);
      setScriptToDelete(null);
    }
  };

  const formatTimeRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      const absDiffDays = Math.abs(diffDays);
      if (absDiffDays === 0) {
        return 'Expired today';
      } else if (absDiffDays < 30) {
        return `Expired ${absDiffDays} day${absDiffDays !== 1 ? 's' : ''} ago`;
      } else if (absDiffDays < 365) {
        const months = Math.floor(absDiffDays / 30);
        const remainingDays = absDiffDays % 30;
        return remainingDays > 0 ? `Expired ${months} month${months !== 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago` : `Expired ${months} month${months !== 1 ? 's' : ''} ago`;
      } else {
        const years = Math.floor(absDiffDays / 365);
        const remainingDays = absDiffDays % 365;
        const months = Math.floor(remainingDays / 30);
        const days = remainingDays % 30;
        
        let result = `Expired ${years} year${years !== 1 ? 's' : ''}`;
        if (months > 0) result += `, ${months} month${months !== 1 ? 's' : ''}`;
        if (days > 0) result += `, ${days} day${days !== 1 ? 's' : ''}`;
        result += ` ago`;
        return result;
      }
    } else if (diffDays === 0) {
      return 'Expires today';
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return remainingDays > 0 ? `${months} month${months !== 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}` : `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      const months = Math.floor(remainingDays / 30);
      const days = remainingDays % 30;
      
      let result = `${years} year${years !== 1 ? 's' : ''}`;
      if (months > 0) result += `, ${months} month${months !== 1 ? 's' : ''}`;
      if (days > 0) result += `, ${days} day${days !== 1 ? 's' : ''}`;
      return result;
    }
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const isLicenseExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));
    return expiry >= now && expiry <= threeMonthsFromNow;
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdentifier(identifier);
    setTimeout(() => {
      setCopiedIdentifier(null);
    }, 2000);
  };

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

  const getTextClasses = (type: 'primary' | 'secondary' | 'tertiary' | 'code') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary': return 'text-gray-900';
          case 'secondary': return 'text-gray-600';
          case 'tertiary': return 'text-gray-500';
          case 'code': return 'text-gray-800';
        }
      case 'amoled':
        switch (type) {
          case 'primary': return 'text-white';
          case 'secondary': return 'text-gray-300';
          case 'tertiary': return 'text-gray-400';
          case 'code': return 'text-gray-200';
        }
      default:
        switch (type) {
          case 'primary': return 'text-slate-100';
          case 'secondary': return 'text-slate-400';
          case 'tertiary': return 'text-slate-500';
          case 'code': return 'text-slate-300';
        }
    }
  };

  const getBgClasses = (type: 'section' | 'code' | 'button') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'section': return 'bg-gray-50';
          case 'code': return 'bg-gray-100';
          case 'button': return 'bg-gray-200 hover:bg-gray-300';
        }
      case 'amoled':
        switch (type) {
          case 'section': return 'bg-gray-900';
          case 'code': return 'bg-gray-950';
          case 'button': return 'bg-gray-700 hover:bg-gray-600';
        }
      default:
        switch (type) {
          case 'section': return 'bg-slate-800/50';
          case 'code': return 'bg-slate-900/50';
          case 'button': return 'bg-gray-700 hover:bg-gray-600';
        }
    }
  };

  const getButtonClasses = (type: 'primary' | 'secondary' | 'danger' | 'ghost' | 'script') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary': return 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary': return 'px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800';
          case 'danger': return 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white';
          case 'ghost': return 'text-gray-500 hover:text-gray-700';
          case 'script': return 'bg-blue-100/50 text-blue-700 border-blue-200 hover:bg-blue-200/50';
        }
      case 'amoled':
        switch (type) {
          case 'primary': return 'px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white';
          case 'secondary': return 'px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white';
          case 'danger': return 'px-4 py-2 bg-red-700 hover:bg-red-800 text-white';
          case 'ghost': return 'text-gray-400 hover:text-gray-200';
          case 'script': return 'bg-blue-900/50 text-blue-400 border-blue-800 hover:bg-blue-800/50';
        }
      default:
        switch (type) {
          case 'primary': return 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary': return 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white';
          case 'danger': return 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white';
          case 'ghost': return 'p-2 text-slate-400 hover:text-slate-300';
          case 'script': return 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30';
        }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-400" />;
      case 'deprecated':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  

  const getFileTypeDisplay = (fileTypes: { primary: string; hasScript: boolean }) => {
    let display = fileTypes.primary.toUpperCase();
    if (fileTypes.primary === 'msi-mst') {
      display = 'MSI with MST';
    }
    if (fileTypes.hasScript) {
      display += ' + PowerShell Script';
    }
    return display;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${getModalClasses()} rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${getBorderClasses()}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              {pkg.deploymentType === 'intune' ? (
                <Cloud className="h-6 w-6 text-blue-400" />
              ) : (
                <span className="text-2xl">📦</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className={`text-2xl font-bold ${getTextClasses('primary')}`}>{pkg.name}</h2>
                <p className={`${getTextClasses('secondary')}`}>Version {pkg.version}</p>
              </div>
              {pkg.deploymentType === 'intune' && (
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30 text-sm font-medium">
                  Intune Deployment
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pkg.deploymentType === 'sccm' && (
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className={`${getButtonClasses('secondary')} rounded-lg font-medium transition-colors flex items-center gap-2`}
              >
                {showTechnical ? <ArrowLeft className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
                {showTechnical ? 'Back to Details' : 'Technical Details'}
              </button>
            )}
            <button
              onClick={onEdit}
              className={`${getButtonClasses('primary')} rounded-lg font-medium transition-colors`}
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className={`${getButtonClasses('danger')} rounded-lg font-medium transition-colors`}
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className={`${getButtonClasses('ghost')} transition-colors`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedScript ? (
            <div className="space-y-6">
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${getTextClasses('primary')} flex items-center gap-2`}>
                    <FileCode className="h-5 w-5 text-blue-400" />
                    {selectedScript.name}
                  </h3>
                  <button
                    onClick={() => setSelectedScript(null)}
                    className={`${getButtonClasses('secondary')} rounded-lg font-medium transition-colors flex items-center gap-2`}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Scripts
                  </button>
                </div>
                <pre className={`${getBgClasses('code')} ${getTextClasses('code')} text-sm p-4 rounded border ${getBorderClasses()} font-mono break-all overflow-auto max-h-[60vh]`}>
                  <code>{selectedScript.content}</code>
                </pre>
              </div>
            </div>
          ) : showTechnical ? (
            <div className="space-y-6">
              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-4 flex items-center gap-2`}>
                  <FileCode className="h-5 w-5 text-blue-400" />
                  SCCM Deployment Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${getTextClasses('code')}`}>Installation Command</label>
                    <code className={`block mt-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                      {pkg.sccmDeployment?.installCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${getTextClasses('code')}`}>Uninstall Command</label>
                    <code className={`block mt-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                      {pkg.sccmDeployment?.uninstallCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${getTextClasses('code')}`}>Repair Command</label>
                    <code className={`block mt-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                      {pkg.sccmDeployment?.repairCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${getTextClasses('code')}`}>Product Code/GUID</label>
                    <code className={`block mt-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                      {pkg.sccmDeployment?.productCode || 'Not set'}
                    </code>
                  </div>
                </div>
              </div>

              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                  <FolderOpen className="h-5 w-5 text-blue-400" />
                  Folder Paths
                </h3>
                <div className="space-y-3">
                  {pkg.folderPaths ? (
                    Object.entries(pkg.folderPaths).map(([key, path]) => (
                      <div key={key}>
                        <label className={`text-sm font-medium ${getTextClasses('code')} capitalize`}>
                          {key}:
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className={`flex-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                            {path}
                          </code>
                          <button
                            onClick={() => copyToClipboard(path as string, key)}
                            className={`${getButtonClasses('ghost')} transition-colors relative`}
                            title="Copy to clipboard"
                          >
                            {copiedIdentifier === key ? (
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedIdentifier === key && (
                              <span className="absolute -top-7 right-1/2 transform translate-x-1/2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md shadow-lg z-10">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={`${getTextClasses('secondary')} text-sm`}>No folder paths set.</p>
                  )}
                </div>
              </div>

              <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                  <FileCode className="h-5 w-5 text-blue-400" />
                  Scripts
                </h3>
                <div className="space-y-2">
                  {pkg.scripts && pkg.scripts.length > 0 ? (
                    pkg.scripts.map((script, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedScript(script)}
                        className={`w-full flex items-center justify-between p-3 ${getBgClasses('code')} rounded-lg border ${getBorderClasses()} hover:${getBgClasses('button')} transition-colors`}
                      >
                        <div>
                          <p className={`${getTextClasses('code')} font-medium`}>{script.name}</p>
                          <p className={`${getTextClasses('tertiary')} text-sm`}>{script.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteScript(index); }}
                            className={`p-1 ${getButtonClasses('ghost')} hover:text-red-400 transition-colors`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        <ChevronRight className={`h-5 w-5 ${getTextClasses('secondary')}`} />
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className={`${getTextClasses('secondary')} text-sm`}>No scripts added.</p>
                  )}
                  <button
                    onClick={handleAddScriptClick}
                    className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 ${getButtonClasses('script')} transition-colors`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Script
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Status and Platform */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <Shield className="h-5 w-5 text-blue-400" />
                    Status & Platform
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(pkg.status)}
                      <span className={`${getTextClasses('primary')}`}>
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.platform.map((platform) => (
                        <span
                          key={platform}
                          className={`inline-flex items-center px-2.5 py-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm rounded-md border ${getBorderClasses()}`}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${getTextClasses('secondary')}`}>
                      <Calendar className="h-4 w-4" />
                      Last updated: {new Date(pkg.lastUpdated).toLocaleDateString()}
                    </div>
                    {pkg.deploymentType === 'sccm' && (
                      <div className={`pt-3 mt-3 border-t ${getBorderClasses()}`}>
                        <h4 className={`text-sm font-medium ${getTextClasses('primary')} mb-2`}>SCCM Flags</h4>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs rounded-md border ${
                              pkg.isPatchMyPC
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : `${getBgClasses('code')} ${getTextClasses('secondary')} ${getBorderClasses()}`
                            }`}
                          >
                            Patch My PC
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs rounded-md border ${
                              pkg.isDynamicInstall
                                ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                                : `${getBgClasses('code')} ${getTextClasses('secondary')} ${getBorderClasses()}`
                            }`}
                          >
                            Dynamic Install (C/D)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Packager Information */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <User className="h-5 w-5 text-blue-400" />
                    Packager Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Last Packaged By:</label>
                      <p className={`${getTextClasses('secondary')} mt-1`}>{pkg.lastPackagedBy}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Sponsor:</label>
                      <div className="mt-1">
                        <p className={`${getTextClasses('secondary')}`}>{pkg.sponsor.name}</p>
                        <p className={`${getTextClasses('tertiary')} text-sm`}>{pkg.sponsor.department}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packaging Details */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <Tool className="h-5 w-5 text-blue-400" />
                    Packaging Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Methodology:</label>
                      <p className={`${getTextClasses('secondary')} mt-1 break-words`}>{pkg.packagingMethodology}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>File Types:</label>
                      <p className={`${getTextClasses('secondary')} mt-1`}>{getFileTypeDisplay(pkg.fileTypes)}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Tools Used:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pkg.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className={`inline-flex items-center px-2 py-1 ${getBgClasses('code')} ${getTextClasses('code')} text-xs rounded border ${getBorderClasses()}`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* Licensing */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <FileText className="h-5 w-5 text-blue-400" />
                    Licensing Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${getTextClasses('primary')}`}>License Type:</label>
                      <p className={`${getTextClasses('secondary')} mt-1 break-words`}>{pkg.licensing.type}</p>
                    </div>
                    {pkg.licensing.expiryDate && (
                      <div>
                        <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Expiry Date:</label>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <p className={`${isExpired(pkg.licensing.expiryDate) ? 'text-red-400' : isLicenseExpiringSoon(pkg.licensing.expiryDate) ? 'text-amber-400' : `${getTextClasses('secondary')}`}`}>
                                {new Date(pkg.licensing.expiryDate).toLocaleDateString()}
                              </p>
                              <p className={`text-xs ${getTextClasses('tertiary')}`}>({formatTimeRemaining(pkg.licensing.expiryDate)})</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {isExpired(pkg.licensing.expiryDate) && (
                              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30">
                                Expired
                              </span>
                            )}
                            {isLicenseExpiringSoon(pkg.licensing.expiryDate) && (
                              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30">
                                Expires Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {pkg.licensing.notes && (
                      <div>
                        <label className={`text-sm font-medium ${getTextClasses('primary')}`}>Notes:</label>
                        <p className={`${getTextClasses('secondary')} mt-1 text-sm leading-relaxed break-words`}>{pkg.licensing.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* License Files */}
                {pkg.licensing.fileLinks.length > 0 && (
                  <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                    <h3 className={`font-semibold ${getTextClasses('primary')} mb-3`}>License Files</h3>
                    <div className="space-y-2">
                      {pkg.licensing.fileLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <code className={`flex-1 ${getBgClasses('code')} ${getTextClasses('code')} text-sm p-2 rounded border ${getBorderClasses()} font-mono break-all`}>
                            {link}
                          </code>
                          <button
                            onClick={() => copyToClipboard(link, `license-${index}`)}
                            className={`${getButtonClasses('ghost')} transition-colors relative`}
                            title="Copy to clipboard"
                          >
                            {copiedIdentifier === `license-${index}` ? (
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedIdentifier === `license-${index}` && (
                              <span className="absolute -top-7 right-1/2 transform translate-x-1/2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md shadow-lg z-10">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Packaging History */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <Users className="h-5 w-5 text-blue-400" />
                    Packaging History
                  </h3>
                  <div className="space-y-3">
                    {pkg.packagedByHistory.map((entry, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 ${getBgClasses('code')} rounded-lg border ${getBorderClasses()}`}>
                        <div>
                          <p className={`${getTextClasses('primary')} font-medium`}>{entry.packager}</p>
                          <p className={`${getTextClasses('tertiary')} text-sm`}>Version {entry.version}</p>
                        </div>
                        <div className="text-right">
                          <p className={`${getTextClasses('secondary')} text-sm`}>{new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit History */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <History className="h-5 w-5 text-blue-400" />
                    Audit History
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {pkg.auditHistory.map((entry, index) => (
                      <div key={index} className={`p-3 ${getBgClasses('code')} rounded-lg border ${getBorderClasses()}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`${getTextClasses('primary')} font-medium text-sm`}>{entry.action}</span>
                          <span className={`${getTextClasses('tertiary')} text-xs`}>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <p className={`${getTextClasses('secondary')} text-xs mb-1`}>by {entry.user}</p>
                        <p className={`${getTextClasses('primary')} text-xs break-words`}>{entry.changes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3 flex items-center gap-2`}>
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    Comments & Notes
                  </h3>
                  <p className={`${getTextClasses('primary')} text-sm leading-relaxed break-words`}>
                    {pkg.comments || 'No comments available.'}
                  </p>
                </div>

                {/* Metadata */}
                <div className={`${getBgClasses('section')} rounded-xl p-4 border ${getBorderClasses()}`}>
                  <h3 className={`font-semibold ${getTextClasses('primary')} mb-3`}>Metadata</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={`${getTextClasses('secondary')}`}>Package ID:</span>
                      <span className={`${getTextClasses('primary')} font-mono`}>{pkg.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${getTextClasses('secondary')}`}>Created:</span>
                      <span className={`${getTextClasses('primary')}`}>{new Date(pkg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${getTextClasses('secondary')}`}>Last Updated:</span>
                      <span className={`${getTextClasses('primary')}`}>{new Date(pkg.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ScriptWizardModal
        isOpen={isScriptWizardOpen}
        onClose={handleCloseScriptWizard}
        onSave={handleSaveScript}
        theme={theme}
      />

      <ConfirmationModal
        isOpen={scriptToDelete !== null}
        onClose={() => setScriptToDelete(null)}
        onConfirm={confirmDeleteScript}
        title="Delete File"
        message={`Are you sure you want to delete "${pkg.scripts?.[scriptToDelete || 0]?.name}"? This action cannot be undone.`}
        confirmText="Delete File"
        type="danger"
        theme={theme}
      />
    </div>
  );
}