const Rooms = require('../models/roomModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const roomCtrl = {
    getRooms: async(req, res) =>{
        try {
            const features = new APIfeatures(Rooms.find(), req.query)
                .filtering().sorting().paginating()

            const rooms = await features.query

            res.json({
                status: 'success',
                result: rooms.length,
                rooms: rooms
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createRoom: async(req, res) =>{
        try {
            const {roomID, building, occupancy, area, roomPicUrl} = req.body;
            if(!roomPicUrl) return res.status(400).json({msg: "No image upload"})

            const room = await Rooms.findOne({roomID})
            if(room)
                return res.status(400).json({msg: "This rooms already exists."})

            const newRoom = new Rooms({
                roomID, building: building.toLowerCase(), occupancy, area, roomPicUrl
            })

            await newRoom.save()
            res.json({msg: "Created a rooms"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteRoom: async(req, res) =>{
        try {
            await Rooms.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Room"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateRoom: async(req, res) =>{
        try {
            const {occupancy, area, roomPicUrl} = req.body;
            if(!roomPicUrl) return res.status(400).json({msg: "No image upload"})

            await Rooms.findOneAndUpdate({_id: req.params.id}, {
                occupancy, area, roomPicUrl
            })

            res.json({msg: "Updated a Room"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = roomCtrl