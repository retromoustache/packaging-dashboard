import React, { useState } from 'react';
import { X, User, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  theme: string;
}

export default function AuthModal({ isOpen, onClose, onLogin, theme }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const getBgClasses = (type: 'input' | 'error') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'input': return 'bg-gray-100';
          case 'error': return 'bg-red-100/50';
        }
      case 'amoled':
        switch (type) {
          case 'input': return 'bg-gray-950';
          case 'error': return 'bg-red-900/50';
        }
      default:
        switch (type) {
          case 'input': return 'bg-slate-700/50';
          case 'error': return 'bg-red-500/20';
        }
    }
  };

  const getButtonClasses = (type: 'primary' | 'ghost') => {
    switch (theme) {
      case 'light':
        switch (type) {
          case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'ghost': return 'text-gray-500 hover:text-gray-700';
        }
      case 'amoled':
        switch (type) {
          case 'primary': return 'bg-blue-700 hover:bg-blue-800 text-white';
          case 'ghost': return 'text-gray-400 hover:text-gray-200';
        }
      default:
        switch (type) {
          case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white';
          case 'ghost': return 'text-slate-400 hover:text-slate-300';
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

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (username === 'admin' && password === 'admin') {
        onLogin(username, password);
        onClose();
      } else if (username === 'user' && password === 'user') {
        onLogin(username, password);
        onClose();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className={`text-xl font-bold ${getTextClasses('primary')}`}>Sign In</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 ${getButtonClasses('ghost')} transition-colors`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className={`${getBgClasses('error')} border border-red-500/30 text-red-300 p-3 rounded-lg text-sm`}>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${getTextClasses('primary')}`}>
              Username
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${getTextClasses('secondary')}`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 ${getInputClasses()} rounded-lg ${getTextClasses('input')} focus:outline-none`}
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${getTextClasses('primary')}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${getTextClasses('secondary')}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-2.5 ${getInputClasses()} rounded-lg ${getTextClasses('input')} focus:outline-none`}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getTextClasses('secondary')} hover:${getTextClasses('primary')} transition-colors`}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className={`pt-4 border-t ${getBorderClasses()}`}>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2.5 ${getButtonClasses('primary')} rounded-lg font-medium transition-colors disabled:opacity-50`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className={`text-xs ${getTextClasses('secondary')} text-center pt-2`}>
            Demo credentials: admin/admin (Admin) or user/user (User)
          </div>
        </form>
      </div>
    </div>
  );
}