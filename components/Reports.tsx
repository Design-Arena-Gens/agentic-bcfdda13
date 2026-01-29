'use client';

import { Lead } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

interface ReportsProps {
  leads: Lead[];
}

export default function Reports({ leads }: ReportsProps) {
  // Lead source analysis
  const sourceBreakdown = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Status summary
  const statusSummary = leads.reduce((acc, lead) => {
    if (!acc[lead.leadStatus]) {
      acc[lead.leadStatus] = { count: 0, value: 0 };
    }
    acc[lead.leadStatus].count++;
    acc[lead.leadStatus].value += lead.estimatedValue || 0;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  // Product summary
  const productSummary = leads.reduce((acc, lead) => {
    lead.productOffered.forEach(product => {
      if (!acc[product]) {
        acc[product] = { count: 0, won: 0, value: 0 };
      }
      acc[product].count++;
      if (lead.leadStatus === 'Closed Won') {
        acc[product].won++;
        acc[product].value += (lead.estimatedValue || 0) / lead.productOffered.length;
      }
    });
    return acc;
  }, {} as Record<string, { count: number; won: number; value: number }>);

  const downloadReport = (reportType: string) => {
    alert(`Downloading ${reportType} report...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
          <p className="text-gray-500 mt-1">Comprehensive sales reports and analytics</p>
        </div>
        <button
          onClick={() => downloadReport('All Reports')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download All
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Daily Report', 'Weekly Report', 'Monthly Report', 'Custom Report'].map((report) => (
          <button
            key={report}
            onClick={() => downloadReport(report)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
          >
            <FileText className="w-8 h-8 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">{report}</p>
          </button>
        ))}
      </div>

      {/* Lead Source Report */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lead Source Analysis</h3>
          <button
            onClick={() => downloadReport('Lead Source')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(sourceBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([source, count]) => (
                  <tr key={source}>
                    <td className="px-4 py-3 text-sm text-gray-900">{source}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{count}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {((count / leads.length) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Report */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lead Status Report</h3>
          <button
            onClick={() => downloadReport('Status')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(statusSummary)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([status, data]) => (
                  <tr key={status}>
                    <td className="px-4 py-3 text-sm text-gray-900">{status}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{data.count}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(data.value)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {data.count > 0 ? formatCurrency(data.value / data.count) : '-'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Performance Report */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Product Performance Report</h3>
          <button
            onClick={() => downloadReport('Product')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Leads</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deals Won</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(productSummary)
                .sort((a, b) => b[1].value - a[1].value)
                .map(([product, data]) => (
                  <tr key={product}>
                    <td className="px-4 py-3 text-sm text-gray-900">{product}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{data.count}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{data.won}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {data.count > 0 ? ((data.won / data.count) * 100).toFixed(1) : '0.0'}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(data.value)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Lead Report */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Lead Report</h3>
          <button
            onClick={() => downloadReport('Detailed')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales SPOC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.slice(0, 10).map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{lead.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{lead.schoolName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{lead.city}, {lead.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{lead.salesSPOC}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {lead.leadStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {lead.estimatedValue ? formatCurrency(lead.estimatedValue) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {leads.length > 10 && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Showing 10 of {leads.length} leads. Download report for complete data.
          </p>
        )}
      </div>

      {/* Report Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Active Leads</p>
            <p className="text-2xl font-bold text-orange-600">
              {leads.filter(l => !['Closed Won', 'Closed Lost'].includes(l.leadStatus)).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Closed Won</p>
            <p className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.leadStatus === 'Closed Won').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(leads.filter(l => l.leadStatus === 'Closed Won').reduce((sum, l) => sum + (l.estimatedValue || 0), 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
