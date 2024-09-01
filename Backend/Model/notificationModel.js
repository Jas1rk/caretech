const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({

    notifications:[{
        doctorId:{
            type:String,

        },
        doctorname:{
            type:String
        },
        doctoremail:{
            type:String
        }, 
        date:{
            type:Date,
            default:Date.now
        },
    }]
})

const Notification = mongoose.model('Notification',notificationSchema)
module.exports = Notification