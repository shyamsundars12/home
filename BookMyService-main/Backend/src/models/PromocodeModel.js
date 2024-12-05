const mongoose = require('mongoose')

const PromocodeSchema = new mongoose.Schema({
  name :{
     type : String,
     required : true,
  },
  promocode :{
     type : String,
     default : "OFF10",
  },
  terms :{
     type : String,
     default : "Not Specified"
  },
  valid_till :{
     type : Date,
     default : "20-10-2024"
  }, 
  isPercent :{
     type : Boolean, // true = percent | false = flat
     default : false
  },
  min :{
     type : String,
     default : "100"
  },
  max :{
     type : String,
     default : "1000"
  },
  isActive : {
    type : Boolean,
    default : true
  }
})



const PromocodeModel = mongoose.model('promocode',PromocodeSchema)
module.exports = PromocodeModel