const express = require("express");
const EmpSerModel = require("../models/EmployeeServiceModel");
const router = express.Router();
const empSerController = require("../controllers/employeeServiceController");


router.post("/addService", empSerController.addService);
router.post("/removeService", empSerController.removeService);

router.post("/getEmpSer",empSerController.getAllEmpSers);
/** async (req, res) => {
~
    try {
        const empSer = await EmpSerModel.find({});
        res.json(empSer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
} */
router.post("/getEmpSerByEmpId",empSerController.getEmpSerByEmpId);

/**
 *  async (req, res) => {

    try {
        const empSer = await EmpSerModel.find({empID:req.body.empID});
        res.json(empSer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */

router.post("/getEmpSerBySerId",empSerController.getEmpSerBySerId);
/**
 *  async (req, res) => {

    try {
        const empSer = await EmpSerModel.find({serID:req.body.serID});
        res.json(empSer);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */

router.post("/updateEmpSer",empSerController.updateEmpSer);
/**
 * async (req, res) => {

    const empID  = req.body.id;
    const  {serList}  = req.body;

    try {
        const empSer = await EmpSerModel.findByIdAndUpdate(empID, {serList}, { new: true });
        res.send(empSer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */
router.post("/deleteEmpSer", empSerController.deleteEmpSer);
/**
 * async (req, res) => {

    const id  = req.body.id;
    try {
        const empSer = await EmpSerModel.findByIdAndDelete(id);
        res.send(empSer);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */




module.exports = router