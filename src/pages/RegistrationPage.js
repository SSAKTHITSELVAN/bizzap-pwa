//src/pages/RegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    gstNumber: '',
    companyName: '',
    userName: '',
    userPhoto: '',
    logo: '',
    address: '',
    description: '',
    referredBy: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneData, setPhoneData] = useState(null);

  useEffect(() => {
    // Get phone number and OTP from navigation state
    const { phoneNumber, otp } = location.state || {};
    
    if (!phoneNumber || !otp) {
      navigate('/login');
      return;
    }
    
    setPhoneData({ phoneNumber, otp });
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { gstNumber, companyName, userName } = formData;
    
    if (!gstNumber.trim()) {
      setError('GST Number is required');
      return false;
    }
    
    // Basic GST number validation
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(gstNumber)) {
      setError('Please enter a valid GST number');
      return false;
    }
    
    if (!companyName.trim()) {
      setError('Company Name is required');
      return false;
    }
    
    if (!userName.trim()) {
      setError('Your Name is required');
      return false;
    }
    
    // Validate URLs if provided
    if (formData.userPhoto && !isValidUrl(formData.userPhoto)) {
      setError('Please enter a valid profile photo URL');
      return false;
    }
    
    if (formData.logo && !isValidUrl(formData.logo)) {
      setError('Please enter a valid logo URL');
      return false;
    }
    
    return true;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    if (!phoneData) {
      setError('Registration data is missing. Please try logging in again.');
      return;
    }
    
    setLoading(true);
    
    try {
      const registrationData = {
        ...formData,
        phoneNumber: phoneData.phoneNumber,
        otp: phoneData.otp
      };
      
      await register(registrationData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!phoneData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Set up your company profile to start networking
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number *
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                placeholder="22AAAAA0000A1Z5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                disabled={loading}
                maxLength="15"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your 15-digit GST identification number
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo URL
              </label>
              <input
                type="url"
                name="userPhoto"
                value={formData.userPhoto}
                onChange={handleInputChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo URL
              </label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter your company address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief description of your company and services"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
              placeholder="BIZAP1234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a referral code to get bonus leads for both you and the referrer
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 text-lg font-medium"
          >
            {loading ? <LoadingSpinner size="sm" color="white" /> : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;