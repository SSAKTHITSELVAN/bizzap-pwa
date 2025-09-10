//src/components/ConsumedLeadCard.js
import React from 'react';
import { Phone, MessageCircle, Share2, MapPin, DollarSign, Package } from 'lucide-react';

const ConsumedLeadCard = ({ consumedLead }) => {
  const { lead, consumedAt } = consumedLead;
  const company = lead.company;

  const handleCall = () => {
    if (company?.phoneNumber) {
      window.location.href = `tel:${company.phoneNumber}`;
    }
  };

  const handleWhatsApp = () => {
    if (company?.phoneNumber) {
      const phoneNumber = company.phoneNumber.replace(/[^\d]/g, ''); // Remove non-digits
      const message = encodeURIComponent(`Hi ${company.companyName || 'there'}, I'm interested in your lead: "${lead.title}". Can we discuss this further?`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  const handleShare = () => {
    const leadUrl = `${window.location.origin}/companies/${company.id}`;
    const shareText = `Check out this lead: "${lead.title}" by ${company.companyName || 'Company'} on Bizzap`;

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
        alert('Unable to copy link');
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Consumed Badge */}
      <div className="flex justify-between items-start mb-3">
        <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          ✓ Consumed on {new Date(consumedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
        <button
          onClick={handleShare}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Share Lead"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Company Header */}
      <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
        <img
          src={company?.logo || 'https://via.placeholder.com/50'}
          alt="Company Logo"
          className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900">
            {company?.companyName || 'Unknown Company'}
          </h3>
          <p className="text-sm text-gray-600">
            Posted on {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Lead Image */}
      {lead.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={lead.image}
            alt="Lead"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Lead Content */}
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{lead.title}</h4>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{lead.description}</p>

        {/* Lead Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {lead.budget && (
            <div className="flex items-center bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
              <DollarSign size={16} className="mr-2" />
              <span className="text-sm font-medium">{lead.budget}</span>
            </div>
          )}
          {lead.quantity && (
            <div className="flex items-center bg-purple-50 text-purple-800 px-3 py-2 rounded-lg">
              <Package size={16} className="mr-2" />
              <span className="text-sm font-medium">{lead.quantity}</span>
            </div>
          )}
          {lead.location && (
            <div className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-lg">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm font-medium">{lead.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-200 pt-4">
        <div className="mb-3">
          <h5 className="font-semibold text-gray-900 mb-2">Contact Information</h5>
          <div className="flex items-center text-gray-700 mb-2">
            <Phone size={16} className="mr-2 text-gray-500" />
            <span className="font-medium">{company?.phoneNumber || 'Not available'}</span>
          </div>
          {company?.address && (
            <div className="flex items-start text-gray-700 mb-2">
              <MapPin size={16} className="mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{company.address}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleCall}
            disabled={!company?.phoneNumber}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-all ${
              company?.phoneNumber
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Phone size={18} className="mr-2" />
            Call Now
          </button>
          
          <button
            onClick={handleWhatsApp}
            disabled={!company?.phoneNumber}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-all ${
              company?.phoneNumber
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle size={18} className="mr-2" />
            WhatsApp
          </button>
        </div>

        {/* Company Description */}
        {company?.description && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h6 className="font-medium text-gray-900 mb-1">About {company.companyName}</h6>
            <p className="text-sm text-gray-600">{company.description}</p>
          </div>
        )}

        {/* Lead Stats */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>Views: {lead.viewCount || 0}</span>
          <span>Total Consumed: {lead.consumedCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ConsumedLeadCard;