const express = require("express");
const addOnController = require("../controllers/addOnController");
const router = express.Router();


router.post("/addAddOns", addOnController.addAddOns);
router.post("/getAddOnById",addOnController.getAddOnById);
router.post("/getAddOnBySerId",addOnController.getAddOnBySerId);
router.post("/getAllItems",addOnController.getAllItems);
router.post("/removeAddOn",addOnController.removeAddOn);



module.exports = router