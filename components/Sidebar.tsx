'use client';

import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
  FileText,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Building2 },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="w-8 h-8 text-primary-400" />
          School CRM
        </h1>
        <p className="text-gray-400 text-sm mt-1">Lead Management</p>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-semibold">
            RK
          </div>
          <div>
            <p className="font-medium text-sm">Rahul Kumar</p>
            <p className="text-xs text-gray-400">Sales Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
