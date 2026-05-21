// src/Components/PreviewModal.jsx
import React, { useEffect } from 'react';
import { X, MapPin, Briefcase, Calendar, User, FileText, Handshake, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function PreviewModal({ job, onClose }) {
  
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!job) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
         {/* Futuristic Header with Gradient and Glassmorphism */}
         <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white sticky top-0 z-10">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
            <div className="flex items-center gap-4 mt-2">
               <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                 <Building2 size={32} className="text-white" />
               </div>
               <div>
                 <h2 className="text-3xl font-black tracking-tight">{job.company}</h2>
                 <p className="text-indigo-100 font-medium text-lg mt-1">{job.role}</p>
               </div>
            </div>
         </div>

         {/* Scrollable Body */}
         <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
           <div className="p-8 space-y-8">
              {/* Top Stats Bar */}
              <div className="flex flex-wrap gap-4 items-center justify-between pb-6 border-b border-gray-100">
                 <div className="flex flex-col gap-1">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                   <StatusBadge status={job.status} />
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date Applied</span>
                   <div className="flex items-center gap-1.5 text-gray-700 font-medium bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                     <Calendar size={14} className="text-indigo-500" />
                     {job.dateApplied}
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Type</span>
                   <div className="flex items-center gap-1.5 text-gray-700 font-medium bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                     <Briefcase size={14} className="text-indigo-500" />
                     {job.jobType || 'N/A'}
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</span>
                   <div className="flex items-center gap-1.5 text-gray-700 font-medium bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                     <MapPin size={14} className="text-indigo-500" />
                     {job.location || 'N/A'}
                   </div>
                 </div>
              </div>

              {/* Grid Detail Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* HR & Resume */}
                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                       <User size={16} className="text-indigo-600" /> Application Details
                    </h4>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">HR / Recruiter Name</p>
                      <p className="text-gray-800 font-medium mt-0.5">{job.hrName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Resume Used</p>
                      <div className="flex items-center gap-2 mt-1.5 text-indigo-700 font-medium bg-indigo-50 w-fit px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm">
                         <FileText size={14} />
                         {job.resumeName || 'Default Resume'}
                      </div>
                    </div>
                 </div>

                 {/* Referral Info */}
                 <div className={`rounded-xl p-5 border transition-colors ${job.referralUsed ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                       <Handshake size={16} className={job.referralUsed ? "text-blue-600" : "text-gray-400"} /> Referral Information
                    </h4>
                    {job.referralUsed ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-blue-500 uppercase">Referrer Name</p>
                          <p className="text-gray-800 font-medium mt-0.5">{job.referrerName || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-500 uppercase">Referrer Role</p>
                          <p className="text-gray-800 font-medium mt-0.5">{job.referrerRole || 'N/A'}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center text-center text-gray-400 pb-4">
                         <p className="text-sm">No referral used for this application.</p>
                      </div>
                    )}
                 </div>

                 {/* Platform Source Section (only if platformName exists) */}
                 {job.platformName && (
                   <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
                     <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                       {job.platformType === 'App' ? '📱' : '🌐'} Platform Source
                     </h4>
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase">Type</p>
                       <p className="text-gray-800 font-medium mt-0.5">{job.platformType || 'Website'}</p>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase">Platform Name</p>
                       <div className="flex items-center gap-2 mt-1.5 text-indigo-700 font-medium bg-indigo-50 w-fit px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm">
                         {job.platformType === 'App' ? '📱' : '🌐'} {job.platformName}
                       </div>
                     </div>
                   </div>
                 )}
              </div>
           </div>
         </div>
      </div>
    </div>
  );
}