
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