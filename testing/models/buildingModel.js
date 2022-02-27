const mongoose = require('mongoose')


const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    housingType: {
        type: String,
        required: true,
        trim: true
    },
    elevator: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Building", buildingSchema)