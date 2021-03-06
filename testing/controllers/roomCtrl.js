const Rooms = require('../models/roomModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} 
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
            // const features = new APIfeatures(Rooms.find(), { limit: '9', building: '61abb0720183d66e7ddf5f03', floor: '1', elevator: '1' })
            //     .filtering().sorting().paginating()

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
            const {roomID, occupancy, area, roomPicUrl, building, popularity, distToBath, elevator, floor, checked} = req.body;
            if(!roomPicUrl) return res.status(400).json({msg: "No image upload"})

            const room = await Rooms.findOne({roomID})
            if(room)
                return res.status(400).json({msg: "This room already exists."})

            const newRoom = new Rooms({
                roomID:roomID.toLowerCase(), occupancy, area, roomPicUrl, building, popularity, distToBath, elevator, floor, checked 
            })

            await newRoom.save()
            res.json({msg: "Created a room"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    decrementPop: async(req, res) => {
        try {
            const room = await Rooms.findById(req.params.id).exec();
            await Rooms.updateOne({_id: req.params.id}, {
                popularity:room.popularity-1
            })
            res.json({msg: "Decremented Popularity"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    incrementPop: async(req, res) => {
        try {
            const room = await Rooms.findById(req.params.id).exec();
            await Rooms.updateOne({_id: req.params.id}, {
                popularity:room.popularity+1
            })
            res.json({msg: "Incremented Popularity"})
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
            const {occupancy, area, roomPicUrl, building, popularity, distToBath, elevator, floor, checked} = req.body;
            console.log('UPDATING ROOM')
            if(!roomPicUrl) return res.status(400).json({msg: "No image upload"})

            await Rooms.findOneAndUpdate({_id: req.params.id}, {
                occupancy, area, roomPicUrl, building, popularity, distToBath, elevator, floor, checked
            })

            res.json({msg: "Updated a Room"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = roomCtrl