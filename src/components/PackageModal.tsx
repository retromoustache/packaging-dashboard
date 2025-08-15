import React, { useState, useEffect } from 'react';
import { Package } from '../types/Package';
import { X, Copy, Calendar, FolderOpen, FileText, PenTool as Tool, Shield, MessageSquare, CheckCircle, AlertCircle, Clock, XCircle, User, Users, History, Cloud, FileCode, ArrowLeft } from 'lucide-react';

interface PackageModalProps {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PackageModal({ package: pkg, isOpen, onClose, onEdit, onDelete }: PackageModalProps) {
  const [showTechnical, setShowTechnical] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowTechnical(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
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
                <h2 className="text-2xl font-bold text-slate-100">{pkg.name}</h2>
                <p className="text-slate-400">Version {pkg.version}</p>
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
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {showTechnical ? <ArrowLeft className="h-5 w-5" /> : <FileCode className="h-5 w-5" />}
                {showTechnical ? 'Back to Details' : 'Technical Details'}
              </button>
            )}
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {showTechnical ? (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-blue-400" />
                  SCCM Deployment Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Installation Command</label>
                    <code className="block mt-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                      {pkg.sccmDeployment?.installCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Uninstall Command</label>
                    <code className="block mt-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                      {pkg.sccmDeployment?.uninstallCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Repair Command</label>
                    <code className="block mt-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                      {pkg.sccmDeployment?.repairCommand || 'Not set'}
                    </code>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Product Code/GUID</label>
                    <code className="block mt-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                      {pkg.sccmDeployment?.productCode || 'Not set'}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Status and Platform */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    Status & Platform
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(pkg.status)}
                      <span className="text-slate-300">
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.platform.map((platform) => (
                        <span
                          key={platform}
                          className="inline-flex items-center px-2.5 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-md border border-slate-600/50"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      Last updated: {new Date(pkg.lastUpdated).toLocaleDateString()}
                    </div>
                    {pkg.deploymentType === 'sccm' && (
                      <div className="pt-3 mt-3 border-t border-slate-700/50">
                        <h4 className="text-sm font-medium text-slate-300 mb-2">SCCM Flags</h4>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs rounded-md border ${
                              pkg.isPatchMyPC
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600/50'
                            }`}
                          >
                            Patch My PC
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs rounded-md border ${
                              pkg.isDynamicInstall
                                ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600/50'
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
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Packager Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Last Packaged By:</label>
                      <p className="text-slate-400 mt-1">{pkg.lastPackagedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Sponsor:</label>
                      <div className="mt-1">
                        <p className="text-slate-400">{pkg.sponsor.name}</p>
                        <p className="text-slate-500 text-sm">{pkg.sponsor.department}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packaging Details */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <Tool className="h-5 w-5 text-blue-400" />
                    Packaging Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Methodology:</label>
                      <p className="text-slate-400 mt-1 break-words">{pkg.packagingMethodology}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">File Types:</label>
                      <p className="text-slate-400 mt-1">{getFileTypeDisplay(pkg.fileTypes)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Tools Used:</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pkg.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600/50"
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
                {/* Folder Paths */}
                {pkg.deploymentType === 'sccm' && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-blue-400" />
                      Folder Paths
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(pkg.folderPaths).map(([key, path]) => (
                        <div key={key}>
                          <label className="text-sm font-medium text-slate-300 capitalize">
                            {key}:
                          </label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="flex-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                              {path}
                            </code>
                            <button
                              onClick={() => copyToClipboard(path)}
                              className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
                              title="Copy to clipboard"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Licensing */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Licensing Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-300">License Type:</label>
                      <p className="text-slate-400 mt-1 break-words">{pkg.licensing.type}</p>
                    </div>
                    {pkg.licensing.expiryDate && (
                      <div>
                        <label className="text-sm font-medium text-slate-300">Expiry Date:</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex flex-col">
                            <p className={`${isExpired(pkg.licensing.expiryDate) ? 'text-red-400' : isLicenseExpiringSoon(pkg.licensing.expiryDate) ? 'text-amber-400' : 'text-slate-400'}`}>
                              {new Date(pkg.licensing.expiryDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500">({formatTimeRemaining(pkg.licensing.expiryDate)})</p>
                          </div>
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
                    )}
                    {pkg.licensing.notes && (
                      <div>
                        <label className="text-sm font-medium text-slate-300">Notes:</label>
                        <p className="text-slate-400 mt-1 text-sm leading-relaxed break-words">{pkg.licensing.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* License Files */}
                {pkg.licensing.fileLinks.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <h3 className="font-semibold text-slate-100 mb-3">License Files</h3>
                    <div className="space-y-2">
                      {pkg.licensing.fileLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <code className="flex-1 bg-slate-900/50 text-slate-300 text-sm p-2 rounded border border-slate-700/50 font-mono break-all">
                            {link}
                          </code>
                          <button
                            onClick={() => copyToClipboard(link)}
                            className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
                            title="Copy to clipboard"
                          >
                            <Copy className="h-4 w-4" />
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
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Packaging History
                  </h3>
                  <div className="space-y-3">
                    {pkg.packagedByHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div>
                          <p className="text-slate-300 font-medium">{entry.packager}</p>
                          <p className="text-slate-500 text-sm">Version {entry.version}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-sm">{new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit History */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-400" />
                    Audit History
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {pkg.auditHistory.map((entry, index) => (
                      <div key={index} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-slate-300 font-medium text-sm">{entry.action}</span>
                          <span className="text-slate-500 text-xs">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">by {entry.user}</p>
                        <p className="text-slate-300 text-xs break-words">{entry.changes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    Comments & Notes
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed break-words">
                    {pkg.comments || 'No comments available.'}
                  </p>
                </div>

                {/* Metadata */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h3 className="font-semibold text-slate-100 mb-3">Metadata</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Package ID:</span>
                      <span className="text-slate-300 font-mono">{pkg.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Created:</span>
                      <span className="text-slate-300">{new Date(pkg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Updated:</span>
                      <span className="text-slate-300">{new Date(pkg.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}