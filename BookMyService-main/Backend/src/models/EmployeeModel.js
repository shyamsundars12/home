const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  address_id :{
     type : String,
     required : false,
  },
  house_no :{
     type : String,
     required : true,
  },
  society_name :{
     type : String,
     required : true,
  },
  landmark :{
     type : String
  }, 
  city :{
     type : String
  },
  pincode :{
     type : String,
     required : true,
  },
  lat :{
     type : String,
     required : false,
  },
  lng :{
     type : String,
     required : false,
  },
})

const EmployeeSchema = new mongoose.Schema({
  fname :{
     type : String,
     required : true,
  },
  lname :{
     type : String,
     required : true,
  },
  email :{
     type : String,
     required : true,
  },
  password :{
     type : String,
     required : true,
  }, 
  contact_no :{
     type : String,
     required : true,
  },
  address : {
     type : [AddressSchema]
  },
  isActive:{
   type : Boolean,
   default :true
  },isBusy : {
   type : Boolean,
   default : false
  },
  emailstatus : {
     type : String,
     default : "Not Verified"
  },
  rating : {
    type : Number,
    default : "-1"
  },
})



const EmployeeModel = mongoose.model('employee',EmployeeSchema)
module.exports = EmployeeModel