const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  }
});

module.exports = mongoose.models.Email || mongoose.model('Email', emailSchema);