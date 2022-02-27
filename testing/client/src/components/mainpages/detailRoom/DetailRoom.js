import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import RoomItem from '../utils/roomItem/RoomItem'


function DetailRoom() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [rooms] = state.roomsAPI.rooms
    const addQueue = state.studentAPI.addQueue
    const [detailRoom, setDetailRoom] = useState([])

    useEffect(() =>{
        if(params.id){
            rooms.forEach(room => {
                if(room._id === params.id) setDetailRoom(room)
            })
        }
    },[params.id, rooms])

    if(detailRoom.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailRoom.roomPicUrl} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailRoom.roomID}</h2>
                    </div>
                    <p>Building: {detailRoom.roomID.replace(/[0-9]/g,'')}</p>
                    <p>Floor: {detailRoom.floor}</p>
                    <p>Occupancy: {detailRoom.occupancy}</p>
                    <span>Area: {detailRoom.area}</span>
                    <p>Distance to Bathroom: {detailRoom.distToBath}</p>
                    <p>Elevator: {detailRoom.elevator}</p>
                    <Link to="/queue" className="queue"
                    onClick={() => addQueue(detailRoom)}>
                        Add to Queue
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related rooms</h2>
                <div className="rooms">
                    {
                        rooms.map(room => {
                            return room.building === detailRoom.building
                                ? <RoomItem key={room._id} room={room} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailRoom
