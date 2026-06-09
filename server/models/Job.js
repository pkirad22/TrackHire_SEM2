// models/Job.js

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  company: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  hrName: {
    type: String,
    default: ''
  },

  hrContact: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    default: 'Applied'
  },

  dateApplied: {
    type: String,
    required: true
  },

  interviewDate: {
  type: String,
  default: ''
},

  resumeName: {
    type: String,
    default: ''
  },

  notes: {
    type: String,
    default: ''
  },

  location: {
    type: String,
    default: 'Remote'
  },

  jobType: {
    type: String,
    default: 'Full-time'
  },

  referralUsed: {
    type: Boolean,
    default: false
  },

  referrerName: {
    type: String,
    default: ''
  },

  referrerRole: {
    type: String,
    default: ''
  },

  platformType: {
    type: String,
    default: 'Website'
  },

  platformName: {
    type: String,
    default: ''
  },

  isPinned: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);