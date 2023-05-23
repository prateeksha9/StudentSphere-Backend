const express = require("express");
const router = express.Router();
const app = express();
const studentController = require("../controller/students");

router.post("/addStudent", studentController.addStudent);
module.exports = router;