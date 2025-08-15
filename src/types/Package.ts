export interface Package {
  id: string;
  name: string;
  version: string;
  platform: ('Windows' | 'Mac' | 'Linux')[];
  icon?: string;
  status: 'in-progress' | 'live' | 'deprecated';
  summary: string;
  lastUpdated: string;
  lastPackagedBy: string;
  packagedByHistory: {
    packager: string;
    date: string;
    version: string;
  }[];
  sponsor: {
    name: string;
    department: string;
  };
  deploymentType: 'sccm' | 'intune';
  isPatchMyPC: boolean;
  isDynamicInstall: boolean;
  
  // Detailed information
  packagingMethodology: string;
  fileTypes: {
    primary: 'msi' | 'msi-mst' | 'exe' | 'ps1' | 'appx';
    hasScript: boolean;
  };
  toolsUsed: string[];
  sccmDeployment?: {
    installCommand: string;
    uninstallCommand: string;
    repairCommand?: string;
    installStartIn?: string;
    uninstallStartIn?: string;
    repairStartIn?: string;
    productCode?: string;
  };
  folderPaths?: {
    source: string;
    deployment: string;
    logs: string;
  };
  scripts?: {
    name: string;
    content: string;
    type: 'powershell' | 'vbscript' | 'batch' | 'other';
  }[];
  licensing: {
    type: string;
    expiryDate?: string;
    fileLinks: string[];
    notes: string;
  };
  comments: string;
  createdAt: string;
  auditHistory: {
    date: string;
    user: string;
    action: string;
    changes: string;
  }[];
}
