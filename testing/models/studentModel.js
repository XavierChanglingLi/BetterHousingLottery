const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentID:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    classYear:{
        type:Number,
        default: 2022
    },
    housingType:{
        type: String,
        default: "traditional"
    },
    discipStatus:{
        type: String,
        default: "normal"
    },
    assignedRoom:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref: 'Rooms'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    queue: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Students', studentSchema)