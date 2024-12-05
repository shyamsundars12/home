// Example employeeController.js

const Employee = require('../models/EmployeeModel');
const OrderModel = require('../models/OrderModel');
const emailSender = require('../Helper/emailHelper');
const moment = require('moment-timezone')
const md5 = require('md5')
moment().tz("Asia/Kolkata").format();
module.exports = {
  getAllEmployees: async (req, res) => {
    try {
      const employee = await Employee.find({});
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  validateEmployee : async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    const employee = await Employee.findOne({"email": email},{password:true});
    if(employee.password == password){
      res.json({"message":true});
    }else{
      res.json({"message":false});
    }
  },
  createEmployee: async (req, res) => {
    
    try {
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      let password = "";
      for(let i=0;i<3;i++){
        password += fname[Math.floor(Math.random() * fname.length)];
        password += email[Math.floor(Math.random() * email.length)];
        password += lname[Math.floor(Math.random() * lname.length)];
      }
      const speCharList = "!@#$%^&*()~_+=";
      password += speCharList[Math.floor(Math.random() * 13)];
      
      console.log(password)
      const employee = new Employee({
          fname : fname,
          lname : lname,
          email : email,
          password : md5(password),
          contact_no : req.body.contact_no,
          address : req.body.address
      });
      console.log(employee)
      const newEmployee = await employee.save();
      emailSender({email:email,password:password})
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  },
  test4: async (req, res) => {
    
    try {
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      let password = "";
      for(let i=0;i<3;i++){
        password += fname[Math.floor(Math.random() * fname.length)];
        password += email[Math.floor(Math.random() * email.length)];
        password += lname[Math.floor(Math.random() * lname.length)];
      }
      const speCharList = "!@#$%^&*()~_+=";
      password += speCharList[Math.floor(Math.random() * 13)];
      console.log(password)
      
      emailSender({email:email,password:password})

      res.status(201).json('ok');
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  getEmployeeById: async (req, res) => {
    const empId = req.body._id;
    // console.log(req.body)

    try {
      const employee = await Employee.findById(empId);
    
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getEmployeeByEmail: async (req, res) => {
    // const custId = req.body.email;
    console.log(req.body.email)
    try {
      const employee = await Employee.findOne({email:req.body.email});
     if(employee){
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
  getTodaySchedules : async (req, res) => {
    const empId  = req.body.empId;
    // const status = req.body.status
    // console.log(req.body); 
    const date = moment().format('YYYY-MM-DD')
    // console.log(date)
    try {
        const order = await OrderModel.find({empId:empId,service_date:date,status:'assigned'});
        
        // console.log(order)
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getUpcomingSchedules : async (req, res) => {
    const empId  = req.body.empId;
    // const status = req.body.status
    // console.log(req.body); 
    const date = moment().format('YYYY-MM-DD')
    // console.log(date)
    try {
        const order = await OrderModel.find({empId:empId,service_date:{$nin :date},status:'assigned'});
        
        // console.log(order)
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  completed : async (req, res) => {
    const empId  = req.body.empId;
    try {
        const order = await OrderModel.find({empId:empId,status:'completed'});
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  avgRating : async (req, res) => {
    const empId  = req.body.empId;
    try {
        const order = await Employee.findById(empId,{rating:true});
        res.send(order);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  updateEmployee: async(req,res)=>{
    const empId  = req.body._id;
    const update  = req.body;
    // console.log(req.body)
    // const  {fname,lname,email,password,contact_no}  = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(empId, update, { new: true });
        console.log(employee)
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteEmployee : async (req, res) => {
    const empId  = req.body._id;
    try {
      const employee = await Employee.findByIdAndUpdate(empId,{ isActive: false },{new:true});
        
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  activeEmployee : async (req, res) => {
    const empId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const employee = await Employee.findByIdAndUpdate(empId,{ isActive:true },{new:true});
        
        
        res.send(employee);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getActiveEmployee : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Employee.find({isActive:true});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  getInActiveEmployee : async (req, res) => {
    // const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Employee.find({isActive:false});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // Similar functions for updating and deleting employee...
};
