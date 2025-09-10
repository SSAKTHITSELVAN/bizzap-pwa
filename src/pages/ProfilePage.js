
// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { companyAPI, followersAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import LeadCard from '../components/LeadCard';
import { Edit, Share2, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Better placeholder image - using a data URL
const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial, sans-serif" font-size="14" fill="%236b7280" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [postedLeads, setPostedLeads] = useState([]);
  const [consumedLeads, setConsumedLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('posted');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    userPhoto: '',
    logo: '',
    coverImage: '',
    address: '',
    description: '',
    about: '',
    category: ''
  });

  const navigate = useNavigate();

  // Image error handler to prevent repeated failed requests
  const handleImageError = (e) => {
    // Prevent infinite loop of error events
    if (e.target.src !== PLACEHOLDER_IMG) {
      e.target.src = PLACEHOLDER_IMG;
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user.companyName || '',
        userName: user.userName || '',
        userPhoto: user.userPhoto || '',
        logo: user.logo || '',
        coverImage: user.coverImage || '',
        address: user.address || '',
        description: user.description || '',
        about: user.about || '',
        category: user.category || ''
      });
      setPostedLeads(user.leads || []);
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profileResponse, consumedLeadsResponse, followersResponse, followingResponse] = await Promise.all([
        companyAPI.getProfile(),
        companyAPI.getConsumedLeads(),
        followersAPI.getFollowers(),
        followersAPI.getFollowing()
      ]);

      updateUser(profileResponse.data);
      setPostedLeads(profileResponse.data.leads || []);
      setFollowers(followersResponse.data || []);
      setFollowing(followingResponse.data || []);
      setConsumedLeads(consumedLeadsResponse.data || []);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await companyAPI.updateProfile(formData);
      await loadProfileData();
      setEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUnfollow = async (companyId) => {
    try {
      await followersAPI.unfollowCompany(companyId);
      loadProfileData(); // Refresh the data
    } catch (err) {
      alert(err.message || 'Failed to unfollow company');
    }
  };

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/companies/${user.id}`;
    const shareText = `Check out ${user.companyName}'s profile on Bizzap!`;
    
    if (navigator.share) {
      navigator.share({
        title: `${user.companyName} Profile`,
        text: shareText,
        url: profileUrl
      }).catch(err => console.error('Share failed:', err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${profileUrl}`).then(() => {
        alert('Profile link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy link. Please copy from the address bar.');
      });
    }
  };

  const handleManageCatalog = () => {
    navigate('/products');
  };

  const ConnectionCard = ({ connection, showUnfollow = false }) => {
    const company = connection.followerCompany || connection.followedCompany || connection;
    if (!company || !company.id) return null;

    return (
      <div className="flex flex-col items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm min-w-[150px] text-center transition-all hover:shadow-md">
        <Link to={`/companies/${company.id}`} className="flex flex-col items-center w-full">
          <img 
            src={company.logo || PLACEHOLDER_IMG} 
            alt={company.companyName || 'Company logo'} 
            className="w-16 h-16 rounded-full object-cover" 
            onError={handleImageError}
            loading="lazy"
          />
          <span className="font-semibold text-sm text-gray-800 truncate w-full">{company.companyName}</span>
          <span className="text-xs text-gray-500 truncate w-full">{company.userName}</span>
        </Link>
        {showUnfollow && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUnfollow(company.id);
            }}
            className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Unfollow
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-4xl py-6 px-4 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
          {/* Cover Image */}
          <div className="relative h-40 md:h-64 bg-gray-300">
            {user.coverImage && (
              <img
                src={user.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={handleImageError}
                loading="lazy"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-24">
              {/* User Photo / Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10">
                <img
                  src={user.userPhoto || PLACEHOLDER_IMG}
                  alt={user.userName || 'User photo'}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.userName}
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  {user.companyName}
                </p>
                <p className="text-sm text-gray-500 mt-1">{user.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-wrap gap-2">
              <button
                onClick={handleManageCatalog}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-white text-green-600 border border-green-600 rounded-full shadow-sm hover:bg-green-50 transition-colors"
              >
                <Package size={16} />
                <span className="font-medium hidden md:inline">Manage Catalog</span>
              </button>
              <button
                onClick={handleShareProfile}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Share2 size={16} />
                <span className="font-medium hidden md:inline">Share</span>
              </button>
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-white text-blue-600 border border-blue-600 rounded-full shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Edit size={16} />
                <span className="font-medium hidden md:inline">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* About and Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">About</h2>
          <p className="text-gray-600 text-sm">{user.about || 'No information provided.'}</p>
          <div className="mt-4 text-gray-500 text-sm space-y-2">
            {user.category && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">Category:</span>
                <span>{user.category}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">Address:</span>
                <span>{user.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Followers Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Followers ({followers.length})</h2>
          {followers.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 py-2 custom-scrollbar">
              {followers.map((connection) => (
                <ConnectionCard key={connection.id} connection={connection} showUnfollow={true} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No followers yet.</p>
          )}
        </div>

        {/* Following Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Following ({following.length})</h2>
          {following.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 py-2 custom-scrollbar">
              {following.map((connection) => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Not following any companies yet.</p>
          )}
        </div>

        {/* Leads Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 -mx-6 px-6 mb-4">
            <button
              onClick={() => setActiveTab('posted')}
              className={`flex-1 text-center py-3 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'posted'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posted Leads ({postedLeads.length})
            </button>
            <button
              onClick={() => setActiveTab('consumed')}
              className={`flex-1 text-center py-3 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'consumed'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Consumed Leads ({consumedLeads.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <div className="flex gap-4 min-w-full">
              {activeTab === 'posted' && (
                <div className="flex gap-4 min-w-full">
                  {postedLeads.length > 0 ? (
                    postedLeads.map((lead) => (
                      <div key={lead.id} className="min-w-[300px] flex-shrink-0">
                        <LeadCard lead={lead} showActions={false} showCompanyInfo={false} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8 w-full">You have not posted any leads yet.</p>
                  )}
                </div>
              )}
              {activeTab === 'consumed' && (
                <div className="flex gap-4 min-w-full">
                  {consumedLeads.length > 0 ? (
                    consumedLeads.map((leadItem) => (
                      <div key={leadItem.lead.id} className="min-w-[300px] flex-shrink-0">
                        <LeadCard lead={leadItem.lead} showActions={false} showCompanyInfo={true} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8 w-full">You have not consumed any leads yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Photo URL</label>
            <input
              type="url"
              name="userPhoto"
              value={formData.userPhoto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage