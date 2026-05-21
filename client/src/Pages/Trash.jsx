// src/Pages/Trash.jsx

import React, { useState } from 'react';

import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  Settings2,
  Building2,
  CalendarX2,
  Clock3
} from 'lucide-react';

import TrashSettingsModal from '../Components/TrashSettingsModal';

const Trash = ({
  trashJobs = [],
  restoreJob,
  permanentDeleteJob,
  retention,
  setRetention
}) => {

  const [isSettingsOpen, setIsSettingsOpen] =
    useState(false);

  // ─────────────────────────────────────────────
  // DAYS REMAINING
  // ─────────────────────────────────────────────

  const getDaysRemaining = (
    deletedAtDate
  ) => {

    const deleteDate =
      new Date(deletedAtDate);

    const now =
      new Date();

    const diffTime =
      now - deleteDate;

    const daysPassed =
      Math.floor(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

    const remaining =
      retention - daysPassed;

    return remaining > 0
      ? remaining
      : 0;
  };

  // ─────────────────────────────────────────────
  // EMPTY TRASH UI
  // ─────────────────────────────────────────────

  return (

    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">

            <Trash2
              className="text-rose-500"
              size={24}
            />

            Trash

          </h1>

          <p className="text-gray-500 text-sm mt-1">

            Deleted applications stay here for{" "}

            <span className="font-bold text-indigo-600">

              {retention} days

            </span>

            {" "}before permanent deletion.

          </p>

        </div>

        <button
          onClick={() =>
            setIsSettingsOpen(true)
          }
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >

          <Settings2 size={16} />

          Retention Settings

        </button>

      </div>

      {/* EMPTY STATE */}
      {trashJobs.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">

          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">

            <Trash2
              size={32}
              className="text-gray-300"
            />

          </div>

          <h3 className="text-lg font-bold text-gray-700 mb-1">

            Your trash is empty

          </h3>

          <p className="text-gray-500 text-sm">

            No deleted applications found.

          </p>

        </div>

      ) : (

        <div className="grid gap-4">

          {trashJobs.map((job) => {

            const daysRemaining =
              getDaysRemaining(
                job.deletedAt
              );

            const isExpiringSoon =
              daysRemaining <= 3;

            return (

              <div
                key={job._id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all"
              >

                {/* LEFT SIDE */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3 mb-2">

                    <h3 className="text-xl font-bold text-gray-900">

                      {job.role}

                    </h3>

                    {isExpiringSoon && (

                      <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">

                        <AlertTriangle size={12} />

                        Expires in {daysRemaining}{" "}
                        {daysRemaining === 1
                          ? 'day'
                          : 'days'}

                      </span>

                    )}

                  </div>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">

                    {/* COMPANY */}
                    <span className="flex items-center gap-2">

                      <Building2
                        size={16}
                        className="text-gray-400"
                      />

                      {job.company}

                    </span>

                    {/* DELETED DATE */}
                    <span className="flex items-center gap-2">

                      <CalendarX2
                        size={16}
                        className="text-gray-400"
                      />

                      Deleted on{" "}

                      {new Date(
                        job.deletedAt
                      ).toLocaleDateString()}

                    </span>

                    {/* DAYS LEFT */}
                    <span className="flex items-center gap-2 font-medium text-indigo-600">

                      <Clock3 size={16} />

                      {daysRemaining}{" "}
                      {daysRemaining === 1
                        ? 'day'
                        : 'days'}{" "}
                      remaining

                    </span>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                  {/* RESTORE */}
                  <button
                    onClick={() =>
                      restoreJob(job._id)
                    }
                    className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >

                    <RotateCcw size={16} />

                    Restore

                  </button>

                  {/* PERMANENT DELETE */}
                  <button
                    onClick={() =>
                      permanentDeleteJob(
                        job._id
                      )
                    }
                    className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >

                    <Trash2 size={16} />

                    Delete Forever

                  </button>

                </div>

              </div>

            );
          })}

        </div>

      )}

      {/* SETTINGS MODAL */}
      <TrashSettingsModal
        isOpen={isSettingsOpen}
        onClose={() =>
          setIsSettingsOpen(false)
        }
        currentRetention={retention}
        setRetention={setRetention}
      />

    </div>
  );
};

export default Trash;