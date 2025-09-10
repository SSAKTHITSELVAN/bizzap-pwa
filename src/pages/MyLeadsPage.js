

// //src/pages/MyLeadsPage.js
// import React, { useState, useEffect } from 'react';
// import { leadsAPI, companyAPI } from '../services/api';
// import LeadCard from '../components/LeadCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import Modal from '../components/Modal';
// import { Plus, Eye, FileText } from 'lucide-react';

// const MyLeadsPage = () => {
//   const [postedLeads, setPostedLeads] = useState([]);
//   const [consumedLeads, setConsumedLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('posted');
  
//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  
//   // Form data
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//     budget: '',
//     quantity: '',
//     location: ''
//   });
  
//   const [editingLead, setEditingLead] = useState(null);
//   const [deactivatingLead, setDeactivatingLead] = useState(null);
//   const [deactivationReason, setDeactivationReason] = useState('');

//   useEffect(() => {
//     loadAllLeads();
//   }, []);

//   const loadAllLeads = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       // Load posted leads and consumed leads in parallel
//       const [postedResponse, consumedResponse] = await Promise.all([
//         leadsAPI.getMyLeads(),
//         companyAPI.getConsumedLeads()
//       ]);
      
//       setPostedLeads(postedResponse.data || []);
//       setConsumedLeads(consumedResponse.data || []);
//     } catch (err) {
//       setError(err.message || 'Failed to load leads');
//       // Set empty arrays on error to prevent undefined issues
//       setPostedLeads([]);
//       setConsumedLeads([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateLead = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title.trim() || !formData.description.trim()) {
//       alert('Title and description are required');
//       return;
//     }

//     try {
//       const leadData = {
//         title: formData.title.trim(),
//         description: formData.description.trim(),
//         image: formData.image.trim() || null,
//         budget: formData.budget.trim() || null,
//         quantity: formData.quantity.trim() || null,
//         location: formData.location.trim() || null
//       };

//       await leadsAPI.createLead(leadData);
//       setCreateModalOpen(false);
//       resetFormData();
//       loadAllLeads();
//       alert('Lead posted successfully!');
//     } catch (err) {
//       alert(err.message || 'Failed to create lead');
//     }
//   };

//   const handleEditLead = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title.trim() || !formData.description.trim()) {
//       alert('Title and description are required');
//       return;
//     }

//     if (!editingLead) {
//       alert('No lead selected for editing');
//       return;
//     }

//     try {
//       const leadData = {
//         title: formData.title.trim(),
//         description: formData.description.trim(),
//         image: formData.image.trim() || null,
//         budget: formData.budget.trim() || null,
//         quantity: formData.quantity.trim() || null,
//         location: formData.location.trim() || null
//       };

//       await leadsAPI.updateLead(editingLead.id, leadData);
//       setEditModalOpen(false);
//       setEditingLead(null);
//       resetFormData();
//       loadAllLeads();
//       alert('Lead updated successfully!');
//     } catch (err) {
//       alert(err.message || 'Failed to update lead');
//     }
//   };

//   const handleDeleteLead = async (leadId) => {
//     if (!window.confirm('Are you sure you want to delete this lead?')) {
//       return;
//     }

//     try {
//       await leadsAPI.deleteLead(leadId);
//       loadAllLeads();
//       alert('Lead deleted successfully');
//     } catch (err) {
//       alert(err.message || 'Failed to delete lead');
//     }
//   };

//   const handleToggleStatus = async (leadId, newStatus) => {
//     const lead = postedLeads.find(l => l.id === leadId);
    
//     if (!newStatus && lead?.isActive) {
//       // Deactivating - need reason
//       setDeactivatingLead({ id: leadId, newStatus });
//       setDeactivateModalOpen(true);
//       return;
//     }
    
//     // Activating - no reason needed
//     try {
//       await leadsAPI.toggleLeadStatus(leadId, newStatus);
//       loadAllLeads();
//       alert(`Lead ${newStatus ? 'activated' : 'deactivated'} successfully`);
//     } catch (err) {
//       alert(err.message || 'Failed to update lead status');
//     }
//   };

//   const handleDeactivateWithReason = async (e) => {
//     e.preventDefault();
    
//     if (!deactivationReason.trim()) {
//       alert('Please provide a reason for deactivation');
//       return;
//     }

//     if (!deactivatingLead) {
//       alert('No lead selected for deactivation');
//       return;
//     }

//     try {
//       await leadsAPI.deactivateWithReason(deactivatingLead.id, { 
//         reasonForDeactivation: deactivationReason.trim()
//       });
      
//       setDeactivateModalOpen(false);
//       setDeactivatingLead(null);
//       setDeactivationReason('');
//       loadAllLeads();
//       alert('Lead deactivated successfully');
//     } catch (err) {
//       alert(err.message || 'Failed to deactivate lead');
//     }
//   };

//   const openEditModal = (leadId) => {
//     const lead = postedLeads.find(l => l.id === leadId);
//     if (lead) {
//       setEditingLead(lead);
//       setFormData({
//         title: lead.title || '',
//         description: lead.description || '',
//         image: lead.image || '',
//         budget: lead.budget || '',
//         quantity: lead.quantity || '',
//         location: lead.location || ''
//       });
//       setEditModalOpen(true);
//     }
//   };

//   const resetFormData = () => {
//     setFormData({
//       title: '',
//       description: '',
//       image: '',
//       budget: '',
//       quantity: '',
//       location: ''
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleModalClose = (modalType) => {
//     switch (modalType) {
//       case 'create':
//         setCreateModalOpen(false);
//         resetFormData();
//         break;
//       case 'edit':
//         setEditModalOpen(false);
//         setEditingLead(null);
//         resetFormData();
//         break;
//       case 'deactivate':
//         setDeactivateModalOpen(false);
//         setDeactivatingLead(null);
//         setDeactivationReason('');
//         break;
//       default:
//         break;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center min-h-96">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 max-w-4xl">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Leads</h1>
//           <p className="text-gray-600 text-sm mt-1">
//             Manage your posted leads and view consumed leads
//           </p>
//         </div>
//         <button
//           onClick={() => setCreateModalOpen(true)}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-md"
//         >
//           <Plus size={20} />
//           <span>Post New Lead</span>
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
//           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           <div>
//             <p className="font-medium">Error loading leads</p>
//             <p className="text-sm">{error}</p>
//           </div>
//           <button
//             onClick={loadAllLeads}
//             className="ml-auto bg-red-200 hover:bg-red-300 px-3 py-1 rounded text-sm"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
//         <button
//           onClick={() => setActiveTab('posted')}
//           className={`flex-1 py-2 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
//             activeTab === 'posted'
//               ? 'bg-white text-blue-600 shadow-sm'
//               : 'text-gray-600 hover:text-gray-800'
//           }`}
//         >
//           <FileText size={18} />
//           <span>Posted Leads</span>
//           <span className={`text-xs px-2 py-1 rounded-full ${
//             activeTab === 'posted' ? 'bg-blue-100' : 'bg-gray-200'
//           }`}>
//             {postedLeads.length}
//           </span>
//         </button>
//         <button
//           onClick={() => setActiveTab('consumed')}
//           className={`flex-1 py-2 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
//             activeTab === 'consumed'
//               ? 'bg-white text-blue-600 shadow-sm'
//               : 'text-gray-600 hover:text-gray-800'
//           }`}
//         >
//           <Eye size={18} />
//           <span>Consumed Leads</span>
//           <span className={`text-xs px-2 py-1 rounded-full ${
//             activeTab === 'consumed' ? 'bg-blue-100' : 'bg-gray-200'
//           }`}>
//             {consumedLeads.length}
//           </span>
//         </button>
//       </div>

//       {/* Leads Content */}
//       <div className="space-y-6">
//         {activeTab === 'posted' ? (
//           // Posted Leads Tab
//           <>
//             {postedLeads.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <FileText size={64} className="mx-auto mb-4" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No posted leads yet</h3>
//                 <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                   Create your first lead to start connecting with potential partners and grow your business network
//                 </p>
//                 <button
//                   onClick={() => setCreateModalOpen(true)}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
//                 >
//                   Post Your First Lead
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {postedLeads.map((lead) => (
//                   <LeadCard
//                     key={lead.id}
//                     lead={lead}
//                     onDeleteLead={handleDeleteLead}
//                     onEditLead={openEditModal}
//                     onToggleStatus={handleToggleStatus}
//                     showCompanyInfo={false}
//                     showActions={true}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           // Consumed Leads Tab
//           <>
//             {consumedLeads.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <Eye size={64} className="mx-auto mb-4" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No consumed leads yet</h3>
//                 <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                   Start exploring leads from other companies to discover new business opportunities and partnerships
//                 </p>
//                 <button
//                   onClick={() => window.location.href = '/dashboard'}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
//                 >
//                   Browse All Leads
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {consumedLeads.map((consumedLead) => (
//                   <div key={consumedLead.id} className="relative">
//                     <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-sm">
//                       Consumed on {new Date(consumedLead.consumedAt).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       })}
//                     </div>
//                     <LeadCard
//                       lead={consumedLead.lead}
//                       showCompanyInfo={true}
//                       showActions={false}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Create Lead Modal */}
//       <Modal
//         isOpen={createModalOpen}
//         onClose={() => handleModalClose('create')}
//         title="Post New Lead"
//         size="lg"
//       >
//         <form onSubmit={handleCreateLead} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="e.g., Need 1000 units of packaging materials"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               required
//               maxLength={100}
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="4"
//               placeholder="Describe your requirement in detail..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//               required
//               maxLength={500}
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Budget
//               </label>
//               <input
//                 type="text"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 placeholder="$5000"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 maxLength={50}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quantity
//               </label>
//               <input
//                 type="text"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 placeholder="50 units"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 maxLength={50}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               placeholder="San Francisco, CA"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               maxLength={100}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image URL
//             </label>
//             <input
//               type="url"
//               name="image"
//               value={formData.image}
//               onChange={handleInputChange}
//               placeholder="https://example.com/image.jpg"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//             />
//             {formData.image && (
//               <p className="text-xs text-gray-500 mt-1">Preview will be shown after posting</p>
//             )}
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={() => handleModalClose('create')}
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md"
//             >
//               Post Lead
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Edit Lead Modal */}
//       <Modal
//         isOpen={editModalOpen}
//         onClose={() => handleModalClose('edit')}
//         title={`Edit Lead: ${editingLead?.title || ''}`}
//         size="lg"
//       >
//         <form onSubmit={handleEditLead} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="e.g., Need 1000 units of packaging materials"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               required
//               maxLength={100}
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="4"
//               placeholder="Describe your requirement in detail..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//               required
//               maxLength={500}
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Budget
//               </label>
//               <input
//                 type="text"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 placeholder="$5000"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 maxLength={50}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quantity
//               </label>
//               <input
//                 type="text"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 placeholder="50 units"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 maxLength={50}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               placeholder="San Francisco, CA"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               maxLength={100}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image URL
//             </label>
//             <input
//               type="url"
//               name="image"
//               value={formData.image}
//               onChange={handleInputChange}
//               placeholder="https://example.com/image.jpg"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//             />
//             {formData.image && (
//               <p className="text-xs text-gray-500 mt-1">Preview will be updated after saving</p>
//             )}
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={() => handleModalClose('edit')}
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md"
//             >
//               Update Lead
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Deactivate Lead Modal */}
//       <Modal
//         isOpen={deactivateModalOpen}
//         onClose={() => handleModalClose('deactivate')}
//         title="Deactivate Lead"
//         size="md"
//       >
//         <form onSubmit={handleDeactivateWithReason} className="space-y-4">
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <p className="text-yellow-800 font-medium">Lead Deactivation</p>
//             </div>
//             <p className="text-yellow-700 text-sm mt-1">
//               Deactivating this lead will make it invisible to other users. Please provide a reason.
//             </p>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Reason for deactivation <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={deactivationReason}
//               onChange={(e) => setDeactivationReason(e.target.value)}
//               rows="4"
//               placeholder="e.g., Lead requirement fulfilled, No longer needed, Found better option..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
//               required
//               maxLength={200}
//             />
//             <p className="text-xs text-gray-500 mt-1">{deactivationReason.length}/200 characters</p>
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={() => handleModalClose('deactivate')}
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all font-medium shadow-md"
//             >
//               Deactivate Lead
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default MyLeadsPage;



//src/pages/MyLeadsPage.js
import React, { useState, useEffect } from 'react';
import { leadsAPI, companyAPI } from '../services/api';
import LeadCard from '../components/LeadCard';
import ConsumedLeadCard from '../components/ConsumedLeadCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { Plus, Eye, FileText, Search, Filter } from 'lucide-react';

const MyLeadsPage = () => {
  const [postedLeads, setPostedLeads] = useState([]);
  const [consumedLeads, setConsumedLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posted');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, inactive
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    budget: '',
    quantity: '',
    location: ''
  });
  
  const [editingLead, setEditingLead] = useState(null);
  const [deactivatingLead, setDeactivatingLead] = useState(null);
  const [deactivationReason, setDeactivationReason] = useState('');

  useEffect(() => {
    loadAllLeads();
  }, []);

  const loadAllLeads = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load posted leads and consumed leads in parallel
      const [postedResponse, consumedResponse] = await Promise.all([
        leadsAPI.getMyLeads().catch(err => ({ data: [] })),
        companyAPI.getConsumedLeads().catch(err => ({ data: [] }))
      ]);
      
      setPostedLeads(postedResponse.data || []);
      setConsumedLeads(consumedResponse.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load leads');
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter posted leads based on search and status
  const filteredPostedLeads = postedLeads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.location && lead.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && lead.isActive) ||
      (statusFilter === 'inactive' && !lead.isActive);
    
    return matchesSearch && matchesStatus;
  });

  // Filter consumed leads based on search
  const filteredConsumedLeads = consumedLeads.filter(consumedLead => {
    if (!searchQuery) return true;
    
    const lead = consumedLead.lead;
    const company = lead.company;
    
    return lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (company?.companyName && company.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (lead.location && lead.location.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleCreateLead = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required');
      return;
    }

    try {
      await leadsAPI.createLead(formData);
      setCreateModalOpen(false);
      resetFormData();
      loadAllLeads();
      alert('Lead posted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create lead');
      console.error('Error creating lead:', err);
    }
  };

  const handleEditLead = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required');
      return;
    }

    try {
      await leadsAPI.updateLead(editingLead.id, formData);
      setEditModalOpen(false);
      setEditingLead(null);
      resetFormData();
      loadAllLeads();
      alert('Lead updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update lead');
      console.error('Error updating lead:', err);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    try {
      await leadsAPI.deleteLead(leadId);
      loadAllLeads();
      alert('Lead deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete lead');
      console.error('Error deleting lead:', err);
    }
  };

  const handleToggleStatus = async (leadId, newStatus) => {
    const lead = postedLeads.find(l => l.id === leadId);
    
    if (!newStatus && lead?.isActive) {
      // Deactivating - need reason
      setDeactivatingLead({ id: leadId, newStatus });
      setDeactivateModalOpen(true);
      return;
    }
    
    // Activating - no reason needed
    try {
      await leadsAPI.toggleLeadStatus(leadId, newStatus);
      loadAllLeads();
      alert(`Lead ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      alert(err.message || 'Failed to update lead status');
      console.error('Error toggling lead status:', err);
    }
  };

  const handleDeactivateWithReason = async (e) => {
    e.preventDefault();
    
    if (!deactivationReason.trim()) {
      alert('Please provide a reason for deactivation');
      return;
    }

    try {
      await leadsAPI.deactivateWithReason(deactivatingLead.id, { 
        reasonForDeactivation: deactivationReason 
      });
      
      setDeactivateModalOpen(false);
      setDeactivatingLead(null);
      setDeactivationReason('');
      loadAllLeads();
      alert('Lead deactivated successfully');
    } catch (err) {
      alert(err.message || 'Failed to deactivate lead');
      console.error('Error deactivating lead:', err);
    }
  };

  const openEditModal = (leadId) => {
    const lead = postedLeads.find(l => l.id === leadId);
    if (lead) {
      setEditingLead(lead);
      setFormData({
        title: lead.title || '',
        description: lead.description || '',
        image: lead.image || '',
        budget: lead.budget || '',
        quantity: lead.quantity || '',
        location: lead.location || ''
      });
      setEditModalOpen(true);
    }
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      budget: '',
      quantity: '',
      location: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Leads</h1>
          <p className="text-gray-600 mt-1">Manage your posted and consumed leads</p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-md"
        >
          <Plus size={20} />
          <span>Post New Lead</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Leads</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={loadAllLeads}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('posted')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'posted'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText size={18} />
          <span>Posted Leads ({postedLeads.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('consumed')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'consumed'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Eye size={18} />
          <span>Consumed Leads ({consumedLeads.length})</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'posted' ? "Search your leads..." : "Search consumed leads..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {activeTab === 'posted' && (
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Counter */}
      {(searchQuery || statusFilter !== 'all') && (
        <div className="mb-4 text-sm text-gray-600">
          {activeTab === 'posted' 
            ? `Showing ${filteredPostedLeads.length} of ${postedLeads.length} posted leads`
            : `Showing ${filteredConsumedLeads.length} of ${consumedLeads.length} consumed leads`
          }
        </div>
      )}

      {/* Leads Content */}
      <div className="space-y-6">
        {activeTab === 'posted' ? (
          // Posted Leads Tab
          filteredPostedLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || statusFilter !== 'all' ? 'No matching leads found' : 'No posted leads yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first lead to start connecting with potential partners'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Post Your First Lead
                </button>
              )}
              {(searchQuery || statusFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredPostedLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onDeleteLead={handleDeleteLead}
                onEditLead={openEditModal}
                onToggleStatus={handleToggleStatus}
                showCompanyInfo={false}
                showActions={true}
              />
            ))
          )
        ) : (
          // Consumed Leads Tab
          filteredConsumedLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Eye size={48} className="mx-auto mb-4 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No matching consumed leads found' : 'No consumed leads yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Start exploring leads from other companies to grow your business'
                }
              </p>
              {!searchQuery ? (
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Browse All Leads
                </button>
              ) : (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredConsumedLeads.map((consumedLead) => (
              <ConsumedLeadCard
                key={consumedLead.id}
                consumedLead={consumedLead}
              />
            ))
          )
        )}
      </div>

      {/* Create Lead Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          resetFormData();
        }}
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
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
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
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
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
                maxLength={20}
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
                maxLength={20}
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
              maxLength={50}
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
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setCreateModalOpen(false);
                resetFormData();
              }}
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

      {/* Edit Lead Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingLead(null);
          resetFormData();
        }}
        title="Edit Lead"
        size="lg"
      >
        <form onSubmit={handleEditLead} className="space-y-6">
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
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
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
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
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
                maxLength={20}
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
                maxLength={20}
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
              maxLength={50}
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
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setEditModalOpen(false);
                setEditingLead(null);
                resetFormData();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Update Lead
            </button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Lead Modal */}
      <Modal
        isOpen={deactivateModalOpen}
        onClose={() => {
          setDeactivateModalOpen(false);
          setDeactivatingLead(null);
          setDeactivationReason('');
        }}
        title="Deactivate Lead"
        size="md"
      >
        <form onSubmit={handleDeactivateWithReason} className="space-y-4">
          <div className="flex items-center p-4 mb-4 text-orange-800 border border-orange-300 rounded-lg bg-orange-50">
            <svg className="flex-shrink-0 w-4 h-4 mr-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div className="text-sm font-medium">
              This will make your lead inactive and visible to you only.
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Please provide a reason for deactivating this lead:
          </p>
          
          <textarea
            value={deactivationReason}
            onChange={(e) => setDeactivationReason(e.target.value)}
            rows="4"
            placeholder="e.g., Lead requirement fulfilled, No longer needed, Found better option..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">{deactivationReason.length}/200 characters</p>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setDeactivateModalOpen(false);
                setDeactivatingLead(null);
                setDeactivationReason('');
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Deactivate Lead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyLeadsPage;