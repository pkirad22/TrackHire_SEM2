// src/Components/Sidebar.jsx
import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ListFilter, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import profileIcon from '../assets/profile_icon.png';
import logoVideo from '../assets/TrackHire_Logo.mp4';

export default function Sidebar() {
  const { user } = useAuth();  // get authenticated user data
  const videoRef = useRef(null);
  const playCount = useRef(0);

  const handleVideoEnded = () => {
    playCount.current += 1;
    if (playCount.current < 2 && videoRef.current) {
      videoRef.current.play();
    }
  };

  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`;

  // Determine what to show as subtitle in profile section
  const getProfileSubtitle = () => {
    if (!user) return 'Update Profile';
    if (user.userType === 'professional') {
      return user.currentRole || 'Professional';
    }
    return 'Fresher';
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
      {/* App Logo */}
      <Link to="/" className="h-16 flex items-center pl-2 pr-4 border-b border-gray-100 hover:bg-gray-50 transition-colors overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="h-16 w-auto object-contain scale-125 mix-blend-multiply origin-left -ml-4"
        >
          <source src={logoVideo} type="video/mp4" />
        </video>
      </Link>

      {/* Navigation Links */}
      <div className="p-4 space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          <LayoutDashboard size={20} />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>
        <NavLink to="/applications" className={navLinkClass}>
          <ListFilter size={20} />
          <span className="hidden md:block">Applications</span>
        </NavLink>
        <NavLink to="/trash" className={navLinkClass}>
          <Trash2 size={20} />
          <span className="hidden md:block">Trash</span>
        </NavLink>
      </div>

      {/* Bottom Profile Section (without logout) */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <Link to="/profile" className="flex items-center gap-3 group">
          <img
            src={profileIcon}
            alt="Profile"
            className="h-10 w-10 rounded-full bg-gray-100 object-cover p-1 group-hover:ring-2 ring-indigo-200 transition-all"
          />
          <div className="hidden md:block overflow-hidden">
            <p className="text-md font-bold text-gray-900 truncate">
              {user?.name || 'Unknown User'}
            </p>
            <p className="text-md text-gray-500 truncate mt-0.5">
              {getProfileSubtitle()}
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
}