// src/components/StatusBadge.jsx
import React from 'react';
import { Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

// A reusable component just for rendering the colored status pill
export default function StatusBadge({ status }) {
  // Define styles based on the status string
  const styles = {
    'Applied': 'bg-blue-100 text-blue-700 border-blue-200',
    'Screening': 'bg-purple-100 text-purple-700 border-purple-200',
    'Interview': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Offer': 'bg-green-100 text-green-700 border-green-200',
    'Rejected': 'bg-red-100 text-red-700 border-red-200',
    'Ghosted': 'bg-gray-100 text-gray-600 border-gray-200',
  };

  // Define icons for each status
  const icons = {
    'Applied': <Clock size={14} className="mr-1" />,
    'Screening': <Search size={14} className="mr-1" />,
    'Interview': <AlertCircle size={14} className="mr-1" />,
    'Offer': <CheckCircle2 size={14} className="mr-1" />,
    'Rejected': <XCircle size={14} className="mr-1" />,
    'Ghosted': <Clock size={14} className="mr-1" />,
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['Applied']}`}>
      {icons[status]}
      {status}
    </span>
  );
}