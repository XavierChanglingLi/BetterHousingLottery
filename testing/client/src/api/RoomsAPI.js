import {useState, useEffect} from 'react'
import axios from 'axios'


function RoomsAPI(token) {
    const [rooms, setRooms] = useState([])
    const [callback, setCallback] = useState(false)
   
    const [query, setQuery] = useState(
        {
            building:'',
            floor:'',
            elevator:'',
            occupancy:''
        }
    )
    // const [building, setBuilding] = useState('')
    // const [floor, setFloor] = useState('')
    // const [elevator, setElevator] = useState('')
    
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        console.log('query floor:', query.floor)
        console.log('query building:', query.building)
        console.log('query elevator:', query.elevator)
        console.log('query elevator:', query.occupancy)
        const getRooms = async () => {
            const res = await axios.get(`/api/rooms?limit=${page*9}&${query.building}&${query.floor}&${query.elevator}&${query.occupancy}&${sort}`)
            setRooms(res.data.rooms)
            setResult(res.data.result)
        }
        getRooms()
    },[callback, query.building, query.floor, query.elevator, query.occupancy, sort, search, page])

    const incrementPop= async (room) => {
        await axios.patch(`/api/rooms/incrementpop/${room._id}`, {}, {
            headers: {Authorization: token}
        })
    }
    const decrementPop= async (room) => {
        await axios.patch(`/api/rooms/decrementpop/${room._id}`, {}, {
            headers: {Authorization: token}
        })
    }


    return {
        rooms: [rooms, setRooms],
        callback: [callback, setCallback],
        // building: [building, setBuilding],
        // floor: [floor, setFloor],
        // elevator: [elevator, setElevator],
        query: [query, setQuery],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        incrementPop: incrementPop,
        decrementPop: decrementPop
    }
}

export default RoomsAPI
