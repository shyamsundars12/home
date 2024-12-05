const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
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
     required : true,
  },
  lng :{
     type : String,
     required : true,
  },
})

const AdminSchema = new mongoose.Schema({
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
  role : {
      type : String,
      default : "admin"
  },
  status : {
     type : String,
     default : "Verified"
  }
})



const AdminModel = mongoose.model('admin',AdminSchema)
module.exports = AdminModel