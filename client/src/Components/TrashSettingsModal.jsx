import React from 'react';
import { Settings2, XCircle } from 'lucide-react';

const TrashSettingsModal = ({ isOpen, onClose, currentRetention, setRetention }) => {
  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedRetention = Number(formData.get('retention_period'));
    setRetention(selectedRetention);
    onClose();
  };

  const retentionOptions = [
    { label: '15 Days', value: 15, description: 'Quick cleanup for active job seekers.' },
    { label: '1 Month (30 Days)', value: 30, description: 'Standard retention period.' },
    { label: '3 Months (90 Days)', value: 90, description: 'Keep records for a full quarter.' },
    { label: '6 Months (180 Days)', value: 180, description: 'Maximum history retention.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-600">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings2 size={20} />
            Trash Settings
          </h3>
          <button 
            onClick={onClose} 
            className="text-indigo-100 hover:text-white transition-colors"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6">
          <p className="text-gray-500 text-sm mb-6 font-medium">
            Configure how long deleted applications remain in the trash before being permanently erased from TrackHire.
          </p>

          <div className="space-y-3 mb-6">
            {retentionOptions.map((option) => (
              <label 
                key={option.value} 
                className={`flex items-start gap-3 cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                  currentRetention === option.value 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="radio" 
                    name="retention_period" 
                    value={option.value} 
                    defaultChecked={currentRetention === option.value}
                    className="w-4 h-4 text-indigo-600 bg-white border-gray-300 focus:ring-indigo-500" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${currentRetention === option.value ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 font-medium">
                    {option.description}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all active:scale-95"
            >
              Save Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default TrashSettingsModal;