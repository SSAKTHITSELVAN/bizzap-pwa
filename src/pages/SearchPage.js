//src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { searchAPI, followersAPI } from '../services/api';
import LeadCard from '../components/LeadCard';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const CompanyCard = ({ company, onFollow, onUnfollow, isFollowing }) => {
  const { user } = useAuth();
  const isOwnCompany = company.id === user?.id;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <img
          src={company.logo || 'https://via.placeholder.com/64'}
          alt="Company Logo"
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{company.companyName}</h3>
          <p className="text-sm text-gray-600">{company.description || 'No description available'}</p>
          <p className="text-xs text-gray-500 mt-1">GST: {company.gstNumber}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Followers: {company.followersCount || 0}</span>
        <span>Leads: {company.leadsCount || 0}</span>
        <span>Products: {company.productsCount || 0}</span>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          View Profile
        </button>
        
        {!isOwnCompany && (
          <button
            onClick={() => isFollowing ? onUnfollow(company.id) : onFollow(company.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isFollowing
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [followingStatus, setFollowingStatus] = useState({});
  
  const { user } = useAuth();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch();
      } else {
        setSearchResults(null);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await searchAPI.search(searchQuery);
      setSearchResults(response.data);
      
      // Check follow status for companies
      if (response.data.companies) {
        const statusPromises = response.data.companies.map(async (company) => {
          if (company.id !== user?.id) {
            try {
              const followStatus = await followersAPI.checkFollowStatus(company.id);
              return { [company.id]: followStatus.data.isFollowing };
            } catch {
              return { [company.id]: false };
            }
          }
          return {};
        });
        
        const statuses = await Promise.all(statusPromises);
        const combinedStatus = statuses.reduce((acc, status) => ({ ...acc, ...status }), {});
        setFollowingStatus(combinedStatus);
      }
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (companyId) => {
    try {
      await followersAPI.followCompany(companyId);
      setFollowingStatus(prev => ({ ...prev, [companyId]: true }));
    } catch (err) {
      alert(err.message || 'Failed to follow company');
    }
  };

  const handleUnfollow = async (companyId) => {
    try {
      await followersAPI.unfollowCompany(companyId);
      setFollowingStatus(prev => ({ ...prev, [companyId]: false }));
    } catch (err) {
      alert(err.message || 'Failed to unfollow company');
    }
  };

  const renderSearchResults = () => {
    if (!searchResults) return null;

    const { companies = [], leads = [], products = [] } = searchResults;

    if (activeTab === 'companies' || activeTab === 'all') {
      if (companies.length === 0 && activeTab === 'companies') {
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">No companies found</p>
          </div>
        );
      }

      return (
        <>
          {activeTab === 'all' && companies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Companies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map(company => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    isFollowing={followingStatus[company.id] || false}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map(company => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  isFollowing={followingStatus[company.id] || false}
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                />
              ))}
            </div>
          )}
        </>
      );
    }

    if (activeTab === 'leads' || activeTab === 'all') {
      if (leads.length === 0 && activeTab === 'leads') {
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">No leads found</p>
          </div>
        );
      }

      return (
        <>
          {activeTab === 'all' && leads.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Leads</h2>
              <div className="space-y-4">
                {leads.slice(0, 3).map(lead => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4">
              {leads.map(lead => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          )}
        </>
      );
    }

    if (activeTab === 'products' || activeTab === 'all') {
      if (products.length === 0 && activeTab === 'products') {
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        );
      }

      return (
        <>
          {activeTab === 'all' && products.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} showCompanyInfo={true} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} showCompanyInfo={true} />
              ))}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search companies, leads, products..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Tabs */}
      {searchResults && (
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {['all', 'companies', 'leads', 'products'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Search Results */}
      {!loading && searchQuery.length >= 2 && (
        <div>
          {searchResults ? renderSearchResults() : (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && searchQuery.length < 2 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
          <p className="text-gray-500">
            Enter at least 2 characters to search for companies, leads, and products
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;