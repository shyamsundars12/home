const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const AddOnSchema = new mongoose.Schema({
    serId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'service',
        required : true,
    },
    addOnList : [
        {
                name : {
                    type : String,
                    default :"Not Specified"
                },
                desc : {
                    type :  String,
                    default : "Default Desc"
                },
                price : {
                    type : String,
                    default : "0"
                },
                url : {
                    type:String,
                    default : "no image"
                },
                imageId : {
                    type:String,
                    default : "no image"
                },
                isActive : {
                    type: Boolean,
                    default : true
                }
            
        }
    ],
    
})



const AddOnModel = mongoose.model('addOn',AddOnSchema)
module.exports = AddOnModel