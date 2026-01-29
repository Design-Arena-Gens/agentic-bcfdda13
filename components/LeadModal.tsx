'use client';

import { Lead } from '@/lib/types';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { X, Building2, MapPin, User, Phone, Mail, Calendar, DollarSign, Package } from 'lucide-react';

interface LeadModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadModal({ lead, onClose }: LeadModalProps) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{lead.schoolName}</h2>
            <p className="text-sm text-gray-500 mt-1">Lead ID: {lead.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(lead.leadStatus)}`}>
              {lead.leadStatus}
            </span>
            {lead.estimatedValue && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(lead.estimatedValue)}</p>
              </div>
            )}
          </div>

          {/* Location Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              Location Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-gray-900 font-medium">{lead.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="text-gray-900 font-medium">{lead.state}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="text-gray-900 font-medium">{lead.contactPerson}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Phone
                  </p>
                  <p className="text-gray-900 font-medium">{lead.phone}</p>
                </div>
                {lead.alternatePhone && (
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-4 h-4" /> Alternate Phone
                    </p>
                    <p className="text-gray-900 font-medium">{lead.alternatePhone}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="w-4 h-4" /> Email
                </p>
                <p className="text-gray-900 font-medium">{lead.email}</p>
              </div>
            </div>
          </div>

          {/* SPOC Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Sales SPOC</h3>
              <p className="text-gray-900 font-medium">{lead.salesSPOC}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">School SPOC</h3>
              <p className="text-gray-900 font-medium">{lead.schoolSPOC}</p>
            </div>
          </div>

          {/* Products */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-600" />
              Products Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {lead.productOffered.map((product, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                  {product}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Timeline
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-gray-900 font-medium">{formatDate(lead.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-gray-900 font-medium">{formatDate(lead.updatedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Contact</p>
                <p className="text-gray-900 font-medium">{formatDate(lead.lastContactDate)}</p>
              </div>
              {lead.nextFollowUpDate && (
                <div>
                  <p className="text-sm text-gray-500">Next Follow-up</p>
                  <p className="text-gray-900 font-medium">{formatDate(lead.nextFollowUpDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Lead Source */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Lead Source</h3>
            <p className="text-gray-900 font-medium">{lead.source}</p>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700">{lead.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Edit Lead
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Add Activity
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
