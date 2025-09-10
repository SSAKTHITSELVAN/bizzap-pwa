

//##################################################################
//##  Normal navbar
//##################################################################
// //src/components/Navbar.js
// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Home, 
//   FileText, 
//   Newspaper, 
//   Search, 
//   User, 
//   LogOut, 
//   Menu,
//   X 
// } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const navItems = [
//     { path: '/dashboard', label: 'Feed', icon: Home },
//     { path: '/my-leads', label: 'My Leads', icon: FileText },
//     { path: '/news', label: 'News', icon: Newspaper },
//     { path: '/search', label: 'Search', icon: Search },
//     { path: '/profile', label: 'Profile', icon: User },
//   ];

//   return (
//     <>
//       {/* Desktop Navigation - Top Bar */}
//       <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link to="/dashboard" className="flex items-center space-x-2">
//               <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Bizzap
//               </div>
//             </Link>
            
//             {/* Desktop Navigation Items */}
//             <div className="flex items-center space-x-4">
//               {navItems.map((item) => {
//                 const IconComponent = item.icon;
//                 return (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
//                       location.pathname === item.path
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                         : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <IconComponent size={18} />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
              
//               {/* User Menu */}
//               <div className="ml-4 relative flex items-center">
//                 <div className="flex items-center space-x-3">
//                   <div className="text-sm text-gray-700">
//                     {user?.companyName || user?.name}
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors flex items-center space-x-1"
//                   >
//                     <LogOut size={16} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navigation - Top Bar */}
//       <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
//         <div className="flex justify-between items-center h-14 px-4">
//           {/* Logo */}
//           <Link to="/dashboard" className="flex items-center space-x-2">
//             <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Bizzap
//             </div>
//           </Link>
          
//           {/* Company name and lead count */}
//           <div className="flex items-center space-x-3">
//             <div className="text-sm text-gray-700 truncate max-w-20">
//               {user?.companyName || user?.name}
//             </div>
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
//               {user ? (user.leadQuota - user.consumedLeads) : 0}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Bottom Navigation Bar */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
//         <div className="flex justify-around items-center py-2 px-1">
//           {navItems.map((item) => {
//             const IconComponent = item.icon;
//             const isActive = location.pathname === item.path;
            
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
//                   isActive
//                     ? 'text-blue-600 bg-blue-50'
//                     : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <IconComponent 
//                   size={22} 
//                   className={`mb-1 ${isActive ? 'text-blue-600' : ''}`}
//                 />
//                 <span className={`text-xs font-medium ${
//                   isActive ? 'text-blue-600' : 'text-gray-600'
//                 }`}>
//                   {item.label}
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;





//src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  FileText,
  Newspaper,
  Search,
  User,
  LogOut,
  PlusCircle,
  Menu,
  X,
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
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/profile', label: 'Profile', icon: User },
  ];
  
  // Mobile nav items are split to accommodate the central button
  const mobileNavItemsLeft = [
    { path: '/dashboard', label: 'Feed', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
  ];
  const mobileNavItemsRight = [
    { path: '/news', label: 'News', icon: Newspaper },
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

      {/* Mobile Navigation - Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="flex justify-between items-center h-14 px-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bizzap
            </div>
          </Link>

          {/* Company name and lead count */}
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-700 truncate max-w-20">
              {user?.companyName || user?.name}
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {user ? user.leadQuota - user.consumedLeads : 0}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="flex justify-around items-center py-2 px-1">
          {/* Left nav items */}
          {mobileNavItemsLeft.map((item) => {
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

          {/* Central Plus Button */}
          <Link
            to="/my-leads"
            className="-mt-8 z-10 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform scale-100 hover:scale-105"
          >
            <PlusCircle size={28} className="text-white" />
          </Link>

          {/* Right nav items */}
          {mobileNavItemsRight.map((item) => {
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
    </>
  );
};

export default Navbar;