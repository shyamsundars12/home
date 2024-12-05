// Example customerController.js

const Customer = require('../models/CustomerModel');
var nodemailer = require('nodemailer');
const ServiceModel = require('../models/ServiceModel');
const CustomerModel = require('../models/CustomerModel');
module.exports = {
  getAllCustomers: async (req, res) => {
    // console.log("Hello");
    try {
      const customer = await Customer.find({});
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  validateCustomer : async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    const customer = await Customer.findOne({"email": email},{password:true});
    // console.log(customer)
    if(customer != '' && customer != null){
    if(customer.password == password){
      console.log("success")
      res.json({message:true});
    }else{
      res.json({message:false});
    }
  }
    else{
      res.json({message:false});
    }
  },
  createCustomer: async (req, res) => {
    try {
      // console.log(req);
    const customer = new Customer({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        contact_no : req.body.contact_no,
        address : req.body.address
    });
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  sendOTP : async (req,res)=>{
    const transporter = nodemailer.createTransport({
      port: 465,               // true for 465, false for other ports
      host: "smtp.gmail.com",
         auth: {
              user: 'bookmyservices.one@gmail.com',
              pass: 'dpxtivjexdkxucvq',
           },
      secure: true,
      });

      const mailData = {
        from: 'bookmyservice@noreply.com',  // sender address
          to: 'tirthprajapati26@gmail.com',   // list of receivers
          subject: 'OTP for account authentication',
          text: 'OTP for account authentication don\' share',
          html: '<p>dont Share : </p><p style ="color:red;"><b> 123456<b> </p>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
       res.send("ok");
  },
  getCustomerById: async (req, res) => {
    const custId = req.body._id;

    try {
      const customer = await Customer.findById(custId);
      console.log(customer)
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getCustomerbyemail: async (req, res) => {
    // const custId = req.body.email;
    // console.log(req.body.email)
    try {
      const customer = await Customer.findOne({email:req.body.email});
     if(customer){
      console.log("true");
    
     res.status(200).json({message : true})
    }
    else{
      console.log("false")
      res.status(200).json({message : false});
    }
     
    } catch (error) {
      console.log(error)
      res.status(500).json({ mess: false });
    }
  },
  updateCustomer: async(req,res)=>{
    const custId  = req.body._id;
    const update  = req.body;
    // console.log(custId)
    // console.log(req.body)
    try {
        const customer = await Customer.findByIdAndUpdate(custId,update, { new: true });
      
        res.send(customer);
        
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  deleteCustomer : async (req, res) => {
    const custId  = req.body._id;
    // const status = req.body.status
    try {
        const customer = await Customer.findByIdAndUpdate(custId,{ status: 'inactive' },{new:true});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  activeCustomer : async (req, res) => {
    const custId  = req.body._id;
    // const status = req.body.status
    // console.log(req.body); 
    try {
        const customer = await Customer.findByIdAndUpdate(custId,{ status: 'active' },{new:true});
        
        
        res.send(customer);
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
        const customer = await Customer.find({status:'active'});
        
        
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
        const customer = await Customer.find({status:'inactive'});
        
        
        res.send(customer);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  },
  // addService: async(req,res)=>{
  //   try {
  //     const customerId = req.body._id;
  //     const services =req.body.serId;
  //     // const serId=req.body.service_id;
  
  //     // Fetch the customer by their ID
  //     const customer = await Customer.findById(customerId);
  
  //     if (!customer) {
  //       return res.status(404).json({ message: 'Customer not found' });
  //     }
  

  //     // const services = await ServiceModel.find({ name: { $in: serviceIds } });
  
  //     // if (!services || services.length === 0) {
  //     //   return res.status(404).json({ message: 'No services found' });
  //     // }
  
  
  //     customer.services.push(...services);
  //     await customer.save();
  
  //     res.status(200).json({ message: 'Services booked successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  
  // },
  addItem : async (req, res) =>{
    const custId = req.body.custId;
    const serId = req.body.serId;
    const time = req.body.time;
    const date = req.body.date;
    const serRecord = {
      "serId":serId,
      "time": time,
      "date":date
    };
    try{
      const customer = await Customer.findById(custId);
      if(customer.cart.serList == [] || customer.cart.serList == "" || customer.cart.serList == null){
        customer.cart.serList = serRecord;
      }else{
        const serList = customer.cart.serList;
        serList.push(serRecord);
        customer.cart.serList = serList;
      }
      // console.log(customer);
      const newCustomer = await Customer.findByIdAndUpdate(custId,customer);
      // console.log(newCustomer);
      res.send("ok");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeItem: async (req, res) => {
    const { custId, serId, time, date } = req.body;

    try {
        console.log('Received Request:', req.body); // Log incoming request

        const customer = await Customer.findById(custId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const serList = customer.cart.serList;
        
        // Ensure serList is an array before proceeding
        if (!Array.isArray(serList)) {
            return res.status(500).json({ error: 'Invalid cart structure, serList is not an array' });
        }

        const initialLength = serList.length;

        // Log the serList to ensure correct structure
        console.log('Current serList:', serList);

        // Use filter to remove the item
        customer.cart.serList = serList.filter(service => {
            // Check if serId, time, and date are present before comparing
            if (!service.serId || !service.time || !service.date) {
                console.error('Invalid service data:', service);
                return true; // Keep invalid services in the list (optional logging)
            }

            return !(service.serId.toString() === serId && service.time === time && service.date === date);
        });

        // If no items were removed
        if (customer.cart.serList.length === initialLength) {
            return res.status(404).json({ error: 'Service not found in cart' });
        }

        // Save the updated customer document
        await customer.save();
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error in removeItem:', error); // Log the error details
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
},


  cart : async (req, res) =>{
    // console.log(req.body)
    const custId = req.body.custId;
    try{
      const customer = await Customer.findById(custId);
      if(customer.cart.serList == [] || customer.cart.serList ==  null ){
        res.send({message:false});
        // customer.cart.serList.push(serRecord)
      }else{
        res.send(customer);
      }
      // console.log(customer);
      
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeCart: async (req, res) => {
    const custId = req.body.custId;
    const { serId, time, date } = req.body;  // Assuming you want to remove based on serId, time, and date
    try {
        const customer = await Customer.findById(custId);

        // If customer doesn't exist
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Remove the specific service from the cart's serList
        customer.cart.serList = customer.cart.serList.filter(service => {
            return service.serId !== serId || service.time !== time || service.date !== date;
        });

        // Save the updated customer document
        const updatedCustomer = await customer.save();  // Save directly after modifying the document

        console.log(updatedCustomer);  // For debugging

        res.status(200).json({ message: "Service removed from cart", customer: updatedCustomer });
    } catch (error) {
        console.error('Error removing service from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},




  // removeService : async(req,res)=>{
  //   try {
  //     const customerId = req.body._id;
  //     const  serviceIds  = req.body.serId;

  //     const customer = await Customer.findById(customerId);
  
  //     if (!customer) {
  //       return res.status(404).json({ message: 'Customer not found' });
  //     }
  
     
  //     customer.services = customer.services.filter(
  //       (service) => !serviceIds.includes(service.toString())
  //     );
  

  //     await customer.save();
  
  //     return res.json({ message: 'Services removed successfully', customer });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // }
  
  
  // Similar functions for updating and deleting customer...
};
