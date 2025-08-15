import { Package } from '../types/Package';

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Adobe Acrobat Pro DC',
    version: '2024.001.20643',
    platform: ['Windows', 'Mac'],
    status: 'live',
    summary: 'Current version, license expires in 3 months',
    lastUpdated: '2024-01-15',
    lastPackagedBy: 'John Smith',
    packagedByHistory: [
      { packager: 'John Smith', date: '2024-01-15', version: '2024.001.20643' },
      { packager: 'Sarah Johnson', date: '2023-11-20', version: '2023.003.20365' },
      { packager: 'Mike Davis', date: '2023-08-15', version: '2023.002.20320' }
    ],
    sponsor: {
      name: 'Emily Chen',
      department: 'IT Operations'
    },
    deploymentType: 'sccm',
    isPatchMyPC: false,
    isDynamicInstall: true,
    packagingMethodology: 'Silent Install with Configuration',
    fileTypes: {
      primary: 'msi-mst',
      hasScript: false
    },
    toolsUsed: ['Adobe Customization Wizard', 'Master Packager'],
    folderPaths: {
      source: '\\\\server\\packages\\Adobe\\AcrobatPro\\2024.001.20643\\Source',
      deployment: '\\\\server\\sccm\\Applications\\Adobe\\AcrobatPro',
      logs: '\\\\server\\logs\\Adobe\\AcrobatPro\\2024.001.20643'
    },
    licensing: {
      type: 'Volume License',
      expiryDate: '2024-04-15',
      fileLinks: ['\\\\server\\licenses\\Adobe\\AcrobatPro_VL.pdf'],
      notes: 'Volume license for 500 seats, renewal required by April 2024'
    },
    comments: 'Deployed successfully to all departments. Configuration includes disabled updates and custom toolbar layout.',
    createdAt: '2024-01-10',
    auditHistory: [
      { date: '2024-01-15', user: 'John Smith', action: 'Updated', changes: 'Updated to version 2024.001.20643' },
      { date: '2024-01-10', user: 'John Smith', action: 'Created', changes: 'Initial package creation' }
    ]
  },
  {
    id: '2',
    name: 'Microsoft Office 365',
    version: '16.0.17126.20132',
    platform: ['Windows'],
    status: 'live',
    summary: 'Latest monthly channel update',
    lastUpdated: '2024-01-20',
    lastPackagedBy: 'Sarah Johnson',
    packagedByHistory: [
      { packager: 'Sarah Johnson', date: '2024-01-20', version: '16.0.17126.20132' },
      { packager: 'John Smith', date: '2024-01-05', version: '16.0.17025.20104' },
      { packager: 'Mike Davis', date: '2023-12-15', version: '16.0.16924.20150' }
    ],
    sponsor: {
      name: 'Robert Wilson',
      department: 'Business Applications'
    },
    deploymentType: 'sccm',
    isPatchMyPC: true,
    isDynamicInstall: false,
    packagingMethodology: 'Office Deployment Tool',
    fileTypes: {
      primary: 'exe',
      hasScript: true
    },
    toolsUsed: ['Office Deployment Tool', 'PACE Recorded Install'],
    folderPaths: {
      source: '\\\\server\\packages\\Microsoft\\Office365\\16.0.17126.20132\\Source',
      deployment: '\\\\server\\sccm\\Applications\\Microsoft\\Office365',
      logs: '\\\\server\\logs\\Microsoft\\Office365\\16.0.17126.20132'
    },
    licensing: {
      type: 'Enterprise Subscription',
      expiryDate: '2024-12-31',
      fileLinks: ['\\\\server\\licenses\\Microsoft\\O365_Enterprise.pdf'],
      notes: 'Enterprise E3 subscription, auto-renewal enabled'
    },
    comments: 'Monthly channel deployment with Teams, OneDrive, and SharePoint integration.',
    createdAt: '2024-01-18',
    auditHistory: [
      { date: '2024-01-20', user: 'Sarah Johnson', action: 'Updated', changes: 'Updated to latest monthly channel' },
      { date: '2024-01-18', user: 'Sarah Johnson', action: 'Created', changes: 'Initial package creation' }
    ]
  },
  {
    id: '3',
    name: 'Google Chrome Enterprise',
    version: '120.0.6099.217',
    platform: ['Windows', 'Mac'],
    status: 'in-progress',
    summary: 'Security update in testing phase',
    lastUpdated: '2024-01-22',
    lastPackagedBy: 'Mike Davis',
    packagedByHistory: [
      { packager: 'Mike Davis', date: '2024-01-22', version: '120.0.6099.217' },
      { packager: 'Sarah Johnson', date: '2024-01-10', version: '120.0.6099.199' }
    ],
    sponsor: {
      name: 'Lisa Anderson',
      department: 'Security Team'
    },
    deploymentType: 'sccm',
    isPatchMyPC: true,
    isDynamicInstall: false,
    packagingMethodology: 'MSI with Group Policy Templates',
    fileTypes: {
      primary: 'msi',
      hasScript: false
    },
    toolsUsed: ['PatchMyPC', 'Group Policy Management'],
    folderPaths: {
      source: '\\\\server\\packages\\Google\\Chrome\\120.0.6099.217\\Source',
      deployment: '\\\\server\\sccm\\Applications\\Google\\Chrome',
      logs: '\\\\server\\logs\\Google\\Chrome\\120.0.6099.217'
    },
    licensing: {
      type: 'Free',
      fileLinks: [],
      notes: 'Free enterprise version with centralized management'
    },
    comments: 'Testing new security policies before enterprise-wide deployment.',
    createdAt: '2024-01-20',
    auditHistory: [
      { date: '2024-01-22', user: 'Mike Davis', action: 'Updated', changes: 'Updated to security patch version' },
      { date: '2024-01-20', user: 'Mike Davis', action: 'Created', changes: 'Initial package creation' }
    ]
  },
  {
    id: '4',
    name: 'AutoCAD 2024',
    version: '2024.0.1',
    platform: ['Windows'],
    status: 'deprecated',
    summary: 'Replaced by AutoCAD 2025',
    lastUpdated: '2023-11-15',
    lastPackagedBy: 'John Smith',
    packagedByHistory: [
      { packager: 'John Smith', date: '2023-11-15', version: '2024.0.1' },
      { packager: 'Mike Davis', date: '2023-10-15', version: '2024.0.0' }
    ],
    sponsor: {
      name: 'David Brown',
      department: 'Engineering'
    },
    deploymentType: 'sccm',
    isPatchMyPC: false,
    isDynamicInstall: false,
    packagingMethodology: 'Administrative Installation',
    fileTypes: {
      primary: 'exe',
      hasScript: true
    },
    toolsUsed: ['Autodesk Deployment Wizard', 'Master Packager'],
    folderPaths: {
      source: '\\\\server\\packages\\Autodesk\\AutoCAD\\2024.0.1\\Source',
      deployment: '\\\\server\\sccm\\Applications\\Autodesk\\AutoCAD2024',
      logs: '\\\\server\\logs\\Autodesk\\AutoCAD\\2024.0.1'
    },
    licensing: {
      type: 'Network License',
      expiryDate: '2024-03-30',
      fileLinks: ['\\\\server\\licenses\\Autodesk\\AutoCAD2024_Network.lic'],
      notes: 'Network license server: license.company.com:27000'
    },
    comments: 'Deprecated in favor of AutoCAD 2025. Uninstall scheduled for March 2024.',
    createdAt: '2023-10-15',
    auditHistory: [
      { date: '2023-11-15', user: 'John Smith', action: 'Deprecated', changes: 'Marked as deprecated, replaced by AutoCAD 2025' },
      { date: '2023-10-15', user: 'Mike Davis', action: 'Created', changes: 'Initial package creation' }
    ]
  },
  {
    id: '5',
    name: 'Zoom Client',
    version: '5.17.0.1840',
    platform: ['Windows', 'Mac'],
    status: 'live',
    summary: 'Enterprise deployment with SSO',
    lastUpdated: '2024-01-18',
    lastPackagedBy: 'Sarah Johnson',
    packagedByHistory: [
      { packager: 'Sarah Johnson', date: '2024-01-18', version: '5.17.0.1840' },
      { packager: 'John Smith', date: '2024-01-05', version: '5.16.10.24420' }
    ],
    sponsor: {
      name: 'Jennifer Lee',
      department: 'Communications'
    },
    deploymentType: 'sccm',
    isPatchMyPC: false,
    isDynamicInstall: false,
    packagingMethodology: 'MSI with Transform',
    fileTypes: {
      primary: 'msi-mst',
      hasScript: false
    },
    toolsUsed: ['PACE Recorded Install'],
    folderPaths: {
      source: '\\\\server\\packages\\Zoom\\Client\\5.17.0.1840\\Source',
      deployment: '\\\\server\\sccm\\Applications\\Zoom\\Client',
      logs: '\\\\server\\logs\\Zoom\\Client\\5.17.0.1840'
    },
    licensing: {
      type: 'Enterprise License',
      expiryDate: '2024-06-15',
      fileLinks: ['\\\\server\\licenses\\Zoom\\Enterprise.pdf'],
      notes: '1000 user enterprise license with SSO integration'
    },
    comments: 'Configured with company branding and automatic updates disabled.',
    createdAt: '2024-01-15',
    auditHistory: [
      { date: '2024-01-18', user: 'Sarah Johnson', action: 'Updated', changes: 'Updated to latest version with security patches' },
      { date: '2024-01-15', user: 'Sarah Johnson', action: 'Created', changes: 'Initial package creation' }
    ]
  },
  {
    id: '6',
    name: 'Microsoft Teams',
    version: '1.6.00.4472',
    platform: ['Windows'],
    status: 'live',
    summary: 'Intune cloud deployment',
    lastUpdated: '2024-01-25',
    lastPackagedBy: 'Alex Thompson',
    packagedByHistory: [
      { packager: 'Alex Thompson', date: '2024-01-25', version: '1.6.00.4472' }
    ],
    sponsor: {
      name: 'Jennifer Lee',
      department: 'Communications'
    },
    deploymentType: 'intune',
    isPatchMyPC: false,
    isDynamicInstall: false,
    packagingMethodology: 'Win32 App Packaging',
    fileTypes: {
      primary: 'appx',
      hasScript: true
    },
    toolsUsed: ['Microsoft Win32 Content Prep Tool', 'Intune Admin Center'],
    folderPaths: {
      source: '',
      deployment: '',
      logs: ''
    },
    licensing: {
      type: 'Microsoft 365 License',
      expiryDate: '2024-12-31',
      fileLinks: [],
      notes: 'Included with Microsoft 365 E3 subscription'
    },
    comments: 'Cloud-based deployment via Intune with automatic updates enabled.',
    createdAt: '2024-01-25',
    auditHistory: [
      { date: '2024-01-25', user: 'Alex Thompson', action: 'Created', changes: 'Initial Intune package creation' }
    ]
  }
];