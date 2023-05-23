const Student = require('../models/students');
module.exports.addStudent = function (req, res) {
    console.log(req)    
    Student.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log("Cannot find the student", err);
        return res.status(400).json({
            message: 'Cannot find student.'
        });
      }
  
      if (!user) {
        Student.create(
          {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            education : req.body.education,
            aspiration : req.body.aspiration,
            email : req.body.email,
            phoneNumber : req.body.phoneNumber,
            username: req.body.username,
          },
          function (err, user) {
            if (err) {
              console.log("student not registered.", err);
              return res.status(400).json({
                message: 'Cannot register student'
            });
            }
  
            console.log("Student Registered")
            return res.status(200).json({
                message: 'You are registered successfully.'
            });
          }
        );
      } else {
        console.log("Student is already registered on the portal.");
        return res.status(200).json({
            message: 'You are already registered on the portal.'
        });
      }
    });
  };
  