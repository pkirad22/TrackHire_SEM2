const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  userType: {
    type: String,
    enum: ['fresher', 'professional'],
    required: true
  },

  company: {
    type: String,
    default: ''
  },

  yearsExperience: {
    type: Number,
    default: null
  },

  currentRole: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'User',
  UserSchema
);