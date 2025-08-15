import React, { useState } from 'react';
import { X, Plus, Trash2, Server, Info } from 'lucide-react';
import { ServerInfo } from '../types/ServerInfo';

interface ServerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultServers: ServerInfo[] = [
  {
    id: '1',
    name: 'Primary SCCM Server',
    ipAddress: '192.168.1.100',
    fqdn: 'sccm01.company.local',
    type: 'sccm'
  },
  {
    id: '2',
    name: 'Patch My PC Server',
    ipAddress: '192.168.1.101',
    fqdn: 'pmpc01.company.local',
    type: 'patchmypc'
  },
  {
    id: '3',
    name: 'License Server',
    ipAddress: '192.168.1.102',
    fqdn: 'license01.company.local',
    type: 'license'
  },
  {
    id: '4',
    name: 'Development SCCM',
    ipAddress: '192.168.1.103',
    fqdn: 'sccm-dev01.company.local',
    type: 'development'
  }
];

export default function ServerInfoModal({ isOpen, onClose }: ServerInfoModalProps) {
  const [servers, setServers] = useState<ServerInfo[]>(defaultServers);
  const [editingServer, setEditingServer] = useState<ServerInfo | null>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const addNewServer = () => {
    const newServer: ServerInfo = {
      id: Date.now().toString(),
      name: 'New Server',
      ipAddress: '',
      fqdn: '',
      type: 'other'
    };
    setServers([...servers, newServer]);
    setEditingServer(newServer);
  };

  const deleteServer = (id: string) => {
    setServers(servers.filter(server => server.id !== id));
    if (editingServer?.id === id) {
      setEditingServer(null);
    }
  };

  const updateServer = (updatedServer: ServerInfo) => {
    setServers(servers.map(server => 
      server.id === updatedServer.id ? updatedServer : server
    ));
    setEditingServer(null);
  };

  const getServerTypeColor = (type: string) => {
    switch (type) {
      case 'sccm':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'patchmypc':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'license':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'development':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getServerTypeLabel = (type: string) => {
    switch (type) {
      case 'sccm':
        return 'SCCM';
      case 'patchmypc':
        return 'Patch My PC';
      case 'license':
        return 'License Server';
      case 'development':
        return 'Development';
      default:
        return 'Other';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Server Information</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={addNewServer}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Server
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
          <div className="grid gap-4">
            {servers.map((server) => (
              <div
                key={server.id}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
              >
                {editingServer?.id === server.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Server Name
                        </label>
                        <input
                          type="text"
                          value={editingServer.name}
                          onChange={(e) => setEditingServer({ ...editingServer, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Server Type
                        </label>
                        <select
                          value={editingServer.type}
                          onChange={(e) => setEditingServer({ ...editingServer, type: e.target.value as ServerInfo['type'] })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                        >
                          <option value="sccm">SCCM Server</option>
                          <option value="patchmypc">Patch My PC</option>
                          <option value="license">License Server</option>
                          <option value="development">Development</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          IP Address
                        </label>
                        <input
                          type="text"
                          value={editingServer.ipAddress}
                          onChange={(e) => setEditingServer({ ...editingServer, ipAddress: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="192.168.1.100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          FQDN
                        </label>
                        <input
                          type="text"
                          value={editingServer.fqdn}
                          onChange={(e) => setEditingServer({ ...editingServer, fqdn: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                          placeholder="server.company.local"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditingServer(null)}
                        className="px-4 py-2 text-slate-300 hover:text-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateServer(editingServer)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center border border-slate-600/50">
                        <Server className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-100">{server.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded border ${getServerTypeColor(server.type)}`}>
                            {getServerTypeLabel(server.type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>IP: {server.ipAddress}</span>
                          <span>FQDN: {server.fqdn}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingServer(server)}
                        className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteServer(server.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}