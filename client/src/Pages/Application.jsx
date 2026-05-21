// src/Pages/Application.jsx
import React, { useState, useEffect, useRef } from 'react';
// IMPORT EDIT2 ICON
import { Search, Calendar, MoreVertical, Trash2, Edit, Pin, Filter, Eye, Edit2, Info } from 'lucide-react';
import StatusBadge from '../Components/StatusBadge';
import PreviewModal from '../Components/PreviewModal';
import Loader from '../Components/Loader';
// IMPORT THE NEW MODAL
import StatusProgressModal from '../Components/StatusProgressModal';

// Smart Truncation Component
const TruncatedText = ({ text, className }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  return (
    <div 
      ref={textRef} 
      className={`truncate block max-w-full ${className}`} 
      title={isTruncated ? text : undefined}
    >
      {text}
    </div>
  );
};

export default function Applications({ jobs, onEdit, onDelete, onTogglePin, deletingId, pinningId, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  
  // Modals States
  const [previewJob, setPreviewJob] = useState(null);
  const [loadingPreviewId, setLoadingPreviewId] = useState(null);
  // NEW: State to track which job's status is being edited
  const [editingStatusJobId, setEditingStatusJobId] = useState(null);

  // Filter States
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobType: 'All',
    status: 'All',
    dateRange: 'All'
  });

  const hasActiveFilters = filters.jobType !== 'All' || filters.status !== 'All' || filters.dateRange !== 'All';

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
      setIsFilterMenuOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPin = showPinnedOnly ? job.isPinned : true;
    const matchesJobType = filters.jobType === 'All' || job.jobType === filters.jobType;
    const matchesStatus = filters.status === 'All' || job.status === filters.status;

    let matchesDate = true;
    if (filters.dateRange !== 'All') {
       const jobDate = new Date(job.dateApplied);
       const today = new Date();
       const diffTime = Math.abs(today - jobDate);
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
       
       if (filters.dateRange === 'Past 7 Days') matchesDate = diffDays <= 7;
       if (filters.dateRange === 'Past 30 Days') matchesDate = diffDays <= 30;
       if (filters.dateRange === 'Past Year') matchesDate = diffDays <= 365;
    }

    return matchesSearch && matchesPin && matchesJobType && matchesStatus && matchesDate;
  });

  const clearFilters = () => {
    setFilters({ jobType: 'All', status: 'All', dateRange: 'All' });
    setIsFilterMenuOpen(false);
  };

  const handlePreviewClick = async (e, job) => {
    e.stopPropagation();
    setLoadingPreviewId(job._id);
    await new Promise(resolve => setTimeout(resolve, 800)); 
    setLoadingPreviewId(null);
    setPreviewJob(job);
  };

  // Find the job object currently being edited for status
  const jobBeingEditedForStatus = jobs.find(j => j._id === editingStatusJobId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Bar: Search & Toggles */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        {/* ... Search Bar (no changes) */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by company or role..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* ... Pin & Filter buttons (no changes) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setShowPinnedOnly(!showPinnedOnly)} className={`relative flex-1 md:flex-none px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all border shadow-sm ${showPinnedOnly ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            <Pin size={16} className={showPinnedOnly ? "fill-indigo-600 text-indigo-600" : ""} /> Pinned
            {showPinnedOnly && <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600 border-2 border-white"></span></span>}
          </button>
          <div className="relative flex-1 md:flex-none">
            <button onClick={(e) => { e.stopPropagation(); setIsFilterMenuOpen(!isFilterMenuOpen); setOpenDropdownId(null); }} className={`w-full px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all border shadow-sm relative ${hasActiveFilters || isFilterMenuOpen ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <Filter size={16} className={hasActiveFilters ? "text-indigo-600" : ""} /> Filters
              {hasActiveFilters && <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600 border-2 border-white"></span></span>}
            </button>
            {isFilterMenuOpen && ( <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-12 mt-1 w-72 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-50 p-5 animate-in fade-in slide-in-from-top-2"> <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2"> <h3 className="text-sm font-bold text-gray-800">Filter Applications</h3> {hasActiveFilters && ( <button onClick={clearFilters} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Clear All</button> )} </div> <div className="space-y-1.5 mb-4"><label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Type</label><select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" value={filters.jobType} onChange={(e) => setFilters({...filters, jobType: e.target.value})}><option value="All">All Types</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Internship">Internship</option><option value="Contract">Contract</option><option value="Freelance">Freelance</option></select></div> <div className="space-y-1.5 mb-4"><label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Application Status</label><select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}><option value="All">All Statuses</option><option value="Applied">Applied</option><option value="Screening">Screening</option><option value="Interview">Interview</option><option value="Offer">Offer</option><option value="Rejected">Rejected</option><option value="Ghosted">Ghosted</option></select></div> <div className="space-y-1.5 mb-2"><label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date Applied</label><select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" value={filters.dateRange} onChange={(e) => setFilters({...filters, dateRange: e.target.value})}><option value="All">Any Time</option><option value="Past 7 Days">Past 7 Days</option><option value="Past 30 Days">Past 30 Days</option><option value="Past Year">Past Year</option></select></div> </div> )}
          </div>
        </div>
      </div>

      {/* --- MODERN DATA TABLE --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full text-center border-collapse table-fixed">
            <thead>
              <tr className="bg-indigo-50/80 border-b border-indigo-100 text-xs uppercase tracking-wider text-indigo-700 font-bold">
                <th className="px-4 py-4 w-16 text-center">#</th>
                <th className="px-6 py-4 w-1/3 text-center">Company & Role</th>
                <th className="px-6 py-4 w-32 text-center">Job Type</th>
                {/* WIDENED STATUS COLUMN (w-44) */}
                <th className="px-6 py-4 w-44 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    Status
                    {/* Info Icon with Tooltip */}
                    <div className="relative group/tooltip flex items-center">
                      <Info size={14} className="text-indigo-300 hover:text-indigo-500 cursor-help transition-colors" />
                      
                      {/* UPDATED: Changed to top-full and mt-2 to drop DOWNWARDS */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-gray-900 text-white text-[11px] leading-relaxed rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[100] text-center shadow-xl font-medium normal-case tracking-normal">
                        Tracks your current stage in the hiring pipeline. <br/><br/>
                        <span className="text-indigo-300">Tip: Click the pencil icon next to any badge to open the interactive progress tracker and quickly advance your stage!</span>
                        
                        {/* UPDATED: Flipped the triangle to point UPWARDS (border-b-gray-900 and bottom-full) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                      </div>

                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 w-40 text-center">Date Applied</th>
                <th className="px-6 py-4 w-40 text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-medium">{(hasActiveFilters || showPinnedOnly) ? "No applications match your current filters." : "No applications found."}</td></tr>
              ) : (
                filteredJobs.map((job, index) => (
                  <tr key={job._id} className="even:bg-slate-50/70 hover:bg-indigo-50/40 transition-colors group divide-x divide-gray-50">
                    <td className="px-4 py-4 text-center text-sm font-semibold text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-center overflow-hidden">
                      <div className="flex items-center justify-center gap-2 max-w-full"><TruncatedText text={job.company} className="font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap" />{job.isPinned && (<Pin size={14} className="text-indigo-600 fill-indigo-600 flex-shrink-0" />)}</div>
                      <div className="max-w-full mx-auto flex justify-center mt-0.5"><TruncatedText text={job.role} className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap" /></div>
                    </td>
                    <td className="px-6 py-4 text-center"><span className="bg-white text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 shadow-sm inline-block truncate max-w-[100px]">{job.jobType || 'N/A'}</span></td>

                    {/* UPDATED STATUS CELL WITH EDIT ICON */}
                    {/* PERMANENTLY VISIBLE STATUS EDIT ICON */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <StatusBadge status={job.status} />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingStatusJobId(job._id); }} 
                          className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition-all focus:outline-none"
                          title="Edit Status"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center text-sm text-gray-600 font-medium"><div className="flex items-center justify-center gap-2"><Calendar size={14} className="text-gray-400 flex-shrink-0" /><span className="truncate">{job.dateApplied}</span></div></td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 relative">
                        {/* Preview, Actions Dropdown, Trash (no changes here) */}
                        <div className="relative group/preview flex items-center justify-center"> <button onClick={(e) => handlePreviewClick(e, job)} disabled={loadingPreviewId === job._id} className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm rounded-md transition-all focus:outline-none disabled:cursor-wait"> {loadingPreviewId === job._id ? <Loader color="bg-blue-600" size="h-1.5 w-1.5" /> : <Eye size={16} />} </button> {loadingPreviewId !== job._id && ( <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/preview:opacity-100 group-hover/preview:visible transition-all duration-200 z-50 text-center shadow-xl font-medium">Peek at full application details ✨<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div></div> )} </div> <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === job._id ? null : job._id); setIsFilterMenuOpen(false); }} className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-md transition-all focus:outline-none"> <MoreVertical size={16} /> </button> {openDropdownId === job._id && ( <div className="absolute right-12 top-0 mt-1 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}> <button onClick={() => { onEdit(job); setOpenDropdownId(null); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors font-medium"><Edit size={16} /> Edit Application</button> <button onClick={() => { onTogglePin(job._id); setOpenDropdownId(null); }} disabled={pinningId === job._id} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors border-t border-gray-50 font-medium disabled:opacity-50 disabled:cursor-wait"> {pinningId === job._id ? <Loader color="bg-indigo-600" size="h-1.5 w-1.5" /> : <Pin size={16} className={job.isPinned ? "fill-indigo-600 text-indigo-600" : ""} />} {pinningId === job._id ? "Updating..." : (job.isPinned ? "Unpin Application" : "Pin Application")} </button> <button onClick={() => { console.log(`Share feature coming soon`); setOpenDropdownId(null); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors border-t border-gray-50 font-medium"><Pin size={16} /> Share Application</button> </div> )} <button onClick={() => onDelete(job._id)} disabled={deletingId === job._id} className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:cursor-wait"> {deletingId === job._id ? <Loader color="bg-red-600" size="h-1.5 w-1.5" /> : <Trash2 size={16} />} </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PreviewModal job={previewJob} onClose={() => setPreviewJob(null)} />

      {/* NEW STATUS PROGRESS MODAL */}
      <StatusProgressModal 
        job={jobBeingEditedForStatus} 
        onClose={() => setEditingStatusJobId(null)} 
        onUpdate={(newStatus) => {
          onUpdate({ ...jobBeingEditedForStatus, status: newStatus });
          setEditingStatusJobId(null);
        }}
      />
    </div>
  );
}