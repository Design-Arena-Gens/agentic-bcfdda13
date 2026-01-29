'use client';

import { Lead } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface AnalyticsProps {
  leads: Lead[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function Analytics({ leads }: AnalyticsProps) {
  // Sales by Sales SPOC
  const salesBySPOC = leads.reduce((acc, lead) => {
    if (lead.leadStatus === 'Closed Won') {
      acc[lead.salesSPOC] = (acc[lead.salesSPOC] || 0) + (lead.estimatedValue || 0);
    }
    return acc;
  }, {} as Record<string, number>);

  const spocData = Object.entries(salesBySPOC)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Lead conversion funnel
  const funnelStages = [
    { stage: 'New', count: leads.filter(l => l.leadStatus === 'New').length },
    { stage: 'Contacted', count: leads.filter(l => l.leadStatus === 'Contacted').length },
    { stage: 'Qualified', count: leads.filter(l => l.leadStatus === 'Qualified').length },
    { stage: 'Proposal Sent', count: leads.filter(l => l.leadStatus === 'Proposal Sent').length },
    { stage: 'Negotiation', count: leads.filter(l => l.leadStatus === 'Negotiation').length },
    { stage: 'Closed Won', count: leads.filter(l => l.leadStatus === 'Closed Won').length }
  ];

  // State-wise performance
  const stateStats = leads.reduce((acc, lead) => {
    if (!acc[lead.state]) {
      acc[lead.state] = { state: lead.state, leads: 0, won: 0, value: 0 };
    }
    acc[lead.state].leads++;
    if (lead.leadStatus === 'Closed Won') {
      acc[lead.state].won++;
      acc[lead.state].value += lead.estimatedValue || 0;
    }
    return acc;
  }, {} as Record<string, { state: string; leads: number; won: number; value: number }>);

  const topStates = Object.values(stateStats)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Product performance
  const productStats = leads.reduce((acc, lead) => {
    lead.productOffered.forEach(product => {
      if (!acc[product]) {
        acc[product] = { product, leads: 0, won: 0, value: 0 };
      }
      acc[product].leads++;
      if (lead.leadStatus === 'Closed Won') {
        acc[product].won++;
        acc[product].value += (lead.estimatedValue || 0) / lead.productOffered.length;
      }
    });
    return acc;
  }, {} as Record<string, { product: string; leads: number; won: number; value: number }>);

  const productPerformance = Object.values(productStats).map(p => ({
    product: p.product,
    conversionRate: p.leads > 0 ? (p.won / p.leads) * 100 : 0,
    totalValue: p.value,
    leads: p.leads
  }));

  // Monthly trend (simulated - in real app would use actual date ranges)
  const monthlyTrend = [
    { month: 'Sep', leads: 12, won: 2, value: 2400000 },
    { month: 'Oct', leads: 15, won: 3, value: 3600000 },
    { month: 'Nov', leads: 18, won: 4, value: 4800000 },
    { month: 'Dec', leads: 22, won: 5, value: 6000000 },
    { month: 'Jan', leads: leads.length, won: leads.filter(l => l.leadStatus === 'Closed Won').length, value: leads.filter(l => l.leadStatus === 'Closed Won').reduce((sum, l) => sum + (l.estimatedValue || 0), 0) }
  ];

  // Sales performance radar
  const radarData = topStates.slice(0, 6).map(state => ({
    state: state.state,
    leads: state.leads,
    conversion: state.leads > 0 ? (state.won / state.leads) * 100 : 0,
    value: state.value / 100000 // Normalize to lakhs
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-500 mt-1">Comprehensive insights into your sales performance</p>
      </div>

      {/* Sales Team Performance */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Team Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={spocData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" name="Revenue Generated" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Conversion Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelStages} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-6 gap-2">
          {funnelStages.map((stage, idx) => (
            <div key={idx} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-500">{stage.stage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* State-wise Performance */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States by Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topStates}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip formatter={(value, name) => {
              if (name === 'value') return formatCurrency(Number(value));
              return value;
            }} />
            <Legend />
            <Bar dataKey="leads" fill="#3b82f6" name="Total Leads" />
            <Bar dataKey="won" fill="#10b981" name="Deals Won" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Conversion Rates</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-45} textAnchor="end" height={120} />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
              <Bar dataKey="conversionRate" fill="#8b5cf6" name="Conversion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productPerformance.filter(p => p.totalValue > 0)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ product, percent }) => `${product} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalValue"
              >
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="Total Leads" />
            <Line yAxisId="left" type="monotone" dataKey="won" stroke="#10b981" strokeWidth={2} name="Deals Won" />
            <Line yAxisId="right" type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Performance Radar */}
      {radarData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="state" />
              <PolarRadiusAxis />
              <Radar name="Lead Count" dataKey="leads" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Conversion %" dataKey="conversion" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Performer</h4>
          {spocData.length > 0 && (
            <>
              <p className="text-2xl font-bold text-gray-900">{spocData[0].name}</p>
              <p className="text-sm text-gray-600 mt-1">{formatCurrency(spocData[0].value)} in sales</p>
            </>
          )}
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Best State</h4>
          {topStates.length > 0 && (
            <>
              <p className="text-2xl font-bold text-gray-900">{topStates[0].state}</p>
              <p className="text-sm text-gray-600 mt-1">{topStates[0].won} deals won</p>
            </>
          )}
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Product</h4>
          {productPerformance.length > 0 && (
            <>
              <p className="text-2xl font-bold text-gray-900">{productPerformance.sort((a, b) => b.totalValue - a.totalValue)[0].product}</p>
              <p className="text-sm text-gray-600 mt-1">{formatCurrency(productPerformance.sort((a, b) => b.totalValue - a.totalValue)[0].totalValue)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
