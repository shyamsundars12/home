const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");


router.post("/validate", loginController.validateUser);
router.post("/checkExists", loginController.checkExists);
module.exports = router