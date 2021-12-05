import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import RoomItem from '../utils/roomItem/RoomItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Rooms() {
    const state = useContext(GlobalState)
    const [rooms, setRooms] = state.roomsAPI.rooms
    const [isAdmin] = state.studentAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.roomsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        rooms.forEach(room => {
            if(room._id === id) room.checked = !room.checked
        })
        setRooms([...rooms])
    }

    const deleteRoom = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteRoom = axios.delete(`/api/rooms/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteRoom
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        rooms.forEach(room => {
            room.checked = !isCheck
        })
        setRooms([...rooms])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        rooms.forEach(room => {
            if(room.checked) deleteRoom(room._id, room.roomPicUrl)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters/>
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }
        <div className='rooms'>

        <div className="rooms.display">
            {
                rooms.map(room => {
                    return <RoomItem key={room._id} room={room}
                    isAdmin={isAdmin} deleteRoom={deleteRoom} handleCheck={handleCheck} />
                })
            } 
        </div>

        <iframe className='pdf' src="floor_plan.pdf" height="200" width="300"></iframe>
        </div>

    
        <LoadMore />
        {rooms.length === 0 && <Loading />}
        </>
    )
}

export default Rooms
