const mongoose = require('mongoose');

// Define the schema for student registration
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  education:{
    type: String,
    required: true,
    unique: true
  },
  aspiration:{
    type: String,
    required: true,
    unique: true
  },
  // dateOfBirth: {
  //   type: Date,
  //   required: true
  // },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  group: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  }],
  dateRegistered: {
    type: Date,
    default: Date.now
  },
});

// Create the student model
const Students = mongoose.model('Students', studentSchema);

module.exports = Students;
