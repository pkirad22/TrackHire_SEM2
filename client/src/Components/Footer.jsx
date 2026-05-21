// src/Components/Footer.jsx
import React from 'react';

// Import the SVG icons
import emailIcon from '../assets/email_icon.png';
import facebookIcon from '../assets/facebook_icon.svg';
import instagramIcon from '../assets/instagram_icon.svg';
import twitterIcon from '../assets/twitter_icon.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 1. The Gradient: Fades from a dark slate at the bottom, through white, to white
    <footer className="w-full bg-gradient-to-t from-indigo-900/40 via-white to-white py-4 mt-auto relative overflow-hidden border-t border-gray-200">
      
      {/* 2. The Emission Source: A solid dark bar at the absolute bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 opacity-80"></div> */}

      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        
        {/* Brand/Trademark Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2.5 group">
            <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform">
              T
            </div>
            {/* Back to dark text for the white theme */}
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">
              TrackHire<sup className="text-[10px] ml-0.5 text-gray-500 font-bold">TM</sup>
            </span>
          </div>
          <p className="text-[12px] text-slate-900 mt-0.5 font-medium tracking-wide">
            Organizing your job search journey. &copy; {currentYear}
          </p>
        </div>

        {/* Social Media Links Section */}
        <div className="flex items-center gap-6">
          {/* Icons are kept large (h-7 w-7). 
            Removed the invert filter so they remain dark on the white background.
          */}
          <a href="#" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <img src={emailIcon} alt="Email" className="h-9 w-9 object-contain drop-shadow-sm" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <img src={twitterIcon} alt="Twitter" className="h-9 w-9 object-contain drop-shadow-sm" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <img src={facebookIcon} alt="Facebook" className="h-9 w-9 object-contain drop-shadow-sm" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <img src={instagramIcon} alt="Instagram" className="h-9 w-9 object-contain drop-shadow-sm" />
          </a>
        </div>

      </div>
    </footer>
  );
}