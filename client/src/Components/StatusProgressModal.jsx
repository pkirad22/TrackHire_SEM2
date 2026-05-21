// src/Components/StatusProgressModal.jsx
import React, { useState, useEffect } from 'react';
// IMPORT A LOT OF ICONS
import { X, XCircle, Send, Users, CalendarDays, Award, XOctagon, Ghost, AlertTriangle } from 'lucide-react';
// Status Workflow for a job seeker
const steps = [
  { status: 'Applied', icon: Send, label: 'Applied' },
  { status: 'Screening', icon: Users, label: 'Screening' },
  { status: 'Interview', icon: CalendarDays, label: 'Interview' },
  { status: 'Offer', icon: Award, label: 'Offer' }
];

// Terminal outcome statuses
const terminalOutcomes = [
  { status: 'Rejected', icon: XOctagon, label: 'Mark as Rejected', color: 'text-red-600', hover: 'hover:bg-red-50' },
  { status: 'Ghosted', icon: Ghost, label: 'Mark as Ghosted', color: 'text-purple-600', hover: 'hover:bg-purple-50' }
];

export default function StatusProgressModal({ job, onClose, onUpdate }) {
  // Store the pending status before confirmation
  const [pendingStatus, setPendingStatus] = useState(null);
  // Confirmation state
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Reset state when job changes
    setPendingStatus(job?.status || null);
    setShowConfirm(false);
  }, [job]);

  if (!job) return null;

  // Find index of current and pending status in the active workflow
  const currentStepIndex = steps.findIndex(step => step.status === job.status);
  const pendingStepIndex = steps.findIndex(step => step.status === pendingStatus);

  // Helper to handle applying a new status (triggers confirmation)
  const handleApplyStatus = (newStatus) => {
    if (newStatus !== job.status) {
      setPendingStatus(newStatus);
      setShowConfirm(true); // Open inner confirmation
    }
  };

  // Main UI
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        
        {/* Fututistic Gradient Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-gray-900 to-slate-800 border-b border-gray-800 flex justify-between items-center text-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold">Edit Application Status</h3>
            <p className="text-sm text-gray-400 mt-0.5">{job.company} — {job.role}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <XCircle size={24} />
          </button>
        </div>

        {/* Body Container */}
        <div className="p-8 space-y-10">
          
          {/* Section 1: Active Application Workflow - Modern Rounded Stepper */}
          <div className="space-y-4">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <AlertTriangle size={14} className="text-indigo-400" /> Linear Path to Offer
             </h4>
             
             <div className="relative pt-6">
               {/* Rounded Background Track */}
               <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden border border-gray-200">
                 {/* Current Progress Fill */}
                 <div 
                   className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                   style={{ 
                     width: currentStepIndex >= 0 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '0%' 
                   }}
                 ></div>
               </div>

               {/* Interactive Step Circles */}
               <div className="relative flex justify-between items-center z-10">
                 {steps.map((step, index) => {
                   const Icon = step.icon;
                   const isCompleted = index <= currentStepIndex;
                   const isCurrent = index === currentStepIndex;
                   const isUpcoming = index > currentStepIndex;

                   return (
                     <div key={step.status} className="flex flex-col items-center gap-3">
                       {/* Circular Node Button */}
                       <button 
                         onClick={() => isUpcoming && handleApplyStatus(step.status)}
                         disabled={!isUpcoming}
                         className={`h-12 w-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 transform group ${
                           isCompleted ? 'bg-indigo-600 border-indigo-200' : 'bg-gray-100 border-gray-200'
                         } ${isUpcoming ? 'hover:scale-110 hover:border-indigo-400 hover:bg-white' : 'cursor-default'} relative`}
                       >
                         {/* Centered Icon */}
                         <Icon size={18} className={`${isCompleted ? 'text-indigo-50' : 'text-gray-500'}`} />
                         
                         {/* Optional Glow/Indicator for current stage */}
                         {isCurrent && (
                           <span className="absolute inset-0 rounded-full animate-ping bg-indigo-200 opacity-60"></span>
                         )}
                         
                         {/* Tooltip on upcoming steps */}
                         {isUpcoming && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Upgrade to {step.label}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                         )}
                       </button>
                       {/* Label Below circle */}
                       <span className={`text-xs font-bold tracking-tight ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                         {step.label}
                       </span>
                     </div>
                   );
                 })}
               </div>
             </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 2: Terminal Outcome Buttons (Glassy Style) */}
          <div className="space-y-4">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <X size={14} className="text-gray-400" /> Terminal Outcomes
             </h4>
             <div className="grid grid-cols-2 gap-6 pt-2">
               {terminalOutcomes.map(outcome => {
                  const Icon = outcome.icon;
                  return (
                    <button 
                      key={outcome.status} 
                      onClick={() => handleApplyStatus(outcome.status)}
                      disabled={job.status === outcome.status}
                      className={`p-6 border rounded-2xl flex items-center gap-5 transition-all ${
                        job.status === outcome.status 
                          ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                          : `bg-gray-50/50 border-gray-100 ${outcome.hover} hover:shadow-lg hover:-translate-y-0.5`
                      }`}
                    >
                      <div className={`p-3 rounded-full bg-white border border-gray-100 shadow-inner ${outcome.color}`}>
                        <Icon size={22} />
                      </div>
                      <div className="text-left">
                        <span className={`text-sm font-bold tracking-tight ${job.status === outcome.status ? 'text-gray-400' : 'text-gray-900'}`}>
                          {outcome.label}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Application is finished</p>
                      </div>
                    </button>
                  );
               })}
             </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* --- INNER CONFIRMATION MODAL --- */}
        {showConfirm && (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowConfirm(false)} // Click outside closes confirm
          >
            <div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()} // Clicking inside confirm doesn't close
            >
              <h5 className="text-lg font-bold text-gray-900">Confirm Status Change</h5>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Do you really want to edit application for <span className="font-semibold text-indigo-700">{job.company}</span> from <span className="font-semibold">{job.status}</span> to <span className="font-semibold text-pink-600">{pendingStatus}</span>?
              </p>
              <div className="pt-6 flex justify-end gap-3 border-t border-gray-100 mt-5">
                <button 
                  onClick={() => setShowConfirm(false)} 
                  className="px-5 py-2 text-sm text-gray-600 font-bold hover:text-gray-900 transition-colors"
                >
                  No, Go Back
                </button>
                <button 
                  onClick={() => {
                    // APPLY CHANGE and CLOSE BOTH MODALS
                    onUpdate(pendingStatus);
                  }} 
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md active:scale-95"
                >
                  Yes, Apply Change
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}