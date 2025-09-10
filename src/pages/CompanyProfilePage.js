
// src/pages/CompanyProfilePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { companyAPI, followersAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import LeadCard from '../components/LeadCard';
import { User, MapPin, Briefcase, Package, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Better placeholder image - using a data URL
const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial, sans-serif" font-size="14" fill="%236b7280" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

const CompanyProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('leads');
  const [error, setError] = useState(null);

  // Image error handler
  const handleImageError = (e) => {
    if (e.target.src !== PLACEHOLDER_IMG) {
      e.target.src = PLACEHOLDER_IMG;
    }
  };

  useEffect(() => {
    if (id) {
      loadCompanyData();
      loadCompanyProducts();
    }
  }, [id]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const companyResponse = await companyAPI.getCompanyById(id);
      
      setCompany(companyResponse.data);
      setLeads(companyResponse.data.leads || []);
      
      // Only check follow status if user is logged in and it's not their own profile
      if (user && user.id !== id) {
        checkFollowStatus(id);
      }
    } catch (err) {
      console.error('Failed to load company data:', err);
      setError('Failed to load company profile. It might not exist.');
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyProducts = async () => {
    try {
      // Use the correct public products endpoint with company prefix
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/products/public/company/${id}`);
      if (response.ok) {
        const data = await response.json();
        // The API returns an array of products in data field
        if (data.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else if (data.data) {
          setProducts([data.data]);
        }
      } else {
        console.log('No products found for this company');
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load company products:', err);
      setProducts([]);
    }
  };

  const checkFollowStatus = async (companyId) => {
    try {
      const response = await followersAPI.checkFollowStatus(companyId);
      setIsFollowing(response.data.isFollowing);
    } catch (err) {
      console.error('Failed to check follow status:', err);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await followersAPI.unfollowCompany(id);
      } else {
        await followersAPI.followCompany(id);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Failed to toggle follow status:', err);
    }
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0">
      <div className="relative h-48">
        <img
          src={product.images?.[0] || PLACEHOLDER_IMG}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
          ₹{product.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Package size={14} className="mr-1" />
            Min: {product.minimumQuantity}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            Product
          </span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !company) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Company Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            {error || 'The company profile you are looking for does not exist.'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isMyProfile = user?.id === company.id;

  return (
    <div className="bg-gray-100 min-h-screen pb-20 md:pb-6">
      <div className="container mx-auto max-w-6xl py-6 px-4 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
          {/* Cover Image */}
          <div className="relative h-40 md:h-64 bg-gray-300">
            <img
              src={company.coverImage || PLACEHOLDER_IMG}
              alt="Cover"
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          </div>

          {/* Profile Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-24">
              {/* User Photo / Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10">
                <img
                  src={company.userPhoto || company.logo || PLACEHOLDER_IMG}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {company.userName || company.companyName}
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  {company.companyName}
                </p>
                <p className="text-sm text-gray-500 mt-1">{company.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex space-x-2">
              {user && !isMyProfile && (
                <button
                  onClick={handleFollowToggle}
                  className={`px-4 py-2 text-sm rounded-full transition-colors font-semibold ${
                    isFollowing
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">About</h2>
          <p className="text-gray-600 text-sm mb-4">{company.about || 'No information provided.'}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Briefcase size={16} />
              <span>{company.category || 'N/A'}</span>
            </div>
            {company.address && (
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{company.address}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{company.followersCount || 0} Followers</span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 -mx-6 px-6 mb-6">
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex-1 text-center py-3 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'leads'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 text-center py-3 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products ({products.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="overflow-x-auto custom-scrollbar">
            {activeTab === 'leads' && (
              <div className="flex gap-4 min-w-full">
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <div key={lead.id} className="min-w-[300px] flex-shrink-0">
                      <LeadCard lead={lead} showActions={!isMyProfile} showCompanyInfo={false} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8 w-full">No leads posted yet.</p>
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="flex gap-4 min-w-full">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8 w-full">No products available yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;