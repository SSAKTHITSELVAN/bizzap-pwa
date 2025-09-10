
//src/components/LeadCard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Share2, Edit, Trash2 } from 'lucide-react';

const LeadCard = ({
  lead,
  onConsumeLead,
  onShareLead,
  onEditLead,
  onDeleteLead,
  onToggleStatus,
  showCompanyInfo = true,
  showActions = true
}) => {
  const { user } = useAuth();
  const isMyLead = lead.companyId === user?.id;

  const handleShare = () => {
    const leadUrl = `${window.location.origin}?lead=${lead.id}`;
    const shareText = `Check out this lead: "${lead.title}" on Bizzap`;

    if (navigator.share) {
      navigator.share({
        title: `${lead.title} - Bizzap`,
        text: shareText,
        url: leadUrl
      }).catch(err => console.error('Share failed:', err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${leadUrl}`).then(() => {
        alert('Lead link copied to clipboard!');
      }).catch(() => {
        onShareLead && onShareLead(lead.id, lead.title);
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3 relative hover:shadow-lg transition-shadow duration-200">

      {/* Share Button at top-right */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleShare}
          className="p-1 bg-white bg-opacity-70 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          title="Share Lead"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Company Header */}
      {showCompanyInfo && lead.company && (
        <div className="flex items-center mb-2">
          <img
            src={lead.company.logo || 'https://via.placeholder.com/40'}
            alt="Company Logo"
            className="w-9 h-9 rounded-full mr-2 object-cover border border-gray-100"
          />
          <div>
            <h3 className="font-bold text-base text-gray-900 leading-tight">
              {lead.company.companyName || 'Unknown Company'}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Lead Image */}
      {lead.image && (
        <div className="mb-2 rounded-md overflow-hidden">
          <img
            src={lead.image}
            alt="Lead"
            className="w-full h-48 object-cover" // Increased image height
          />
        </div>
      )}

      {/* Lead Content */}
      <div className="mb-2">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{lead.title}</h4>
        <p className="text-gray-700 text-sm mb-2 line-clamp-3">{lead.description}</p>

        <div className="flex flex-wrap gap-1 text-xs font-semibold">
          {lead.budget && (
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-center">
              Budget: {lead.budget}
            </div>
          )}
          {lead.quantity && (
            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-center">
              Quantity: {lead.quantity}
            </div>
          )}
          {lead.location && (
            <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-center">
              Location: {lead.location}
            </div>
          )}
        </div>
      </div>

      {/* Lead Status (for my leads) */}
      {isMyLead && (
        <div className="mb-2">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            lead.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {lead.isActive ? 'Active' : 'Inactive'}
          </div>
          {!lead.isActive && lead.reasonForDeactivation && (
            <p className="text-xs text-gray-600 mt-1">
              <strong>Reason:</strong> {lead.reasonForDeactivation}
            </p>
          )}
        </div>
      )}

      {/* Stats and Actions */}
      {showActions && (
        <div className="flex flex-col items-center pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2 text-center">
            Views: {lead.viewCount || 0} | Consumed: {lead.consumedCount || 0}
          </div>

          <div className="flex w-full space-x-2">
            {isMyLead ? (
              <>
                <button
                  onClick={() => onEditLead && onEditLead(lead.id)}
                  className="p-2 flex-grow text-gray-500 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  title="Edit Lead"
                >
                  <Edit size={16} className="mx-auto" />
                </button>

                <button
                  onClick={() => onToggleStatus && onToggleStatus(lead.id, !lead.isActive)}
                  className={`p-2 flex-grow rounded-lg transition-colors border border-gray-300 ${
                    lead.isActive
                      ? 'text-red-600 hover:bg-red-100'
                      : 'text-green-600 hover:bg-green-100'
                  }`}
                  title={lead.isActive ? 'Deactivate' : 'Activate'}
                >
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-2 0v6a1 1 0 102 0V7zm4 0a1 1 0 00-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </button>

                <button
                  onClick={() => onDeleteLead && onDeleteLead(lead.id)}
                  className="p-2 flex-grow text-red-600 rounded-lg border border-gray-300 hover:bg-red-100 transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 size={16} className="mx-auto" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onConsumeLead && onConsumeLead(lead.id)}
                className="w-full py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold"
              >
                Talk to Seller
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadCard;