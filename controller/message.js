const Student = require('../models/students');
const twilio = require('twilio');

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken);


module.exports.sendMessage = function (req, res) {
    const { recepient, memberEmail} = req.query;
    console.log(req)    
    Student.findOne({ email: memberEmail }, function (err, user) {
      if (err) {
        console.log("Cannot find the student", err);
        return res.status(400).json({
            message: 'Cannot find student.'
        });
      }
      const textmessage= `Hey , ${user.firstName} ${user.lastName} has expressed interest in your group. You may reach out to her at ${user.phoneNumber} or ${user.email}.`
      if(user){
        
        // const { recepient} = req.query;
        //send text
        client.messages
          .create({
            body: textmessage,
            to:  `+91${recepient}`,
            from: `${process.env.twilioNumber}`
            // from: '+18647277013',
            
          })
          .then((message) => console.log(message.body));
      }
    });
  };
  