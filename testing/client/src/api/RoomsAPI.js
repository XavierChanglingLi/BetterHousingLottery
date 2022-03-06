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
        console.log(newroom) 
        await axios.put(`/api/rooms/${room._id}`, newroom, {
            headers: {Authorization: token}
        })
        console.log("incrementPop is getting called :)") 
    }


    return {
        rooms: [rooms, setRooms],
        callback: [callback, setCallback],
        building: [building, setBuilding],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        incrementPop: incrementPop
    }
}

export default RoomsAPI
