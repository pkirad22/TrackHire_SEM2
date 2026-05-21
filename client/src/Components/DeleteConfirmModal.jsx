// src/Components/DeleteConfirmModal.jsx
import React from 'react';
import { XCircle, AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, jobTitle, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={!isDeleting ? onClose : undefined}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Header (like StatusProgressModal) */}
        <div className="px-6 py-5 bg-gradient-to-r from-rose-600 to-rose-500 border-b border-rose-400 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <Trash2 size={22} />
            <h3 className="text-xl font-bold">Confirm Deletion</h3>
          </div>
          <button 
            onClick={onClose} 
            disabled={isDeleting}
            className="text-white/80 hover:text-white transition-colors disabled:opacity-50"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-rose-50 p-4 rounded-xl border border-rose-100">
            <AlertTriangle size={20} className="text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-800 font-medium">
                Move <span className="font-bold text-rose-600">{jobTitle}</span> to Trash?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This application will be moved to the Trash folder and automatically deleted after the retention period you set in Settings.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex items-center gap-2 border border-gray-100">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You can restore it anytime from the Trash section until it is permanently erased.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"
          >
            {isDeleting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Moving...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Move to Trash
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}