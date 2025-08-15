import React, { useState, useEffect } from 'react';
import { X, Save, FileCode, AlertCircle, CheckCircle } from 'lucide-react';

interface Script {
  name: string;
  type: string;
  content: string;
}

interface ScriptWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (script: Script) => void;
  initialScript?: Script | null;
  theme: string;
}

export default function ScriptWizardModal({
  isOpen,
  onClose,
  onSave,
  initialScript,
  theme
}: ScriptWizardModalProps) {
  const [script, setScript] = useState<Script>({
    name: '',
    type: 'PowerShell',
    content: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getModalClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white border-gray-200';
      case 'amoled':
        return 'bg-black border-gray-800';
      default:
        return 'bg-slate-800 border-slate-700/50';
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

  const getTextClasses = (type: 'primary' | 'secondary' | 'input' | 'code') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary':
            return 'text-gray-900';
          case 'secondary':
            return 'text-gray-600';
          case 'input':
            return 'text-gray-800';
          case 'code':
            return 'text-gray-800';
        }
      case 'amoled':
        switch (type) {
          case 'primary':
            return 'text-white';
          case 'secondary':
            return 'text-gray-300';
          case 'input':
            return 'text-gray-200';
          case 'code':
            return 'text-gray-200';
        }
      default:
        switch (type) {
          case 'primary':
            return 'text-slate-100';
          case 'secondary':
            return 'text-slate-400';
          case 'input':
            return 'text-slate-100';
          case 'code':
            return 'text-slate-300';
        }
    }
  };

  const getBgClasses = (type: 'input' | 'code' | 'error') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'input':
            return 'bg-gray-100';
          case 'code':
            return 'bg-gray-100';
          case 'error':
            return 'bg-red-100/50';
        }
      case 'amoled':
        switch (type) {
          case 'input':
            return 'bg-gray-950';
          case 'code':
            return 'bg-gray-950';
          case 'error':
            return 'bg-red-900/50';
        }
      default:
        switch (type) {
          case 'input':
            return 'bg-slate-700/50';
          case 'code':
            return 'bg-slate-900/50';
          case 'error':
            return 'bg-red-500/20';
        }
    }
  };

  const getButtonClasses = (type: 'primary' | 'secondary') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary':
            return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary':
            return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
        }
      case 'amoled':
        switch (type) {
          case 'primary':
            return 'bg-blue-700 hover:bg-blue-800 text-white';
          case 'secondary':
            return 'bg-gray-800 hover:bg-gray-700 text-white';
        }
      default:
        switch (type) {
          case 'primary':
            return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary':
            return 'bg-slate-700 hover:bg-slate-600 text-white';
        }
    }
  };

  const getInputClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-gray-100 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500/50';
      case 'amoled':
        return 'bg-gray-950 border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500/50';
      default:
        return 'bg-slate-700/50 border-slate-600/50 text-slate-100 focus:ring-2 focus:ring-blue-500/50';
    }
  };

  useEffect(() => {
    if (initialScript) {
      setScript(initialScript);
    } else {
      setScript({ name: '', type: 'PowerShell', content: '' });
    }
    setError('');
  }, [initialScript, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScript(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Validate script size (max 10KB)
    if (new Blob([script.content]).size > 10 * 1024) {
      setError('Script is too large. Maximum size is 10KB.');
      return;
    }
    if (!script.name.trim()) {
      setError('Script name is required');
      return;
    }
    if (!script.content.trim()) {
      setError('Script content cannot be empty');
      return;
    }
    setIsSubmitting(true);
    try {
      onSave(script);
      onClose();
    } catch (err) {
      setError('Failed to save script. Please try again.');
      console.error('Error saving script:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${getModalClasses()} rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl`}>
        <div className={`flex items-center justify-between p-4 border-b ${getBorderClasses()}`}>
          <h2 className={`text-xl font-bold ${getTextClasses('primary')} flex items-center gap-2`}>
            <FileCode className="h-5 w-5 text-blue-400" />
            {initialScript ? 'Edit Script' : 'Add New Script'}
          </h2>
          <button onClick={onClose} className={`p-1 ${getTextClasses('secondary')} hover:${getTextClasses('primary')} transition-colors`} disabled={isSubmitting}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className={`${getBgClasses('error')} border border-red-500/30 text-red-300 p-3 rounded-lg flex items-start gap-2`}>
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="scriptName" className={`block text-sm font-medium ${getTextClasses('primary')}`}>
              Script Name
              <span className="text-red-400">*</span>
            </label>
            <input type="text" id="scriptName" name="name" value={script.name} onChange={handleInputChange} className={`w-full ${getInputClasses()} rounded-lg px-3 py-2 ${getTextClasses('input')} focus:outline-none`} placeholder="e.g., Pre-Installation Script" disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <label htmlFor="scriptType" className={`block text-sm font-medium ${getTextClasses('primary')}`}>
              Script Type
            </label>
            <select id="scriptType" name="type" value={script.type} onChange={handleInputChange} className={`w-full ${getInputClasses()} rounded-lg px-3 py-2 ${getTextClasses('input')} focus:outline-none`} disabled={isSubmitting}>
              <option value="PowerShell">PowerShell</option>
              <option value="Batch">Batch</option>
              <option value="VBScript">VBScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="scriptContent" className={`block text-sm font-medium ${getTextClasses('primary')}`}>
                Script Content
                <span className="text-red-400">*</span>
              </label>
              <span className={`text-xs ${getTextClasses('secondary')}`}>
                {new Blob([script.content]).size.toLocaleString()} bytes (max 10KB)
              </span>
            </div>
            <div className="relative">
              <textarea id="scriptContent" name="content" value={script.content} onChange={handleInputChange} className={`w-full h-64 font-mono text-sm ${getBgClasses('code')} border ${getBorderClasses()} rounded-lg px-3 py-2 ${getTextClasses('code')} focus:outline-none focus:ring-2 focus:ring-blue-500/50`} placeholder="Paste your script here..." disabled={isSubmitting} spellCheck="false" />
              <div className={`absolute bottom-2 right-2 text-xs ${getTextClasses('secondary')}`}>
                {script.content.split('\n').length} lines
              </div>
            </div>
          </div>
          <div className={`flex justify-end space-x-3 pt-4 border-t ${getBorderClasses()}`}>
            <button type="button" onClick={onClose} className={`px-4 py-2 ${getButtonClasses('secondary')} rounded-lg font-medium transition-colors`} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className={`px-4 py-2 ${getButtonClasses('primary')} rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50`} disabled={isSubmitting}>
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Script
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
