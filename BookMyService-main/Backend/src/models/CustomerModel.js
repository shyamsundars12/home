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
      required : false,
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
 
 const CustomerSchema = new mongoose.Schema({
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
   status : {
      type : String,
      default : "active"
   },
   cart: {
     
      serList: [
        {
          serId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
          },
          time: String,
          date: String,
        },
      ],
    },
 })
 


const CustomerModel = mongoose.model('customer',CustomerSchema)
module.exports = CustomerModel