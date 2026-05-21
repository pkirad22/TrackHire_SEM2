const mongoose = require('mongoose');

const TrashSchema = new mongoose.Schema({

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

  status: {
    type: String,
    default: 'Applied'
  },

  dateApplied: {
    type: String,
    required: true
  },

  resumeName: {
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

  deletedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'Trash',
  TrashSchema
);