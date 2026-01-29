'use client';

import { Settings as SettingsIcon, User, Bell, Lock, Database, Mail, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your CRM preferences and configurations</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          Profile Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Rahul Kumar"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="rahul.kumar@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                defaultValue="+91-9876543210"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Sales Manager</option>
                <option>Sales Agent</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary-600" />
          Notification Settings
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Email notifications for new leads', defaultChecked: true },
            { label: 'SMS alerts for high-value opportunities', defaultChecked: true },
            { label: 'Daily performance summary', defaultChecked: false },
            { label: 'Weekly team report', defaultChecked: true },
            { label: 'Lead follow-up reminders', defaultChecked: true },
          ].map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary-600" />
          Security Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600" />
          Integrations
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Email Integration', desc: 'Gmail, Outlook', status: 'Connected' },
            { name: 'WhatsApp Business', desc: 'Send messages to leads', status: 'Not Connected' },
            { name: 'Google Sheets', desc: 'Auto-sync lead data', status: 'Connected' },
            { name: 'Zoom', desc: 'Schedule meetings', status: 'Not Connected' },
          ].map((integration, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-500">{integration.desc}</p>
              </div>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  integration.status === 'Connected'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {integration.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary-600" />
          Data Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Export All Data</p>
              <p className="text-sm text-gray-500">Download complete database as CSV</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Import Data</p>
              <p className="text-sm text-gray-500">Upload CSV file to import leads</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Import
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <p className="font-medium text-gray-900">Clear All Data</p>
              <p className="text-sm text-gray-500">Permanently delete all leads and data</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
