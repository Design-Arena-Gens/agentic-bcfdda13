'use client';

import { Building2, Users, TrendingUp, DollarSign, Target, Clock } from 'lucide-react';
import StatCard from './StatCard';
import { Lead } from '@/lib/types';
import { generateDashboardStats } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface DashboardProps {
  leads: Lead[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard({ leads }: DashboardProps) {
  const stats = generateDashboardStats(leads);

  // Lead status distribution
  const statusDistribution = leads.reduce((acc, lead) => {
    acc[lead.leadStatus] = (acc[lead.leadStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Product interest
  const productInterest = leads.reduce((acc, lead) => {
    lead.productOffered.forEach(product => {
      acc[product] = (acc[product] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const productData = Object.entries(productInterest)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Sales by state
  const stateData = leads
    .filter(l => l.leadStatus === 'Closed Won')
    .reduce((acc, lead) => {
      acc[lead.state] = (acc[lead.state] || 0) + (lead.estimatedValue || 0);
      return acc;
    }, {} as Record<string, number>);

  const topStates = Object.entries(stateData)
    .map(([state, value]) => ({ state, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Recent activities
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome back! Here's your sales overview</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Building2}
          trend="+12% from last month"
          trendUp={true}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="New Leads"
          value={stats.newLeads}
          icon={Target}
          trend="+5 this week"
          trendUp={true}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Qualified Leads"
          value={stats.qualifiedLeads}
          icon={TrendingUp}
          bgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Deals Won"
          value={stats.closedWonLeads}
          icon={Users}
          trend="+2 this month"
          trendUp={true}
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate.toFixed(1)}%`}
          icon={TrendingUp}
          trend="+3.2% from last month"
          trendUp={true}
          bgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          trend="+18% from last month"
          trendUp={true}
          bgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Product Interest */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Interest</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing States */}
      {topStates.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing States</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topStates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{lead.schoolName}</p>
                  <p className="text-sm text-gray-500">{lead.city}, {lead.state}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  lead.leadStatus === 'Closed Won' ? 'bg-green-100 text-green-800' :
                  lead.leadStatus === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                  lead.leadStatus === 'New' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.leadStatus}
                </span>
                <p className="text-xs text-gray-500 mt-1">{lead.salesSPOC}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
