// src/Components/JobModal.jsx
import React, { useState, useEffect } from 'react';
import { XCircle, FileText, Briefcase, MapPin, Calendar, User, Building2, Link as LinkIcon, Smartphone, Globe, Sparkles } from 'lucide-react';
import Loader from './Loader';

export default function JobModal({ isOpen, onClose, onSubmit, initialData = null, isSaving }) {
  const [formData, setFormData] = useState({
    company: '', role: '', location: 'Remote', jobType: 'Full-time', 
    hrName: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], interviewDate: '',
    resumeName: '', referralUsed: false, referrerName: '', referrerRole: '',
    platformType: 'Website', platformName: ''
  });

  const [platformUsed, setPlatformUsed] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPlatformUsed(!!initialData.platformName);
    } else {
      setFormData({
        company: '', role: '', location: 'Remote', jobType: 'Full-time', 
        hrName: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0], interviewDate: '',
        resumeName: '', referralUsed: false, referrerName: '', referrerRole: '',
        platformType: 'Website', platformName: ''
      });
      setPlatformUsed(false);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fillPlatformSuggestion = (suggestion) => {
    setFormData({ ...formData, platformName: suggestion });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto"
      onClick={!isSaving ? onClose : undefined}
    >
      {/* Ambient glow behind modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full blur-[120px] opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-30" />
      </div>

      <div 
        className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden my-8 border border-white/20 transition-all duration-300 hover:shadow-indigo-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Futuristic Gradient Header with glass effect */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-300" />
                {initialData ? 'Edit Application' : 'Log New Application'}
              </h3>
              <p className="text-indigo-100 text-xs mt-1 opacity-80">Track every detail of your job hunt</p>
            </div>
            <button 
              onClick={onClose} 
              disabled={isSaving}
              className="text-white/80 hover:text-white transition-all disabled:opacity-50 p-1 rounded-full hover:bg-white/20"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>
        
        {/* Scrollable Form Body */}
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <fieldset disabled={isSaving} className="space-y-5">
              
              {/* Two-column layout with futuristic input groups */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Building2 size={12} /> Company
                  </label>
                  <input 
                    required type="text" placeholder="e.g. Google" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-indigo-300 disabled:bg-gray-100"
                    value={formData.company} 
                    onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase size={12} /> Role
                  </label>
                  <input 
                    required type="text" placeholder="e.g. SDE Intern" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-indigo-300 disabled:bg-gray-100"
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase size={12} /> Job Type
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all disabled:bg-gray-100"
                    value={formData.jobType} 
                    onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin size={12} /> Location
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all disabled:bg-gray-100"
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} /> Status
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all disabled:bg-gray-100"
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Ghosted">Ghosted</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} /> Date Applied
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all disabled:bg-gray-100"
                    value={formData.dateApplied} 
                    onChange={(e) => setFormData({...formData, dateApplied: e.target.value})} 
                  />
                </div>
              </div>

              {formData.status === 'Interview' && (
  <div className="space-y-1">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
      Interview Date
    </label>

    <input
      type="date"
      value={formData.interviewDate}
      onChange={(e) =>
        setFormData({
          ...formData,
          interviewDate: e.target.value
        })
      }
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
    />
  </div>
)}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <User size={12} /> HR Name
                  </label>
                  <input 
                    type="text" placeholder="e.g. John Doe" 
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all disabled:bg-gray-100"
                    value={formData.hrName} 
                    onChange={(e) => setFormData({...formData, hrName: e.target.value})} 
                  />
                </div>
               <div className="space-y-1">
  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
    <FileText size={12} /> Resume Used
  </label>

  <div className="relative">
    
    <input
      type="file"
      accept=".pdf"
      id="resumeUpload"
      className="hidden"
      onChange={(e) => {

        const file = e.target.files[0];

        if (file) {

          setFormData({
            ...formData,
            resumeName: file.name
          });
        }
      }}
    />

    <label
      htmlFor="resumeUpload"
      className="w-full flex items-center gap-3 pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition-all"
    >

      <FileText
        size={16}
        className="text-gray-400 absolute left-3"
      />

      <span className="text-sm text-gray-600 truncate">

        {formData.resumeName
          ? formData.resumeName
          : 'Upload Resume PDF'}

      </span>

    </label>

  </div>
</div>
              </div>

              {/* Referral Section with futuristic toggle */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer group mb-3">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-all group-hover:border-indigo-400"
                      checked={formData.referralUsed}
                      onChange={(e) => setFormData({...formData, referralUsed: e.target.checked})}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
                    I used a referral for this application
                  </span>
                </label>

                {formData.referralUsed && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-indigo-50/80 to-indigo-100/40 rounded-xl border border-indigo-200/50 shadow-inner animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Referrer Name</label>
                      <input 
                        type="text" placeholder="Name" 
                        className="w-full px-4 py-2 bg-white/70 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                        value={formData.referrerName} 
                        onChange={(e) => setFormData({...formData, referrerName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Referrer Role</label>
                      <input 
                        type="text" placeholder="e.g. Senior Dev" 
                        className="w-full px-4 py-2 bg-white/70 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                        value={formData.referrerRole} 
                        onChange={(e) => setFormData({...formData, referrerRole: e.target.value})} 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Platform Source Section – same design as referral but with chips */}
              <div className="pt-2 border-t border-gray-100 mt-4">
                <label className="flex items-center gap-2 cursor-pointer group mb-3">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all group-hover:border-indigo-400"
                    checked={platformUsed}
                    onChange={(e) => {
                      setPlatformUsed(e.target.checked);
                      if (!e.target.checked) {
                        setFormData({ ...formData, platformName: '', platformType: 'Website' });
                      }
                    }}
                  />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
                    Applied via a specific App or Website?
                  </span>
                </label>

                {platformUsed && (
                  <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50/80 to-indigo-100/40 rounded-xl border border-purple-200/50 shadow-inner animate-in fade-in slide-in-from-top-2">
                    <div>
                      <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-2">Platform Type</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="platformType"
                            value="Website"
                            checked={formData.platformType === 'Website'}
                            onChange={(e) => setFormData({ ...formData, platformType: e.target.value })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <Globe size={16} className="text-indigo-500" />
                          <span className="text-sm text-gray-700">Website</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="platformType"
                            value="App"
                            checked={formData.platformType === 'App'}
                            onChange={(e) => setFormData({ ...formData, platformType: e.target.value })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <Smartphone size={16} className="text-indigo-500" />
                          <span className="text-sm text-gray-700">App</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Platform Name</label>
                      <input
                        type="text"
                        placeholder="e.g. LinkedIn, Naukri, Indeed"
                        className="w-full px-4 py-2 bg-white/70 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                        value={formData.platformName}
                        onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-2">Quick Suggestions</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'LinkedIn', 'Naukri', 'Apna', 'Indeed', 'Internshala',
                          'Dice.com', 'FlexJobs', 'Monster / foundit', 'Glassdoor'
                        ].map(suggestion => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => fillPlatformSuggestion(suggestion)}
                            className="px-3 py-1.5 text-xs font-medium bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-full text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-all shadow-sm hover:shadow"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button with shimmer effect */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {isSaving ? (
                    <Loader color="bg-white" />
                  ) : (
                    <>
                      {initialData ? 'Update Log' : 'Add to TrackHire'}
                      <Sparkles size={16} className="ml-2 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}