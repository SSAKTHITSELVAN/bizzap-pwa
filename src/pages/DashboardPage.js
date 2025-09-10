
//src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { leadsAPI } from '../services/api';
import LeadCard from '../components/LeadCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';

const DashboardPage = () => {
  const { user, updateUser } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [contactModal, setContactModal] = useState({ isOpen: false, contact: null });

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsAPI.getAllLeads();
      setLeads(response.data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleConsumeLead = async (leadId) => {
    if (!user) return;

    const remaining = user.leadQuota - user.consumedLeads;
    if (remaining <= 0) {
      alert('No lead quota remaining! Please purchase more leads.');
      return;
    }

    if (!window.confirm(`This will consume 1 lead from your quota (${remaining} remaining). Continue?`)) {
      return;
    }

    try {
      const response = await leadsAPI.consumeLead(leadId);
      
      if (response.data.success) {
        setContactModal({
          isOpen: true,
          contact: response.data.contact
        });
        
        // Update user's consumed leads count
        updateUser({
          consumedLeads: user.consumedLeads + 1
        });
        
        // Show success message
        alert('Contact information revealed!');
      }
    } catch (err) {
      alert(err.message || 'Failed to consume lead');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Leads Feed */}
      <div className="space-y-6">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No leads available
            </h3>
            <p className="text-gray-500">
              Be the first to post a lead!
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onConsumeLead={handleConsumeLead}
              showCompanyInfo={true}
              showActions={true}
            />
          ))
        )}
      </div>

      {/* Contact Information Modal */}
      <Modal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, contact: null })}
        title="Contact Information"
      >
        {contactModal.contact && (
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Revealed!
              </h3>
              <p className="text-gray-600">You can now contact this company directly</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-gray-900">
                <a href={`tel:${contactModal.contact}`} className="text-blue-600 hover:text-blue-800">
                  {contactModal.contact}
                </a>
              </p>
            </div>
            
            <div className="flex space-x-3 justify-center">
              <a
                href={`tel:${contactModal.contact}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Call Now
              </a>
              <a
                href={`https://wa.me/${contactModal.contact.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
              >
                WhatsApp
              </a>
              <button
                onClick={() => setContactModal({ isOpen: false, contact: null })}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Floating Action Button - Adjusted position for mobile bottom nav */}
      {/* <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6">
        <button
          onClick={() => window.location.href = '/my-leads'}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          title="Post New Lead"
        >
          <Plus size={24} />
        </button>
      </div> */}
    </div>
  );
};

export default DashboardPage;