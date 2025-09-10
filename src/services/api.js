
// //src/service/api.js
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('authToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Generic API call function
// export const apiCall = async (endpoint, method = 'GET', data = null, requiresAuth = true) => {
//   try {
//     const config = {
//       method: method.toLowerCase(),
//       url: endpoint,
//     };

//     if (data && method !== 'GET') {
//       config.data = data;
//     }

//     if (method === 'GET' && data) {
//       config.params = data;
//     }

//     const response = await api(config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
//     throw new Error(errorMessage);
//   }
// };

// // Auth API calls
// export const authAPI = {
//   sendOtp: (phoneNumber) => apiCall('auth/send-otp', 'POST', { phoneNumber }, false),
//   verifyOtp: (phoneNumber, otp) => apiCall('auth/verify-otp', 'POST', { phoneNumber, otp }, false),
//   register: (data) => apiCall('auth/register', 'POST', data, false),
// };

// // Company API calls
// export const companyAPI = {
//   getProfile: () => apiCall('companies/profile'),
//   updateProfile: (data) => apiCall('companies/profile', 'PATCH', data),
//   getConsumedLeads: () => apiCall('companies/consumed-leads'),
//   getCompanyById: (id) => apiCall(`companies/${id}`),
//   getCompanyLeads: (id) => apiCall(`companies/${id}/leads`),
//   getCompanyProducts: (id) => apiCall(`products/public/company/${id}`, 'GET', null, false), // Added endpoint for public company products
// };

// // Leads API calls
// export const leadsAPI = {
//   getAllLeads: () => apiCall('leads'),
//   getMyLeads: () => apiCall('leads/my-leads'),
//   createLead: (data) => apiCall('leads', 'POST', data),
//   updateLead: (id, data) => apiCall(`leads/${id}`, 'PATCH', data),
//   deleteLead: (id) => apiCall(`leads/${id}`, 'DELETE'),
//   consumeLead: (id) => apiCall(`leads/${id}/consume`, 'POST'),
//   toggleLeadStatus: (id, isActive) => apiCall(`leads/${id}/status/${isActive}`, 'PATCH'),
//   getLeadById: (id) => apiCall(`leads/${id}`),
// };

// // Products API calls
// export const productsAPI = {
//   getMyProducts: () => apiCall('products/company'),
//   createProduct: (data) => apiCall('products', 'POST', data),
//   updateProduct: (id, data) => apiCall(`products/${id}`, 'PATCH', data),
//   deleteProduct: (id) => apiCall(`products/${id}`, 'DELETE'),
//   getProductById: (id) => apiCall(`products/${id}`),
//   getPublicProduct: (id) => apiCall(`products/public/${id}`, 'GET', null, false), // Added for public product access
// };

// // Followers API calls
// export const followersAPI = {
//   getFollowers: () => apiCall('followers/followers'),
//   getFollowing: () => apiCall('followers/following'),
//   followCompany: (companyId) => apiCall('followers/follow', 'POST', { companyId }),
//   unfollowCompany: (companyId) => apiCall(`followers/unfollow/${companyId}`, 'DELETE'),
//   checkFollowStatus: (companyId) => apiCall(`followers/check/${companyId}`),
// };

// // Search API calls
// export const searchAPI = {
//   search: (query) => apiCall('search', 'GET', { q: query }),
//   searchCompanies: (query) => apiCall('search/companies', 'GET', { q: query }),
//   searchLeads: (query) => apiCall('search/leads', 'GET', { q: query }),
//   searchProducts: (query) => apiCall('search/products', 'GET', { q: query }),
// };

// export default api;



//src/service/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API call function
export const apiCall = async (endpoint, method = 'GET', data = null, requiresAuth = true) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url: endpoint,
    };

    if (data && method !== 'GET') {
      config.data = data;
    }

    if (method === 'GET' && data) {
      config.params = data;
    }

    const response = await api(config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

// Auth API calls
export const authAPI = {
  sendOtp: (phoneNumber) => apiCall('auth/send-otp', 'POST', { phoneNumber }, false),
  verifyOtp: (phoneNumber, otp) => apiCall('auth/verify-otp', 'POST', { phoneNumber, otp }, false),
  register: (data) => apiCall('auth/register', 'POST', data, false),
};

// Company API calls
export const companyAPI = {
  getProfile: () => apiCall('companies/profile'),
  updateProfile: (data) => apiCall('companies/profile', 'PATCH', data),
  getConsumedLeads: () => apiCall('companies/consumed-leads'),
  getCompanyById: (id) => apiCall(`companies/${id}`),
  getCompanyLeads: (id) => apiCall(`companies/${id}/leads`),
  getCompanyProducts: (id) => apiCall(`products/public/company/${id}`, 'GET', null, false),
};

// Leads API calls
export const leadsAPI = {
  getAllLeads: () => apiCall('leads'),
  getMyLeads: () => apiCall('leads/my-leads'),
  createLead: (data) => apiCall('leads', 'POST', data),
  updateLead: (id, data) => apiCall(`leads/${id}`, 'PATCH', data),
  deleteLead: (id) => apiCall(`leads/${id}`, 'DELETE'),
  consumeLead: (id) => apiCall(`leads/${id}/consume`, 'POST'),
  toggleLeadStatus: (id, isActive) => apiCall(`leads/${id}/status/${isActive}`, 'PATCH'),
  deactivateWithReason: (id, data) => apiCall(`leads/${id}/deactivate`, 'PATCH', data), // New endpoint
  getLeadById: (id) => apiCall(`leads/${id}`),
};

// Products API calls
export const productsAPI = {
  getMyProducts: () => apiCall('products/company'),
  createProduct: (data) => apiCall('products', 'POST', data),
  updateProduct: (id, data) => apiCall(`products/${id}`, 'PATCH', data),
  deleteProduct: (id) => apiCall(`products/${id}`, 'DELETE'),
  getProductById: (id) => apiCall(`products/${id}`),
  getPublicProduct: (id) => apiCall(`products/public/${id}`, 'GET', null, false),
};

// Followers API calls
export const followersAPI = {
  getFollowers: () => apiCall('followers/followers'),
  getFollowing: () => apiCall('followers/following'),
  followCompany: (companyId) => apiCall('followers/follow', 'POST', { companyId }),
  unfollowCompany: (companyId) => apiCall(`followers/unfollow/${companyId}`, 'DELETE'),
  checkFollowStatus: (companyId) => apiCall(`followers/check/${companyId}`),
};

// Search API calls
export const searchAPI = {
  search: (query) => apiCall('search', 'GET', { q: query }),
  searchCompanies: (query) => apiCall('search/companies', 'GET', { q: query }),
  searchLeads: (query) => apiCall('search/leads', 'GET', { q: query }),
  searchProducts: (query) => apiCall('search/products', 'GET', { q: query }),
};

export default api;