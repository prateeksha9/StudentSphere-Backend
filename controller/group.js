const Group = require ('../models/group');
const Student = require('../models/students')

module.exports.createGroup = function(req, res){
    console.log("########################33", req.body.adminEmail, req.body.groupName)
    Student.findOne({email: req.body.adminEmail}, function(err,user){
        if(err){
            console.log("Cannot find student",err);
            return res.status(500).json({
                message: 'Student not found'
            })
        }

        if(user){
            console.log(user._id , "FDDFFFDFDFDFFDFFD")
            Group.findOne({name: req.body.groupName},function(err, group){
                if(err){
                    console.log("Cannot create group",err);
                    return res.status(500).json({
                    message: 'Student not found'
                    })
                }

                if(!group){
                    Group.create(
                        {name : req.body.groupName,
                        admin: user._id},
                        function(err,group){
                            
                            if(err){
                                console.log("cannot create group")
                                return res.status(400).json({
                                    message:"cannot create group"
                                });
                            }

                            Student.findByIdAndUpdate({_id: user._id}, {$push:{group: [group._id], function(err, updatedStudent){
                                if(err){
                                    console.log("Can't update student", err)
                                    return res.status(500).json({
                                        message: "Can't update student"
                                    })
                                }

                                console.log("Student Updated")
                                // return res.status(200).json({
                                //     message: "Student Update Successfully"
                                // })
                            }}})

                            console.log("group created successfully")
                            return res.status(200).json({
                                message: "Group created successfully."
                            })
                        }
                    )

                } else{
                    console.log("Group already exist")
                    return res.status(400).json({
                        message : 'Group already exists'
                    })
                }
            })

        }
    })
}


module.exports.addMember = function(req,res){
    console.log(req.body.id, "jfdhvfiudhvurfguhgfgshvfnkjvgfdk")
    Student.findOne({email: req.body.memberEmail}, function(err, student){
        if(err){
            console.log("problem nav through Student", err)
            return res.status(400).json({
                messsage: "problem nav through Student"
            })
        }
        console.log(student.group)
        if(student.group.includes(req.body.id)){
            console.log("Already added in group")
            return res.status(200).json({
                messsage: "Already in group"
            })

        } else {
            Student.updateOne({email : req.body.memberEmail}, {$push:{group: [req.body.id]}}, function(err,student){
                if(err){
                    console.log("Student not found", err);
                    return res.status(400).json({
                        message: "Student not registered"
                    })
                }
                
                // student.save();
                Group.findByIdAndUpdate({_id: req.body.id}, {$push: {members: [student._id]}}, function(err, group){
                    if(err){
                        console.log("Student not added to group", err);
                        return res.status(404).json({
                            message: "Student not added to group"
                        })
                    }
                    // group.save()
                    return res.status(200).json({
                        message: "Student added to group"
                    })
                },
                )
                
            })
        }
    })


    
}


module.exports.showAllGroups = async (req, res) => {
    try {
      // finding all the questions and returning
    //   console.log(req.params.id)
      let group = await Group.find().populate({
        path: "admin",
        // path: "members"
      });
  
      if (group) {
        return res.status(200).json({
          message: "Here are the groups",
          data: group,
        });
      } else {
        return res.status(500).json({
          message: "Groups does not does not exist",
        });
      }
    } catch (err) {
        console.log(err)
      return res.status(400).json({
        message: "Error from the server ",
        data: err,
      });
    }
  };


