const mongoose = require('mongoose')
const EmployeeServiceSchema = new mongoose.Schema({
  empId :{
     type : mongoose.Schema.Types.ObjectId, 
     ref: 'employee',
     required : true,
  },
  serList :[
    {
      serId :{
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'service',
      required : true,
      },
      isActive : {
        type : Boolean,
        default : true
      }
    } 
  ],
})



const EmployeeServiceModel = mongoose.model('employee_service',EmployeeServiceSchema)
module.exports = EmployeeServiceModel