import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import RoomItem from '../utils/roomItem/RoomItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from '../rooms/Filters'
import LoadMore from '../rooms/LoadMore'
import {useTable} from "react-table";
import {Link} from 'react-router-dom';

const Room = props=>(
    <tr>
        <td>{props.room.roomID}</td>
        <td>{props.room.roomID.replace(/[0-9]/g,'')}</td>
        <td>{props.room.floor}</td>
        <td>{props.room.occupancy}</td>
        <td>{props.room.area}</td>
        <td>{props.room.elevator}</td>
        <td>
            <Link to={'edit/'+props.room._id}>edit</Link> | <a href='#' onClick={() =>props.deleteRoom(props.room._id, props.room.roomPicUrl)}>delete</a>
        </td>
    </tr>
)

function RoomInfo() {
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

    const roomList=()=>{
        return rooms.map(currentroom => {
            //Comment component has three props
            return <Room room={currentroom} deleteRoom={deleteRoom} key={currentroom._id}/>
        })
    }

    if(loading) return <div><Loading /></div>

    return(
        <>
            <Filters/>
            <table>
                <tr>
                    <th>Room ID</th>
                    <th>Building</th>
                    <th>Floor</th>
                    <th>Occupancy</th>
                    <th>Area</th>
                    <th>Elevator</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    { roomList() }
                </tbody>
            </table>
        </>
    )
}
export default RoomInfo