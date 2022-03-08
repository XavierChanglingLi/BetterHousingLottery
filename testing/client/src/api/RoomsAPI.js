import {useState, useEffect} from 'react'
import axios from 'axios'


function RoomsAPI(token) {
    const [rooms, setRooms] = useState([])
    const [callback, setCallback] = useState(false)
    const [building, setBuilding] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getRooms = async () => {
            const res = await axios.get(`/api/rooms?limit=${page*9}&${building}&${sort}`)
            setRooms(res.data.rooms)
            setResult(res.data.result)
        }
        getRooms()
    },[callback, building, sort, search, page])

    const incrementPop= async (room) => {
        const newroom = {
            ...room,
            popularity:room.popularity+1,
            images:room.roomPicUrl
        }
        await axios.patch(`/api/rooms/incrementpop/${room._id}`, {}, {
            headers: {Authorization: token}
        })
    }
    const decrementPop= async (room) => {
        var newpop = 0
        if (room.popularity > 0) {
            newpop = room.popularity-1
        }
        const newroom = {
            ...room,
            popularity:newpop,
            images:room.roomPicUrl
        }
        await axios.patch(`/api/rooms/decrementpop/${room._id}`, {}, {
            headers: {Authorization: token}
        })
    }


    return {
        rooms: [rooms, setRooms],
        callback: [callback, setCallback],
        building: [building, setBuilding],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        incrementPop: incrementPop,
        decrementPop: decrementPop
    }
}

export default RoomsAPI
