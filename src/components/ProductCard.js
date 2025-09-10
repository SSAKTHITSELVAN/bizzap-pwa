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