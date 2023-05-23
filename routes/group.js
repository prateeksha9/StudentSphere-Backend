const express = require("express");
const router = express.Router();
const app = express();
const groupController = require("../controller/group");

router.post("/createGroup", groupController.createGroup);
router.post("/addMember", groupController.addMember);
router.get("/getGroups", groupController.showAllGroups);
module.exports = router;