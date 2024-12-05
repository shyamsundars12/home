const express = require("express");
const AdminModel = require("../models/AdminModel");
const adminController = require("../controllers/adminController");
const router = express.Router();


router.post("/createAdmin", adminController.createAdmin);
/**
 * async (req, res) => {

    try {
        const admin = new AdminModel({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password,
            contact_no : req.body.contact_no,
            address : req.body.address
        });
        const newAdmin = await admin.save();
        res.json(newAdmin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/validateAdmin", adminController.validateAdmin);
router.post("/getAdmin",adminController.getAllAdmins);
/**
 *  async (req, res) => {

    try {
        const admin = await AdminModel.find({});
        res.json(admin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/getAdminById", adminController.getAdminById);
router.post("/getAdminByEmail", adminController.getAdminByEmail);
/**
 * async (req, res) => {

    try {
        const admin = await AdminModel.find({_id:req.body.empId});
        res.json(admin);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
}
 */
router.post("/updateAdmin",adminController.updateAdmin);
/**
 *  async (req, res) => {

    const id  = req.body.id;
    const  {fname,lname,email,password,contact_no}  = req.body;

    try {
        const admin = await AdminModel.findByIdAndUpdate(id, { fname,lname,email,password,contact_no}, { new: true });
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */

router.post("/deleteAdmin",adminController.deleteAdmin);
router.post("/activeAdmin", adminController.activeAdmin);
router.post("/getActiveAdmin", adminController.getActiveCustomer);
router.post("/getInActiveAdmin", adminController.getInActiveCustomer);


/**
 *  async (req, res) => {

    const id  = req.body.id;
    try {
        const admin = await AdminModel.findByIdAndDelete(id);
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
 */


module.exports = router