// Example adminController.js

const Admin = require('../models/AdminModel');

module.exports = {
  getAllAdmins: async (req, res) => {
    try {
      const admin = await Admin.find({});
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  validateAdmin : async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    const admin = await Admin.findOne({"email": email},{password:true});
    if(admin.password == password){
      res.json({"message":true});
    }else{
      res.json({"message":false});
    }
  },
  createAdmin: async (req, res) => {
    
    try {
    const admin = new Admin({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        contact_no : req.body.contact_no,
        address : req.body.address
    });
      const newAdmin = await admin.save();
      res.status(201).json(newAdmin);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Bad request' });
    }
  },

  getAdminById: async (req, res) => {
    const empId = req.body._id;
    // console.log(req.body)

    try {
      const admin = await Admin.findById(empId);
    
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getAdminByEmail: async (req, res) => {
    // const custId = req.body.email;
    // console.log(req.body.email)
    try {
      const admin = await Admin.findOne({email:req.body.email});
     if(admin){
      // console.log("true");
    
     res.status(200).json({mess : true})
    }
    else{
      // console.log("false")
      res.status(200).json({mess : false});
    }
     
    } catch (error) {
      console.log(error)
      res.status(500).json({ mess: false });
    }
  },
  updateAdmin: async(req,res)=>{
    const empId  = req.body._id;
    const update  = req.body;
    // console.log(req.body)
    // const  {fname,lname,email,password,contact_no}  = req.body;
    try {
        const admin = await Admin.findByIdAndUpdate(empId, update, { new: true });
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteAdmin : async (req, res) => {
    const empId  = req.body._id;
    try {
      const admin = await Admin.findByIdAndUpdate(empId,{ isActive: false },{new:true});
        
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  activeAdmin : async (req, res) => {
    const empId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const admin = await Admin.findByIdAndUpdate(empId,{ isActive:true },{new:true});
        
        
        res.send(admin);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getActiveCustomer : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Admin.find({status:'active'});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getInActiveCustomer : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Admin.find({status:'inactive'});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting admin...
};
