// src/Pages/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Briefcase, Building, CalendarDays, TrendingUp, 
  GraduationCap, Award, CheckCircle2, LogOut, XCircle, AlertTriangle
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) return null;

  const isProfessional = user.userType === 'professional';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Small delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      {/* Header with gradient */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Your professional identity on TrackHire</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Cover / Gradient Bar */}
        <div className="h-32 bg-gradient-to-r from-[#211f2f] to-[#918ca9] relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-xl">
              <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={14} className="text-gray-400" />
                <span className="text-gray-600">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isProfessional ? (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <Briefcase size={12} /> Working Professional
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                  <GraduationCap size={12} /> Fresher
                </span>
              )}
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isProfessional ? (
              <>
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="text-indigo-600" size={20} />
                    <h3 className="font-bold text-gray-800">Current Company</h3>
                  </div>
                  <p className="text-gray-900 font-medium text-lg">{user.company || 'Not specified'}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-indigo-600" size={20} />
                    <h3 className="font-bold text-gray-800">Current Role</h3>
                  </div>
                  <p className="text-gray-900 font-medium text-lg">{user.currentRole || 'Not specified'}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays className="text-indigo-600" size={20} />
                    <h3 className="font-bold text-gray-800">Experience</h3>
                  </div>
                  <p className="text-gray-900 font-medium text-lg">
                    {user.yearsExperience ? `${user.yearsExperience} years` : 'Not specified'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-5 border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="text-amber-600" size={20} />
                    <h3 className="font-bold text-gray-800">TrackHire Status</h3>
                  </div>
                  <p className="text-gray-700">Active job seeker</p>
                  <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle2 size={14} /> Profile complete
                  </div>
                </div>
              </>
            ) : (
              <div className="md:col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <GraduationCap size={28} className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">Fresh Graduate</h3>
                    <p className="text-gray-700 mt-1">
                      You're starting your career journey! TrackHire will help you organise every application, 
                      follow up on opportunities, and land your first job.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 size={16} /> Ready to kickstart your career
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`${!isProfessional && 'md:col-span-2'} bg-gray-50 rounded-xl p-5 border border-gray-200`}>
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={16} className="text-gray-500" />
                <h3 className="font-bold text-gray-800">Account Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Member since:</span> {new Date().toLocaleDateString()}</p>
                <p><span className="text-gray-500">Email verified:</span> <span className="text-green-600">Yes (simulated)</span></p>
              </div>
            </div>
          </div>

          {/* Divider before logout */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Profile details are managed during registration. Contact support to update information.
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => !isLoggingOut && setShowLogoutConfirm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-red-500 to-rose-500 flex items-center gap-2 text-white">
              <LogOut size={18} />
              <h3 className="text-lg font-bold">Confirm Logout</h3>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  Are you sure you want to sign out of TrackHire?
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  disabled={isLoggingOut}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Yes, Logout'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}