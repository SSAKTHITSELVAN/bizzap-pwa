

//src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import MyLeadsPage from './pages/MyLeadsPage';
import NewsPage from './pages/NewsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LoadingSpinner from './components/LoadingSpinner';
import CompanyProfilePage from './pages/CompanyProfilePage';
import ProductsPage from './pages/ProductsPage';
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

// Service Worker Registration Hook
const useServiceWorker = () => {
  const [swStatus, setSwStatus] = useState('loading');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          // First, clear any existing service workers if needed (for development)
          if (process.env.NODE_ENV === 'development') {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
              await registration.unregister();
            }
          }

          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });

          console.log('SW registered successfully:', registration);
          setSwStatus('registered');

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New service worker available');
                  // Optionally show update notification to user
                }
              });
            }
          });

        } catch (error) {
          console.error('SW registration failed:', error);
          setSwStatus('failed');
        }
      };

      // Register after page load
      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
        return () => window.removeEventListener('load', registerSW);
      }
    } else {
      setSwStatus('not-supported');
    }
  }, []);

  return swStatus;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but there was an error loading the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const swStatus = useServiceWorker();

  // Request notification permission when user is authenticated
  useEffect(() => {
    if (user && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, [user]);

  // Handle route changes for analytics or other purposes
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location.pathname]);

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
          {/* Public Routes */}
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

          {/* Public Company Profile Route - accessible to all */}
          <Route 
            path="/companies/:id" 
            element={
              <ErrorBoundary>
                <CompanyProfilePage />
              </ErrorBoundary>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <DashboardPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-leads" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <MyLeadsPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <ProductsPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <NewsPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <ProfilePage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <SearchPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />

          {/* Root Route */}
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-2"
                  >
                    Go Back
                  </button>
                  <Navigate to={user ? "/dashboard" : "/login"} replace />
                </div>
              </div>
            } 
          />
        </Routes>
      </main>


    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;