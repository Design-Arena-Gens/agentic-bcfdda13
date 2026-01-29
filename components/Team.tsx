'use client';

import { User, Lead } from '@/lib/types';
import { MOCK_USERS } from '@/lib/data';
import { formatCurrency, getInitials } from '@/lib/utils';
import { Users, Award, TrendingUp, Target, Mail, MapPin } from 'lucide-react';

interface TeamProps {
  leads: Lead[];
}

export default function Team({ leads }: TeamProps) {
  // Calculate performance metrics for each user
  const userMetrics = MOCK_USERS.map(user => {
    const userLeads = leads.filter(l => l.salesSPOC === user.name);
    const wonLeads = userLeads.filter(l => l.leadStatus === 'Closed Won');
    const revenue = wonLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
    const conversionRate = userLeads.length > 0 ? (wonLeads.length / userLeads.length) * 100 : 0;
    const activeLeads = userLeads.filter(l => !['Closed Won', 'Closed Lost'].includes(l.leadStatus));

    return {
      ...user,
      totalLeads: userLeads.length,
      wonLeads: wonLeads.length,
      revenue,
      conversionRate,
      activeLeads: activeLeads.length
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const topPerformer = userMetrics[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Sales Team</h2>
        <p className="text-gray-500 mt-1">Team performance and metrics</p>
      </div>

      {/* Top Performer Highlight */}
      {topPerformer && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white text-primary-600 flex items-center justify-center text-2xl font-bold">
              {getInitials(topPerformer.name)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-6 h-6" />
                <span className="text-sm font-medium">Top Performer</span>
              </div>
              <h3 className="text-2xl font-bold">{topPerformer.name}</h3>
              <p className="text-primary-100">{topPerformer.role.replace('_', ' ').toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{formatCurrency(topPerformer.revenue)}</p>
              <p className="text-primary-100">Total Revenue</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary-500">
            <div>
              <p className="text-primary-100 text-sm">Total Leads</p>
              <p className="text-2xl font-bold">{topPerformer.totalLeads}</p>
            </div>
            <div>
              <p className="text-primary-100 text-sm">Deals Won</p>
              <p className="text-2xl font-bold">{topPerformer.wonLeads}</p>
            </div>
            <div>
              <p className="text-primary-100 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold">{topPerformer.conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userMetrics.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Contact */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>

              {/* Territory */}
              {user.territory && user.territory.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Territory</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.territory.map((state, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Leads</span>
                  <span className="text-lg font-bold text-gray-900">{user.totalLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Leads</span>
                  <span className="text-lg font-bold text-orange-600">{user.activeLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Deals Won</span>
                  <span className="text-lg font-bold text-green-600">{user.wonLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(user.revenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion</span>
                  <span className="text-lg font-bold text-purple-600">{user.conversionRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Team Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userMetrics.length}</p>
            <p className="text-sm text-gray-500">Team Members</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userMetrics.reduce((sum, u) => sum + u.totalLeads, 0)}</p>
            <p className="text-sm text-gray-500">Total Leads</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userMetrics.reduce((sum, u) => sum + u.wonLeads, 0)}</p>
            <p className="text-sm text-gray-500">Deals Won</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(userMetrics.reduce((sum, u) => sum + u.revenue, 0))}
            </p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(userMetrics.reduce((sum, u) => sum + u.conversionRate, 0) / userMetrics.length).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">Avg Conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
