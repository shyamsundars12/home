const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


router.post("/createOrder", orderController.createOrder);
router.post("/checkAvailability", orderController.checkAvailability);

router.post("/getOrder", orderController.getOrder);
router.post("/getOrderById", orderController.getOrderById);
router.post("/getOrderByCustId", orderController.getOrderByCustId);
// router.post("/getOrderByEmpId", orderController.getOrderByEmpId);
router.post("/getOrderTodayByEmpId", orderController.getOrderTodayByEmpId);
router.post("/getOrderUpcomingByEmpId", orderController.getOrderUpcomingByEmpId);
router.post("/getHistoryByEmpId", orderController.getHistoryByEmpId);
router.post("/updateOrder", orderController.updateOrder);
router.post("/deleteOrder", orderController.deleteOrder);
router.post("/test", orderController.test);
router.post("/cancelOrder", orderController.cancelOrder);
router.post("/startService", orderController.startService);
router.post("/sendOTP", orderController.sendOTP);
router.post("/completeOrder", orderController.completeOrder);
router.post("/endService", orderController.endService);
router.post("/getActiveService", orderController.getactiveService);
router.post("/activeService", orderController.activeService);
router.post("/addAddons", orderController.addAddons);
router.post("/removeAddOns", orderController.removeAddOns);
router.post("/getAddOns", orderController.getAddOns);
router.post("/createCheckout", orderController.createCheckout);
router.post("/failed", orderController.paymentDeclined);
router.get("/success", orderController.success);



// router.post("/test", async (req, res) => {

//     try {
//         let orderId = new mongoose.Types.ObjectId();
//         res.json(orderId);
//     }
//     catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

module.exports = router