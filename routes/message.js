const express = require("express");
const router = express.Router();
const app = express();
const messsageController = require("../controller/message");
const twilio = require('twilio');


router.get("/sendMessage", messsageController.sendMessage);
module.exports = router;