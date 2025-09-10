🏗️ Complete File Structure Created
Core App Files:

package.json - Dependencies and scripts
src/App.js - Main app component with routing
src/index.js - React app initialization with PWA registration
src/context/AuthContext.js - Authentication state management
src/services/api.js - Complete API integration layer

Pages (Instagram/Twitter-like UI):

src/pages/LoginPage.js - Phone + OTP authentication
src/pages/RegistrationPage.js - Company profile setup
src/pages/DashboardPage.js - Main feed with lead consumption
src/pages/MyLeadsPage.js - Lead management with posting
src/pages/ProductsPage.js - Product catalog management
src/pages/ProfilePage.js - Company profile and followers
src/pages/SearchPage.js - Universal search functionality

Reusable Components:

src/components/Navbar.js - Responsive navigation
src/components/LeadCard.js - Lead display with actions
src/components/ProductCard.js - Product showcase
src/components/Modal.js - Reusable modal system
src/components/LoadingSpinner.js - Loading states

PWA & Utilities:

public/manifest.json - PWA configuration
public/sw.js - Service worker for offline support
public/index.html - HTML with PWA meta tags
src/utils/helpers.js - 50+ utility functions
src/App.css - Complete styling with Tailwind
README.md - Comprehensive setup guide

===========================================================
Bizzap PWA - B2B Social Networking App
A complete React PWA application for B2B social networking with lead management, product catalogs, and company networking features.
📁 Project Structure
bizzap-pwa/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.ico
│   ├── icons/
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── sw.js (Service Worker)
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── LoadingSpinner.js
│   │   ├── LeadCard.js
│   │   ├── ProductCard.js
│   │   ├── CompanyCard.js
│   │   └── Modal.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegistrationPage.js
│   │   ├── DashboardPage.js
│   │   ├── MyLeadsPage.js
│   │   ├── ProductsPage.js
│   │   ├── ProfilePage.js
│   │   └── SearchPage.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── App.css
│   │   └── components.css
│   ├── utils/
│   │   └── helpers.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md

#################################################################################

<!-- public\index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#667eea" />
    <meta
      name="description"
      content="Bizzap - B2B Social Networking Platform for lead generation, product catalogs, and business connections"
    />
    
    <!-- PWA Meta Tags -->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/icons/icon-192x192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bizzap.com/" />
    <meta property="og:title" content="Bizzap - B2B Social Networking" />
    <meta property="og:description" content="Connect your business with opportunities through leads, products, and networking" />
    <meta property="og:image" content="%PUBLIC_URL%/icons/icon-512x512.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bizzap.com/" />
    <meta property="twitter:title" content="Bizzap - B2B Social Networking" />
    <meta property="twitter:description" content="Connect your business with opportunities through leads, products, and networking" />
    <meta property="twitter:image" content="%PUBLIC_URL%/icons/icon-512x512.png" />
    
    <!-- iOS Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Bizzap" />
    
    <!-- Microsoft Windows/Edge -->
    <meta name="msapplication-TileColor" content="#667eea" />
    <meta name="msapplication-TileImage" content="%PUBLIC_URL%/icons/icon-192x192.png" />
    
    <title>Bizzap - B2B Social Networking</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- PWA Install Prompt -->
    <div id="pwa-install-prompt" style="display: none;" class="pwa-install-prompt">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <strong>Install Bizzap</strong>
          <p style="margin: 4px 0; font-size: 14px; color: #666;">Get the full app experience</p>
        </div>
        <div>
          <button id="pwa-install-btn" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 6px; margin-right: 8px;">
            Install
          </button>
          <button id="pwa-dismiss-btn" style="background: none; border: 1px solid #ccc; padding: 8px 16px; border-radius: 6px;">
            Dismiss
          </button>
        </div>
      </div>
    </div>

    <script>
      // PWA Install Prompt
      let deferredPrompt;
      const installPrompt = document.getElementById('pwa-install-prompt');
      const installBtn = document.getElementById('pwa-install-btn');
      const dismissBtn = document.getElementById('pwa-dismiss-btn');

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installPrompt.style.display = 'block';
      });

      installBtn.addEventListener('click', () => {
        installPrompt.style.display = 'none';
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
          });
        }
      });

      dismissBtn.addEventListener('click', () => {
        installPrompt.style.display = 'none';
        deferredPrompt = null;
      });

      // Hide install prompt if already installed
      window.addEventListener('appinstalled', () => {
        installPrompt.style.display = 'none';
        deferredPrompt = null;
      });
    </script>
  </body>
</html>

#################################################################################

// public/manifest.json
{
  "short_name": "Bizzap",
  "name": "Bizzap - B2B Social Networking",
  "description": "Connect your business with opportunities through leads, products, and networking",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "icons/icon-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icons/icon-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "orientation": "portrait-primary",
  "categories": ["business", "networking", "productivity"],
  "lang": "en",
  "dir": "ltr"
}

#################################################################################

// public/sw.js
const CACHE_NAME = 'bizzap-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Bizzap',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Bizzap', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

#################################################################################

//src/components/LeadCard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      {/* Company Header */}
      {showCompanyInfo && lead.company && (
        <div className="flex items-center mb-4">
          <img
            src={lead.company.logo || 'https://via.placeholder.com/40'}
            alt="Company Logo"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {lead.company.companyName || 'Unknown Company'}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Lead Image */}
      {lead.image && (
        <div className="mb-4">
          <img
            src={lead.image}
            alt="Lead"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Lead Content */}
      <div className="mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{lead.title}</h4>
        <p className="text-gray-700 mb-3">{lead.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {lead.budget && (
            <div>
              <span className="font-semibold text-gray-600">Budget:</span>
              <span className="ml-1 text-green-600">{lead.budget}</span>
            </div>
          )}
          {lead.quantity && (
            <div>
              <span className="font-semibold text-gray-600">Quantity:</span>
              <span className="ml-1">{lead.quantity}</span>
            </div>
          )}
          {lead.location && (
            <div className="col-span-2">
              <span className="font-semibold text-gray-600">Location:</span>
              <span className="ml-1">{lead.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lead Status (for my leads) */}
      {isMyLead && (
        <div className="mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            lead.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {lead.isActive ? 'Active' : 'Inactive'}
          </div>
          {!lead.isActive && lead.reasonForDeactivation && (
            <p className="text-sm text-gray-600 mt-2">
              <strong>Reason:</strong> {lead.reasonForDeactivation}
            </p>
          )}
        </div>
      )}

      {/* Stats and Actions */}
      {showActions && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Views: {lead.viewCount || 0} | Consumed: {lead.consumedCount || 0}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Share
            </button>
            
            {isMyLead ? (
              <>
                <button
                  onClick={() => onEditLead && onEditLead(lead.id)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                
                <button
                  onClick={() => onToggleStatus && onToggleStatus(lead.id, !lead.isActive)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    lead.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {lead.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                <button
                  onClick={() => onDeleteLead && onDeleteLead(lead.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => onConsumeLead && onConsumeLead(lead.id)}
                className="px-4 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
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

#################################################################################

//src/components/ProductCard.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ 
  product, 
  onEditProduct, 
  onDeleteProduct, 
  onContactSeller,
  showCompanyInfo = false 
}) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMyProduct = product.companyId === user?.id;

  const handleShare = () => {
    const productUrl = `${window.location.origin}?product=${product.id}`;
    const shareText = `Check out this product: "${product.name}" on Bizzap`;
    
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Bizzap`,
        text: shareText,
        url: productUrl
      }).catch(err => console.error('Share failed:', err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${productUrl}`).then(() => {
        alert('Product link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy link');
      });
    }
  };

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative">
        <img
          src={
            product.images && product.images.length > 0 
              ? product.images[currentImageIndex] 
              : 'https://via.placeholder.com/300x200'
          }
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Image Navigation */}
        {product.images && product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
            >
              &#8249;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
            >
              &#8250;
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Company Info */}
        {showCompanyInfo && product.company && (
          <div className="flex items-center mb-3 pb-3 border-b border-gray-200">
            <img
              src={product.company.logo || 'https://via.placeholder.com/32'}
              alt="Company Logo"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {product.company.companyName}
            </span>
          </div>
        )}

        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
        
        {/* Product Details */}
        <div className="space-y-2 mb-4">
          {product.price && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Price:</span>
              <span className="font-bold text-green-600">${product.price}</span>
            </div>
          )}
          
          {product.minimumQuantity && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Min Quantity:</span>
              <span className="text-sm text-gray-800">{product.minimumQuantity}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-3 border-t border-gray-200">
          <button
            onClick={handleShare}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Share
          </button>
          
          {isMyProduct ? (
            <>
              <button
                onClick={() => onEditProduct && onEditProduct(product.id)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              
              <button
                onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => onContactSeller && onContactSeller(product)}
              className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Contact Seller
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

#################################################################################

//src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600',
    white: 'border-white'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 border-opacity-20 border-t-opacity-100 rounded-full animate-spin
        `}
      ></div>
    </div>
  );
};

export default LoadingSpinner;

#################################################################################

//src/components/Modal.js
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

#################################################################################

//src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  FileText, 
  Package, 
  Search, 
  User, 
  LogOut, 
  Menu,
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Feed', icon: Home },
    { path: '/my-leads', label: 'My Leads', icon: FileText },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bizzap
              </div>
            </Link>
            
            {/* Desktop Navigation Items */}
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* User Menu */}
              <div className="ml-4 relative flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-700">
                    {user?.companyName || user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors flex items-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top Bar (Logo Only) */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="flex justify-between items-center h-14 px-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bizzap
            </div>
          </Link>
          
          {/* User info and menu */}
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-700 truncate max-w-24">
              {user?.companyName || user?.name}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="absolute top-14 right-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px]">
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent 
                  size={22} 
                  className={`mb-1 ${isActive ? 'text-blue-600' : ''}`}
                />
                <span className={`text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

#################################################################################

//src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const response = await apiCall('companies/profile', 'GET', null, true);
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (phoneNumber, otp) => {
    try {
      const response = await apiCall('auth/verify-otp', 'POST', { phoneNumber, otp }, false);
      
      if (response.data.isNewUser) {
        return { isNewUser: true, phoneNumber, otp };
      } else {
        const newToken = response.data.token;
        setToken(newToken);
        setUser(response.data.company);
        localStorage.setItem('authToken', newToken);
        return { isNewUser: false, user: response.data.company };
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (registrationData) => {
    try {
      const response = await apiCall('auth/register', 'POST', registrationData, false);
      const newToken = response.data.token;
      setToken(newToken);
      setUser(response.data.company);
      localStorage.setItem('authToken', newToken);
      return response.data.company;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const sendOtp = async (phoneNumber) => {
    try {
      await apiCall('auth/send-otp', 'POST', { phoneNumber }, false);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    sendOtp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

#################################################################################

//src/hooks/useAuth.js

#################################################################################

//src/hooks/useApi.js

#################################################################################

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [contactModal, setContactModal] = useState({ isOpen: false, contact: null });

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    // Filter leads based on search query
    if (searchQuery.trim()) {
      const filtered = leads.filter(lead =>
        lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeads(filtered);
    } else {
      setFilteredLeads(leads);
    }
  }, [searchQuery, leads]);

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

  const handleRefresh = () => {
    loadLeads();
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
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Lead Feed</h1>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {user ? (user.leadQuota - user.consumedLeads) : 0} leads remaining
            </div>
            
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Refresh feed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, companies, locations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

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
              {searchQuery ? 'No leads found' : 'No leads available'}
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Be the first to post a lead!'
              }
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
      <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6">
        <button
          onClick={() => window.location.href = '/my-leads'}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          title="Post New Lead"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

#################################################################################

//src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, sendOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      await sendOtp(phoneNumber);
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const result = await login(phoneNumber, otp);
      
      if (result.isNewUser) {
        // Navigate to registration with phone and otp data
        navigate('/register', { 
          state: { 
            phoneNumber: result.phoneNumber, 
            otp: result.otp 
          } 
        });
      } else {
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Bizzap
          </h1>
          <p className="text-gray-600 mt-2">Connect your business with opportunities</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+919876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +91 for India)
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <div className="text-center text-green-600 mb-4">
                OTP sent to {phoneNumber}
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Enter the 6-digit code sent to your phone
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 mb-4"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Verify & Login'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setError('');
              }}
              className="w-full text-gray-600 hover:text-blue-600 transition-colors"
            >
              Change phone number
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to Bizzap? You'll be able to register after verifying your phone number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

#################################################################################

//src/pages/MyLeadsPage.js
import React, { useState, useEffect } from 'react';
import { leadsAPI } from '../services/api';
import LeadCard from '../components/LeadCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

const MyLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    budget: '',
    quantity: '',
    location: ''
  });

  useEffect(() => {
    loadMyLeads();
  }, []);

  const loadMyLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsAPI.getMyLeads();
      setLeads(response.data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required');
      return;
    }

    try {
      await leadsAPI.createLead(formData);
      setCreateModalOpen(false);
      setFormData({
        title: '',
        description: '',
        image: '',
        budget: '',
        quantity: '',
        location: ''
      });
      loadMyLeads();
      alert('Lead posted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create lead');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      await leadsAPI.deleteLead(leadId);
      loadMyLeads();
      alert('Lead deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete lead');
    }
  };

  const handleToggleStatus = async (leadId, newStatus) => {
    try {
      await leadsAPI.toggleLeadStatus(leadId, newStatus);
      loadMyLeads();
      alert(`Lead ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      alert(err.message || 'Failed to update lead status');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Leads</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Post New Lead</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Leads List */}
      <div className="space-y-6">
        {leads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
            <p className="text-gray-500 mb-4">Create your first lead to start connecting with potential partners</p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Post Your First Lead
            </button>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onDeleteLead={handleDeleteLead}
              onToggleStatus={handleToggleStatus}
              showCompanyInfo={false}
              showActions={true}
            />
          ))
        )}
      </div>

      {/* Create Lead Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Post New Lead"
        size="lg"
      >
        <form onSubmit={handleCreateLead} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Need 1000 units of packaging materials"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe your requirement in detail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="$5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="50 units"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="San Francisco, CA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Post Lead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyLeadsPage;

#################################################################################

//src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: '',
    price: '',
    minimumQuantity: ''
  });

  useEffect(() => {
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getMyProducts();
      setProducts(response.data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Product name and description are required');
      return;
    }

    const imageUrls = formData.images
      ? formData.images.split(',').map(url => url.trim()).filter(url => url)
      : [];

    const productData = {
      name: formData.name,
      description: formData.description,
      images: imageUrls,
      price: parseFloat(formData.price) || undefined,
      minimumQuantity: formData.minimumQuantity
    };

    try {
      await productsAPI.createProduct(productData);
      setCreateModalOpen(false);
      setFormData({
        name: '',
        description: '',
        images: '',
        price: '',
        minimumQuantity: ''
      });
      loadMyProducts();
      alert('Product added successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productsAPI.deleteProduct(productId);
      loadMyProducts();
      alert('Product deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-4">Start building your product catalog to showcase your offerings</p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDeleteProduct={handleDeleteProduct}
              showCompanyInfo={false}
            />
          ))
        )}
      </div>

      {/* Create Product Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <form onSubmit={handleCreateProduct} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Premium Cotton T-Shirts"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe your product features, quality, specifications..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URLs
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              rows="2"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter multiple image URLs separated by commas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                placeholder="99.99"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Quantity
              </label>
              <input
                type="text"
                name="minimumQuantity"
                value={formData.minimumQuantity}
                onChange={handleInputChange}
                placeholder="100 pieces"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Add Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductsPage;

#################################################################################

//src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { companyAPI, followersAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState('followers');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    userPhoto: '',
    logo: '',
    address: '',
    description: ''
  });

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
        address: user.address || '',
        description: user.description || ''
      });
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [followersRes, followingRes] = await Promise.all([
        followersAPI.getFollowers(),
        followersAPI.getFollowing()
      ]);
      
      setFollowers(followersRes.data || []);
      setFollowing(followingRes.data || []);
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      const response = await companyAPI.updateProfile(formData);
      updateUser(response.data);
      setEditModalOpen(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFollow = async (companyId) => {
    try {
      await followersAPI.followCompany(companyId);
      loadProfileData(); // Refresh the data
    } catch (err) {
      alert(err.message || 'Failed to follow company');
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={user.logo || 'https://via.placeholder.com/150'} 
              alt="Company Logo" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{user.companyName}</h1>
            <p className="text-gray-600 mt-1">{user.userName}</p>
            
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{followers.length}</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{following.length}</div>
                <div className="text-gray-600">Following</div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setEditModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-700">{user.description || 'No description available.'}</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
            <p className="text-gray-700">{user.address || 'No address provided.'}</p>
          </div>
        </div>
      </div>

      {/* Followers/Following Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`py-4 px-6 font-medium text-sm ${activeTab === 'followers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('followers')}
            >
              Followers
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${activeTab === 'following' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          </nav>
        </div>
        
        <div className="p-4">
          {activeTab === 'followers' ? (
            followers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followers.map(follower => (
                  <div key={follower._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={follower.logo || 'https://via.placeholder.com/50'} 
                        alt={follower.companyName} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{follower.companyName}</h4>
                        <p className="text-sm text-gray-600">{follower.userName}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleUnfollow(follower._id)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No followers yet</p>
            )
          ) : (
            following.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {following.map(company => (
                  <div key={company._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={company.logo || 'https://via.placeholder.com/50'} 
                        alt={company.companyName} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{company.companyName}</h4>
                        <p className="text-sm text-gray-600">{company.userName}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleFollow(company._id)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                    >
                      Follow Back
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Not following any companies yet</p>
            )
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
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

export default ProfilePage;

#################################################################################

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

#################################################################################

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

#################################################################################

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
  getCompanyById: (id) => apiCall(`companies/${id}`),
  getCompanyLeads: (id) => apiCall(`companies/${id}/leads`),
  getCompanyProducts: (id) => apiCall(`companies/${id}/products`),
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
  getLeadById: (id) => apiCall(`leads/${id}`),
};

// Products API calls
export const productsAPI = {
  getMyProducts: () => apiCall('products/company'),
  createProduct: (data) => apiCall('products', 'POST', data),
  updateProduct: (id, data) => apiCall(`products/${id}`, 'PATCH', data),
  deleteProduct: (id) => apiCall(`products/${id}`, 'DELETE'),
  getProductById: (id) => apiCall(`products/${id}`),
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

#################################################################################

//src/utils/helpers
// Utility functions for the Bizzap PWA

// Format date to relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

// Validate URL format
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Validate phone number (basic international format)
export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
};

// Validate GST number (Indian format)
export const isValidGSTNumber = (gstNumber) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber.toUpperCase());
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth < 768;
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      return false;
    }
  } else {
    // Fallback method
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      console.error('Fallback copy failed: ', err);
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Share content using Web Share API or fallback
export const shareContent = async (title, text, url) => {
  const shareData = {
    title,
    text,
    url
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Native share failed:', err);
      }
    }
  }

  // Fallback to clipboard
  const shareText = `${text}\n${url}`;
  const copied = await copyToClipboard(shareText);
  return { success: copied, method: 'clipboard' };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Check if PWA is installable
export const isPWAInstallable = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

// Local storage helpers with error handling
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Local storage set failed:', err);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Local storage get failed:', err);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Local storage remove failed:', err);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error('Local storage clear failed:', err);
      return false;
    }
  }
};

// Image optimization and lazy loading helpers
export const createImageLoader = () => {
  const imageCache = new Map();
  
  return {
    loadImage: (src) => {
      if (imageCache.has(src)) {
        return Promise.resolve(imageCache.get(src));
      }
      
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageCache.set(src, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    },
    
    preloadImages: (sources) => {
      return Promise.all(sources.map(src => this.loadImage(src)));
    }
  };
};

// Network status helpers
export const networkStatus = {
  isOnline: () => navigator.onLine,
  
  addOnlineListener: (callback) => {
    window.addEventListener('online', callback);
    return () => window.removeEventListener('online', callback);
  },
  
  addOfflineListener: (callback) => {
    window.addEventListener('offline', callback);
    return () => window.removeEventListener('offline', callback);
  }
};

// Form validation helpers
export const validation = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  required: (value) => {
    return value && value.toString().trim().length > 0;
  },
  
  minLength: (value, length) => {
    return value && value.toString().length >= length;
  },
  
  maxLength: (value, length) => {
    return !value || value.toString().length <= length;
  },
  
  numeric: (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }
};

// SEO and meta helpers
export const updatePageMeta = (title, description) => {
  if (title) {
    document.title = `${title} - Bizzap`;
  }
  
  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }
};

// Performance monitoring helpers
export const performanceMonitor = {
  mark: (name) => {
    if (performance.mark) {
      performance.mark(name);
    }
  },
  
  measure: (name, startMark, endMark) => {
    if (performance.measure) {
      performance.measure(name, startMark, endMark);
    }
  },
  
  getEntries: () => {
    if (performance.getEntries) {
      return performance.getEntries();
    }
    return [];
  }
};

// Error tracking helpers
export const errorTracker = {
  track: (error, context = {}) => {
    console.error('Error tracked:', error, context);
    
    // In production, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: context });
  },
  
  trackEvent: (event, data = {}) => {
    console.log('Event tracked:', event, data);
    
    // In production, you would send this to your analytics service
    // Example: analytics.track(event, data);
  }
};

// Device detection helpers
export const device = {
  isMobile: () => /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
  isDesktop: () => !device.isMobile() && !device.isTablet(),
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: () => /Android/.test(navigator.userAgent),
  
  getViewport: () => ({
    width: window.innerWidth,
    height: window.innerHeight
  }),
  
  getScreenSize: () => ({
    width: screen.width,
    height: screen.height
  })
};

export default {
  formatRelativeTime,
  isValidUrl,
  isValidPhoneNumber,
  isValidGSTNumber,
  formatCurrency,
  truncateText,
  generateId,
  debounce,
  isMobile,
  copyToClipboard,
  shareContent,
  formatFileSize,
  isPWAInstallable,
  storage,
  createImageLoader,
  networkStatus,
  validation,
  updatePageMeta,
  performanceMonitor,
  errorTracker,
  device
};

#################################################################################

//src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import MyLeadsPage from './pages/MyLeadsPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      <main className={user ? "pt-16 md:pt-16 pb-20 md:pb-0" : ""}>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-leads" 
            element={
              <ProtectedRoute>
                <MyLeadsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

#################################################################################

//src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available
                const shouldUpdate = window.confirm('New version available! Refresh to update?');
                if (shouldUpdate) {
                  window.location.reload();
                }
              }
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

#################################################################################

//tailwind.cinfig.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
      }
    },
  },
  plugins: [],
}

#################################################################################
//.env
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_APP_NAME=Bizzap

#################################################################################
