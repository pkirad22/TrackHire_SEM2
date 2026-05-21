import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to match your backend port
});

// Automatically inject the JWT token into every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Change key name if you use something else
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Active Jobs Endpoints
export const fetchJobs = () => API.get('/jobs');
export const deleteJob = (id) => API.delete(`/jobs/${id}`); // Moves job to trash

// Trash Endpoints
export const fetchTrash = () => API.get('/trash');
export const restoreJob = (id) => API.post(`/trash/${id}/restore`);
export const permanentDeleteJob = (id) => API.delete(`/trash/${id}`);