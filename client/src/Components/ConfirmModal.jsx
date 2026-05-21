import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      
      {/* Ambient Glow Background behind the card */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[100px] opacity-40"></div>
      </div>

      {/* Modal Card content */}
      <div className="relative z-10 w-full max-w-md p-6 bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl">
        <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2>
        <p className="mb-6 text-gray-400">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors bg-gray-800 rounded-xl hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 text-sm font-medium text-white transition-all rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;