// Example employeeController.js

const Employee = require('../models/EmployeeModel');
const Customer = require('../models/CustomerModel');
const Admin = require('../models/AdminModel');

module.exports = {
  validateUser : async (req,res)=>{
    try{
        const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    
    if(role === "customer"){
        const user = await Customer.findOne({"email": email},{password:true});
        if(user.password == password){
            res.json({"message":true,"id":user._id});
        }else{
            res.json({"message":false});
        }
    }else if(role === "Employee"){
        const user = await Employee.findOne({"email": email},{password:true});
        if(user.password == password){
            res.json({"message":true,"id":user._id});
        }else{
            res.json({"message":false});
        }
    }else if(role === "Admin"||role === "admin"){
        const user = await Admin.findOne({"email": email},{password:true});
        if(user.password == password){
            res.json({"message":true,"id":user._id});
        }else{
            res.json({"message":false});
        }
    }else{

    }
    }catch(err){
        res.status(500).send(err)
    }
  },
  checkExists : async (req,res)=>{
    try{
        const email = req.body.email;
    const role = req.body.role;
    console.log(role)
    if(role === "customer"){
        const user = await Customer.findOne({"email": email});
        if(user != null || user!=''){
            res.json({"message":true});
        }else{
            res.json({"message":false});
        }
    }else if(role === "Employee"){
        const user = await Employee.findOne({"email": email});
        if(user != null || user!=''){
            res.json({"message":true});
        }else{
            res.json({"message":false});
        }
    }else if(role === "Admin" ||role === "admin"){
        const user = await Admin.findOne({"email": email});
        if(user != null || user!=''){
            res.json({"message":true});
        }else{
            res.json({"message":false});
        }
    }else{

    }
    }catch(err){
        res.status(500).send(err)
    }
  },
};
