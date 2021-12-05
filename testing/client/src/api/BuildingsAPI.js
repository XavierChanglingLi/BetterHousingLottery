import {useState, useEffect} from 'react'
import axios from 'axios'

function BuildingsAPI() {
    const [buildings, setBuildings] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getBuildings = async () =>{
            const res = await axios.get('/api/building')
            setBuildings(res.data)
        }

        getBuildings()
    },[callback])
    return {
        buildings: [buildings, setBuildings],
        callback: [callback, setCallback]
    }
}

export default BuildingsAPI
