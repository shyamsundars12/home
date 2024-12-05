const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  empId :{
     type : mongoose.Schema.Types.ObjectId, 
     ref: 'employee',
     required : true,
  },
  orderId :{
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'order',
    required : true,
  },
  custId :{
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'customer',
    required : true,
  },
  feed_text:{
    type:String,
    default:null
  },
  serRating:{
    type : Number,
    default : 0
  },
  empRating:{
    type : Number,
    default : 0
  },
  isActive : {
     type : Boolean,
     default : true
  }
})



const FeedbackModel = mongoose.model('feedback',FeedbackSchema)
module.exports = FeedbackModel