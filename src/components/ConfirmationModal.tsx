import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: 'danger' | 'warning' | 'info';
  theme: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  type = 'danger',
  theme
}: ConfirmationModalProps) {
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

  const getTextClasses = (textType: 'primary' | 'secondary') => {
    switch (theme) {
      case 'light':
        switch (textType) {
          case 'primary': return 'text-gray-900';
          case 'secondary': return 'text-gray-600';
        }
      case 'amoled':
        switch (textType) {
          case 'primary': return 'text-white';
          case 'secondary': return 'text-gray-300';
        }
      default:
        switch (textType) {
          case 'primary': return 'text-slate-100';
          case 'secondary': return 'text-slate-400';
        }
    }
  };

  const getButtonClasses = (buttonType: 'primary' | 'secondary' | 'danger') => {
    switch (theme) {
      case 'light':
        switch (buttonType) {
          case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary': return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
          case 'danger': return 'bg-red-600 hover:bg-red-700 text-white';
        }
      case 'amoled':
        switch (buttonType) {
          case 'primary': return 'bg-blue-700 hover:bg-blue-800 text-white';
          case 'secondary': return 'bg-gray-800 hover:bg-gray-700 text-white';
          case 'danger': return 'bg-red-700 hover:bg-red-800 text-white';
        }
      default:
        switch (buttonType) {
          case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'secondary': return 'bg-slate-700 hover:bg-slate-600 text-white';
          case 'danger': return 'bg-red-600 hover:bg-red-700 text-white';
        }
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
      default:
        return 'text-blue-400';
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${getModalClasses()} rounded-xl w-full max-w-md overflow-hidden shadow-2xl`}>
        <div className={`flex items-center justify-between p-6 border-b ${getBorderClasses()}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === 'danger' ? 'bg-red-500/20 border border-red-500/30' : type === 'warning' ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-blue-500/20 border border-blue-500/30'}`}>
              {type === 'danger' ? (
                <Trash2 className={`h-5 w-5 ${getIconColor()}`} />
              ) : (
                <AlertTriangle className={`h-5 w-5 ${getIconColor()}`} />
              )}
            </div>
            <h2 className={`text-xl font-bold ${getTextClasses('primary')}`}>{title}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 ${getTextClasses('secondary')} hover:${getTextClasses('primary')} transition-colors`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className={`${getTextClasses('secondary')} leading-relaxed mb-6`}>
            {message}
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 ${getButtonClasses('secondary')} rounded-lg font-medium transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 ${getButtonClasses(type === 'danger' ? 'danger' : 'primary')} rounded-lg font-medium transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}