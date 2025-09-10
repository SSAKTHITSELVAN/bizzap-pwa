
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
    sm: 'md:max-w-md',
    md: 'md:max-w-lg',
    lg: 'md:max-w-2xl',
    xl: 'md:max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black bg-opacity-50">
      {/* Mobile: Bottom sheet style */}
      <div 
        className={`
          bg-white 
          w-full h-auto max-h-[90vh] 
          md:rounded-lg md:shadow-xl 
          ${sizeClasses[size]} 
          overflow-y-auto
          md:max-h-[90vh]
          rounded-t-3xl md:rounded-t-lg
          mobile-modal
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Handle Bar */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-6 safe-area-bottom">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;