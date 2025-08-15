import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Package } from '../types/Package';

interface ScriptEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (script: Package['scripts'][number]) => void;
  script: Package['scripts'][number] | null;
}

export default function ScriptEditorModal({ isOpen, onClose, onSave, script }: ScriptEditorModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'powershell' | 'vbscript' | 'batch' | 'other'>('powershell');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (script) {
      setName(script.name);
      setType(script.type);
      setContent(script.content);
    } else {
      setName('');
      setType('powershell');
      setContent('');
    }
  }, [script]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ name, type, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-slate-100">{script ? 'Edit Script' : 'Add Script'}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-300 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Script Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              placeholder="e.g., Install-Script.ps1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Script Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'powershell' | 'vbscript' | 'batch' | 'other')}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="powershell">PowerShell</option>
              <option value="vbscript">VBScript</option>
              <option value="batch">Batch</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Script Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 font-mono text-sm"
              placeholder="Paste your script content here..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t border-slate-700/50">
          <button onClick={onClose} className="px-6 py-2.5 text-slate-300 hover:text-slate-100 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            <Save className="h-4 w-4" />
            Save Script
          </button>
        </div>
      </div>
    </div>
  );
}
