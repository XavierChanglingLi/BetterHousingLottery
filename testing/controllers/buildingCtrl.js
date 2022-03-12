const Building = require('../models/buildingModel')
const Rooms = require('../models/roomModel')

const buildingCtrl = {
    getBuildings: async(req, res) =>{
        try {
            const buildings = await Building.find()
            res.json(buildings)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBuilding: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update building
            const {name, housingType, elevator, location } = req.body;
            const building = await Building.findOne({name})
            if(building) return res.status(400).json({msg: "This building already exists."})

            const newBuilding = new Building({name, housingType, elevator, location})

            await newBuilding.save()
            res.json({msg: "Created a building"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBuilding: async(req, res) =>{
        try {
            const rooms = await Rooms.findOne({building: req.params.id})
            if(rooms) return res.status(400).json({
                msg: "Please delete all rooms with a relationship."
            })

            await Building.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Building"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBuilding: async(req, res) =>{
        try {
            const {name, housingType, elevator, location} = req.body;
            await Building.findOneAndUpdate({_id: req.params.id}, {name, housingType, elevator, location})

            res.json({msg: "Updated a building"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = buildingCtrl