'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import LeadsTable from '@/components/LeadsTable';
import Analytics from '@/components/Analytics';
import Team from '@/components/Team';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';
import LeadModal from '@/components/LeadModal';
import AddLeadModal from '@/components/AddLeadModal';
import { MOCK_LEADS } from '@/lib/data';
import { Lead } from '@/lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [leads] = useState<Lead[]>(MOCK_LEADS);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard leads={leads} />;
      case 'leads':
        return (
          <LeadsTable
            leads={leads}
            onLeadClick={setSelectedLead}
            onAddLead={() => setShowAddModal(true)}
          />
        );
      case 'analytics':
        return <Analytics leads={leads} />;
      case 'team':
        return <Team leads={leads} />;
      case 'reports':
        return <Reports leads={leads} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard leads={leads} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>

      {/* Modals */}
      {selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onAdd={() => alert('Lead added successfully!')}
        />
      )}
    </div>
  );
}
