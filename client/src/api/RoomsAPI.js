import {useState, useEffect} from 'react'
import axios from 'axios'


function RoomsAPI() {
    const [rooms, setRooms] = useState([])
    const [callback, setCallback] = useState(false)
    const [building, setBuilding] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getRooms = async () => {
            const res = await axios.get(`/api/buildings?limit=${page*9}&${building}&${sort}&title[regex]=${search}`)
            setRooms(res.data.rooms)
            setResult(res.data.result)
        }
        getRooms()
    },[callback, building, sort, search, page])

    return {
        rooms: [rooms, setRooms],
        callback: [callback, setCallback],
        building: [building, setBuilding],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default RoomsAPI
