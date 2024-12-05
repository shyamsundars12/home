const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/createFeedback", feedbackController.createFeedback);

router.post("/getFeedbackByCustId",feedbackController.getFeedbackByCustId);

router.post("/getFeedbackByEmpId",feedbackController.getFeedbackByEmpId);
router.post("/getFeedbackByOrderId",feedbackController.getFeedbackByOrderId);

router.post("/getFeedback", feedbackController.getFeedback);

router.post("/deleteFeedback", feedbackController.deleteFeedback);


module.exports = router