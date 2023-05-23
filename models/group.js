const mongoose = require('mongoose');

// Define the schema for groups
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Students'
    }
  ],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Create the group model
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
