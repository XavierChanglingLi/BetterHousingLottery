const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({
    roomID:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    building:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    occupancy:{
        type: Number,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    roomPicUrl:{
        type: String,
        required: true
    },
    popularity:{
        type: Number,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Rooms", roomSchema)

