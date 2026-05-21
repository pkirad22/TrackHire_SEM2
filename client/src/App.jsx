// src/App.jsx

import React, {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import JobModal from './Components/JobModal';
import ProtectedRoute from './Components/ProtectedRoute';
import DeleteConfirmModal from './Components/DeleteConfirmModal';

import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Application';
import Profile from './Pages/Profile';
import Trash from './Pages/Trash';
import Login from './Pages/Login';
import Register from './Pages/Register';

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

function MainApp() {

  const location =
    useLocation();

  const { user, logout } =
    useAuth();

  // ─────────────────────────────────────────────
  // HIDE HEADER / FOOTER / SIDEBAR
  // ─────────────────────────────────────────────

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';

  // ─────────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────────

  const [jobs, setJobs] =
    useState([]);

  const [trashJobs, setTrashJobs] =
    useState([]);

  const [trashRetention,
    setTrashRetention] =
    useState(30);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [editingJob,
    setEditingJob] =
    useState(null);

  const [isSaving,
    setIsSaving] =
    useState(false);

  const [deletingId,
    setDeletingId] =
    useState(null);

  const [pinningId,
    setPinningId] =
    useState(null);

  const [deleteConfirmJobId,
    setDeleteConfirmJobId] =
    useState(null);

  const [isDeleteConfirmOpen,
    setIsDeleteConfirmOpen] =
    useState(false);

  const [isDeletingConfirm,
    setIsDeletingConfirm] =
    useState(false);

  // ─────────────────────────────────────────────
  // FETCH JOBS + TRASH FROM MONGODB
  // ─────────────────────────────────────────────

  useEffect(() => {

    if (!user) {

      setJobs([]);
      setTrashJobs([]);

      return;
    }

    const fetchData =
      async () => {

        try {

          const token =
            localStorage.getItem(
              'trackhireToken'
            );

          const jobsRes =
            await axios.get(
              'http://localhost:5000/api/jobs',
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const trashRes =
            await axios.get(
              'http://localhost:5000/api/trash',
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setJobs(jobsRes.data);

          setTrashJobs(
            trashRes.data
          );

        } catch (err) {

          console.log(
            'Fetch Error:',
            err
          );
        }
      };

    fetchData();

  }, [user]);

  // ─────────────────────────────────────────────
  // TOGGLE PIN
  // ─────────────────────────────────────────────

  const handleTogglePin =
    async (id) => {

      try {

        setPinningId(id);

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        const job =
          jobs.find(
            (j) =>
              j._id === id
          );

        const res =
          await axios.put(

            `http://localhost:5000/api/jobs/${id}`,

            {
              isPinned:
                !job.isPinned
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setJobs(prevJobs =>
          prevJobs.map(job =>
            job._id === id
              ? res.data
              : job
          )
        );

      } catch (err) {

        console.log(err);

      } finally {

        setPinningId(null);
      }
    };

  // ─────────────────────────────────────────────
  // ADD JOB
  // ─────────────────────────────────────────────

  const handleAddJob =
    async (jobData) => {

      try {

        setIsSaving(true);

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        const res =
          await axios.post(

            'http://localhost:5000/api/jobs',

            jobData,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setJobs(prevJobs => [

          res.data,

          ...prevJobs
        ]);

        setIsModalOpen(false);

      } catch (err) {

        console.log(
          'Add Job Error:',
          err
        );

      } finally {

        setIsSaving(false);
      }
    };

  // ─────────────────────────────────────────────
  // UPDATE JOB
  // ─────────────────────────────────────────────

  const handleUpdateJob =
    async (updatedData) => {

      try {

        setIsSaving(true);

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        const res =
          await axios.put(

            `http://localhost:5000/api/jobs/${editingJob._id}`,

            updatedData,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setJobs(prevJobs =>
          prevJobs.map(job =>
            job._id ===
            editingJob._id
              ? res.data
              : job
          )
        );

        setEditingJob(null);

        setIsModalOpen(false);

      } catch (err) {

        console.log(
          'Update Error:',
          err
        );

      } finally {

        setIsSaving(false);
      }
    };

  // ─────────────────────────────────────────────
  // DELETE JOB
  // ─────────────────────────────────────────────

  const openDeleteConfirm =
    (id) => {

      setDeleteConfirmJobId(id);

      setIsDeleteConfirmOpen(true);
    };

  const handleConfirmDelete =
    async () => {

      try {

        if (!deleteConfirmJobId)
          return;

        setIsDeletingConfirm(true);

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        await axios.delete(

          `http://localhost:5000/api/jobs/${deleteConfirmJobId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setJobs(prevJobs =>
          prevJobs.filter(
            (job) =>
              job._id !==
              deleteConfirmJobId
          )
        );

        // REFRESH TRASH

        const trashRes =
          await axios.get(
            'http://localhost:5000/api/trash',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setTrashJobs(
          trashRes.data
        );

      } catch (err) {

        console.log(
          'Delete Error:',
          err
        );

      } finally {

        setIsDeletingConfirm(false);

        setIsDeleteConfirmOpen(false);

        setDeleteConfirmJobId(null);
      }
    };

  // ─────────────────────────────────────────────
  // RESTORE JOB
  // ─────────────────────────────────────────────

  const handleRestoreJob =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        const res =
          await axios.post(

            `http://localhost:5000/api/trash/${id}/restore`,

            {},

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setJobs(prevJobs => [

          res.data.restoredJob,

          ...prevJobs
        ]);

        setTrashJobs(prevTrash =>
          prevTrash.filter(
            (job) =>
              job._id !== id
          )
        );

      } catch (err) {

        console.log(
          'Restore Error:',
          err
        );
      }
    };

  // ─────────────────────────────────────────────
  // PERMANENT DELETE
  // ─────────────────────────────────────────────

  const handlePermanentDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            'trackhireToken'
          );

        await axios.delete(

          `http://localhost:5000/api/trash/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setTrashJobs(prevTrash =>
          prevTrash.filter(
            (job) =>
              job._id !== id
          )
        );

      } catch (err) {

        console.log(
          'Permanent Delete Error:',
          err
        );
      }
    };

  // ─────────────────────────────────────────────
  // MAIN RETURN
  // ─────────────────────────────────────────────

  return (

    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      {user && !isAuthPage && (

        <Sidebar onLogout={logout} />

      )}

      {/* MAIN */}
      <main
        className={`flex-1 flex flex-col ${
          user && !isAuthPage
            ? 'md:ml-64'
            : ''
        }`}
      >

        {/* HEADER */}
        {!isAuthPage && (

          <Header

            totalJobs={jobs.length}

            onOpenModal={() =>
              setIsModalOpen(true)
            }

            isLoggedIn={!!user}

          />

        )}

        {/* PAGE CONTENT */}
        <div className="flex-1">

          <Routes>

            <Route
  path="/"
  element={
    <ProtectedRoute>

      <Dashboard
        jobs={jobs}
      />

    </ProtectedRoute>
  }
/>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/applications"
              element={
                <ProtectedRoute>

                  <Applications
                    jobs={jobs}

                    onEdit={(job) => {

                      setEditingJob(job);

                      setIsModalOpen(true);
                    }}

                    onDelete={
                      openDeleteConfirm
                    }

                    onTogglePin={
                      handleTogglePin
                    }

                    deletingId={
                      deletingId
                    }

                    pinningId={
                      pinningId
                    }

                    onUpdate={
                      handleUpdateJob
                    }
                  />

                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trash"
              element={
                <ProtectedRoute>

                  <Trash

                    trashJobs={trashJobs}

                    restoreJob={
                      handleRestoreJob
                    }

                    permanentDeleteJob={
                      handlePermanentDelete
                    }

                    retention={
                      trashRetention
                    }

                    setRetention={
                      setTrashRetention
                    }

                  />

                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

        {/* FOOTER */}
        {!isAuthPage && (
          <Footer />
        )}

      </main>

      {/* JOB MODAL */}
      {user && !isAuthPage && (

        <JobModal

          isOpen={isModalOpen}

          onClose={() => {

            setIsModalOpen(false);

            setEditingJob(null);
          }}

          onSubmit={
            editingJob
              ? handleUpdateJob
              : handleAddJob
          }

          initialData={editingJob}

          isSaving={isSaving}
        />

      )}

      {/* DELETE CONFIRM */}
      <DeleteConfirmModal

        isOpen={isDeleteConfirmOpen}

        onClose={() =>
          setIsDeleteConfirmOpen(false)
        }

        onConfirm={
          handleConfirmDelete
        }

        isDeleting={
          isDeletingConfirm
        }

        jobTitle="this application"
      />

    </div>
  );
}

// ─────────────────────────────────────────────
// APP EXPORT
// ─────────────────────────────────────────────

export default function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <MainApp />

      </AuthProvider>

    </BrowserRouter>
  );
}