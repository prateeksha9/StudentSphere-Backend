const express = require("express");
const router = express.Router();
const app = express();
console.log("router loaded");

router.use("/group", require("./group"));
router.use("/student", require("./student"));
router.use("/twilio", require("./message"))
module.exports = router;