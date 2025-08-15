export interface ServerInfo {
  id: string;
  name: string;
  ipAddress: string;
  fqdn: string;
  type: 'sccm' | 'patchmypc' | 'license' | 'development' | 'other';
}

export interface ServerInfoState {
  servers: ServerInfo[];
}