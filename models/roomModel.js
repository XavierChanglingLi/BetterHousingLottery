const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({
    roomID:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    building:{
        type: String,
        trim: true,
        required: true
    },
    occupancy:{
        type: Number,
        trim: true,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    roomPicUrl:{
        type: String,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Rooms", roomSchema)

