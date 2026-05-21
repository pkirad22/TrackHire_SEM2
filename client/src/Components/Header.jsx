// src/Components/Header.jsx

import React from 'react';

import {
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  Plus,
  LogIn,
  UserPlus
} from 'lucide-react';

import logoVideo from '../assets/TrackHire_Logo.mp4';

export default function Header({

  totalJobs,

  onOpenModal,

  isLoggedIn = false

}) {

  const location = useLocation();

  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // HEADER TEXT
  // ─────────────────────────────────────────────
  let headerText = "";

  if (location.pathname === "/") {

    headerText = isLoggedIn ? (

      <span>
        Welcome back! You've applied to{" "}
        <strong className="text-gray-900">
          {totalJobs} jobs
        </strong>.
      </span>

    ) : (

      <span>
        Track and manage all your job applications in one place.
      </span>
    );

  } else if (
    location.pathname === "/applications"
  ) {

    headerText =
      "Manage your application history.";

  } else if (
    location.pathname === "/profile"
  ) {

    headerText =
      "Manage your personal settings.";
  }

  return (

    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">

      {/* MOBILE LOGO */}
      <div className="md:hidden flex items-center">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-10 w-auto rounded-md object-cover"
        >

          <source
            src={logoVideo}
            type="video/mp4"
          />

          Your browser does not support
          the video tag.

        </video>

      </div>

      {/* DESKTOP TEXT */}
      <div className="hidden md:block text-sm text-gray-500">

        {headerText}

      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-3">

        {/* IF USER LOGGED IN */}
        {isLoggedIn ? (

          <button
            onClick={onOpenModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
          >

            <Plus size={18} />

            <span className="hidden sm:inline">

              Log Application

            </span>

          </button>

        ) : (

          <>
            {/* LOGIN BUTTON */}
            <button
              onClick={() =>
                navigate('/login')
              }
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all"
            >

              <LogIn size={18} />

              <span>
                Login
              </span>

            </button>

            {/* REGISTER BUTTON */}
            <button
              onClick={() =>
                navigate('/register')
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-md"
            >

              <UserPlus size={18} />

              <span>
                Register
              </span>

            </button>
          </>
        )}

      </div>

    </header>
  );
}