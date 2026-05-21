// src/Pages/Dashboard.jsx

import React, {
  useMemo
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  Briefcase,
  User,
  CheckCircle2,
  Clock,
  Pin,
  CalendarDays,
  AlertCircle,
  ArrowUpRight,
  Timer,
  Info,
  ScanSearch,
  LogIn
} from 'lucide-react';

import heroImg from '../assets/hero_img.png';

export default function Dashboard({

  jobs = []

}) {

  const navigate =
    useNavigate();

  // ─────────────────────────────────────────────
  // LOGIN CHECK
  // ─────────────────────────────────────────────

  const token =
    localStorage.getItem(
      'trackhireToken'
    );

  const isLoggedIn =
    !!token;

  // ─────────────────────────────────────────────
  // GENERAL STATS
  // ─────────────────────────────────────────────

  const stats = useMemo(() => {

    return {

      total:
        jobs.length,

      active:
        jobs.filter((j) =>
          [
            'Applied',
            'Screening',
            'Interview',
          ].includes(j.status)
        ).length,

      interviews:
        jobs.filter(
          (j) =>
            j.status ===
            'Interview'
        ).length,

      offers:
        jobs.filter(
          (j) =>
            j.status ===
            'Offer'
        ).length,

      pinned:
        jobs.filter(
          (j) =>
            j.isPinned
        ).length,
    };

  }, [jobs]);

  // ─────────────────────────────────────────────
  // ACTION RADAR
  // ─────────────────────────────────────────────

  const actionRadar =
    useMemo(() => {

      const today =
        new Date();

      const upcomingInterviews =
        jobs.filter(
          (j) =>
            j.status ===
            'Interview'
        );

      const followUpsNeeded =
        jobs
          .filter((j) => {

            if (
              j.status !==
              'Applied'
            )
              return false;

            const appliedDate =
              new Date(
                j.dateApplied
              );

            const diffTime =
              Math.abs(
                today -
                appliedDate
              );

            const diffDays =
              Math.ceil(
                diffTime /
                (1000 *
                  60 *
                  60 *
                  24)
              );

            return (
              diffDays >= 7
            );
          })

          .map((j) => {

            const appliedDate =
              new Date(
                j.dateApplied
              );

            const diffDays =
              Math.ceil(
                Math.abs(
                  today -
                  appliedDate
                ) /
                (1000 *
                  60 *
                  60 *
                  24)
              );

            return {
              ...j,
              daysWaiting:
                diffDays,
            };
          })

          .sort(
            (a, b) =>
              b.daysWaiting -
              a.daysWaiting
          );

      return {
        upcomingInterviews,
        followUpsNeeded,
      };

    }, [jobs]);

  return (

    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500 pb-10">

      {/* HERO SECTION */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row bg-gradient-to-b md:bg-gradient-to-r from-indigo-900 to-white">

        <div className="absolute top-0 left-0 -mt-10 -ml-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl z-0 pointer-events-none"></div>

        {/* LEFT CONTENT */}
        <div className="md:w-7/12 p-6 md:p-8 lg:p-10 flex flex-col justify-center text-white relative z-10">

          <div className="flex flex-col gap-5 items-start">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">

              <span className="inline-flex items-center gap-3">

                YOUR JOB HUNT

                <ScanSearch
                  className="h-[1em] w-[1em] text-white"
                  strokeWidth={3}
                />

              </span>

              <br />

              ORGANIZED

              <br />

              SIMPLIFIED

            </h1>

            <p className="text-indigo-100 max-w-lg text-sm md:text-base leading-relaxed">

              Track applications,
              interviews, follow-ups,
              offers and deadlines —
              everything in one smart
              dashboard.

            </p>

            {/* BUTTON ONLY FOR LOGGED OUT USERS */}
            {!isLoggedIn && (

              <button

                onClick={() => {

                  navigate('/login');

                }}

                className="bg-gray-950 hover:bg-black text-white px-6 py-3 text-sm md:text-base rounded-xl font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
              >

                <LogIn
                  size={16}
                  className="text-pink-300 group-hover:scale-110 transition-transform"
                />

                Get Started!

              </button>

            )}

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-5/12 p-6 md:p-8 flex items-center justify-center relative z-10">

          <img
            src={heroImg}
            alt="TrackHire Job Application Tracking"
            className="w-full h-auto max-w-[350px] md:max-w-none md:max-h-[260px] lg:max-h-[310px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />

        </div>

      </div>

      {/* SHOW STATS ONLY IF LOGGED IN */}
      {isLoggedIn && (

        <>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {/* TOTAL */}
            <div
              onClick={() =>
                navigate('/applications')
              }
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">

                    Total Applied

                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-1">

                    {stats.total}

                  </h3>

                </div>

                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">

                  <Briefcase
                    size={20}
                  />

                </div>

              </div>

            </div>

            {/* ACTIVE */}
            <div
              onClick={() =>
                navigate('/applications')
              }
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">

                    Active

                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-1">

                    {stats.active}

                  </h3>

                </div>

                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">

                  <Clock
                    size={20}
                  />

                </div>

              </div>

            </div>

            {/* INTERVIEWS */}
            <div
              onClick={() =>
                navigate('/applications')
              }
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">

                    Interviews

                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-1">

                    {stats.interviews}

                  </h3>

                </div>

                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">

                  <User
                    size={20}
                  />

                </div>

              </div>

            </div>

            {/* OFFERS */}
            <div
              onClick={() =>
                navigate('/applications')
              }
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">

                    Offers

                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-1">

                    {stats.offers}

                  </h3>

                </div>

                <div className="p-2 bg-green-50 text-green-600 rounded-lg">

                  <CheckCircle2
                    size={20}
                  />

                </div>

              </div>

            </div>

            {/* PINNED */}
            <div
              onClick={() =>
                navigate('/applications')
              }
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">

                    Pinned

                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-1">

                    {stats.pinned}

                  </h3>

                </div>

                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">

                  <Pin
                    size={20}
                    className="fill-pink-600 text-pink-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ACTION RADAR */}
          <div className="mt-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight">

                Action Radar

              </h2>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* INTERVIEW PANEL */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col relative group">

                <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-white border-b border-gray-100 flex justify-between items-center rounded-t-2xl">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={18}
                      className="text-yellow-600"
                    />

                    <h3 className="font-bold text-gray-800">

                      Upcoming Interviews

                    </h3>

                    <Info
                      size={15}
                      className="text-gray-400"
                    />

                  </div>

                  <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full">

                    {
                      actionRadar
                        .upcomingInterviews
                        .length
                    } Scheduled

                  </span>

                </div>

                <div className="p-4 flex-1 bg-gray-50/50 rounded-b-2xl">

                  {actionRadar
                    .upcomingInterviews
                    .length === 0 ? (

                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">

                      <CalendarDays
                        size={40}
                        className="opacity-20 mb-3"
                      />

                      <p className="text-sm font-medium">

                        No interviews scheduled yet.

                      </p>

                    </div>

                  ) : (

                    <div className="space-y-3">

                      {actionRadar.upcomingInterviews.map(
                        (job) => (

                          <div
                            key={job.id}
                            className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center"
                          >

                            <div>

                              <h4 className="font-bold text-gray-900 text-base">

                                {job.company}

                              </h4>

                              <p className="text-sm text-gray-500 mt-0.5">

                                {job.role}

                              </p>

                            </div>

                            <button className="h-10 w-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">

                              <ArrowUpRight
                                size={18}
                              />

                            </button>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </div>

              {/* FOLLOW UP PANEL */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col relative group">

                <div className="px-6 py-4 bg-gradient-to-r from-rose-50 to-white border-b border-gray-100 flex justify-between items-center rounded-t-2xl">

                  <div className="flex items-center gap-2">

                    <Timer
                      size={18}
                      className="text-rose-600"
                    />

                    <h3 className="font-bold text-gray-800">

                      Follow-Up Radar

                    </h3>

                  </div>

                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">

                    <AlertCircle
                      size={14}
                    />

                    {
                      actionRadar
                        .followUpsNeeded
                        .length
                    } Pending

                  </span>

                </div>

                <div className="p-4 flex-1 bg-gray-50/50 rounded-b-2xl">

                  {actionRadar
                    .followUpsNeeded
                    .length === 0 ? (

                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">

                      <CheckCircle2
                        size={40}
                        className="opacity-20 mb-3"
                      />

                      <p className="text-sm font-medium">

                        You're all caught up!

                      </p>

                    </div>

                  ) : (

                    <div className="space-y-3">

                      {actionRadar.followUpsNeeded.map(
                        (job) => (

                          <div
                            key={job.id}
                            className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center"
                          >

                            <div>

                              <div className="flex items-center gap-2">

                                <h4 className="font-bold text-gray-900 text-base">

                                  {job.company}

                                </h4>

                                <span className="text-[10px] uppercase tracking-wider font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-100">

                                  {job.daysWaiting} Days Ago

                                </span>

                              </div>

                              <p className="text-sm text-gray-500 mt-0.5">

                                {job.role}

                              </p>

                            </div>

                            <button className="h-10 w-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">

                              <ArrowUpRight
                                size={18}
                              />

                            </button>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}