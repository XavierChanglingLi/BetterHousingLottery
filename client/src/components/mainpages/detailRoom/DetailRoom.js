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
                        <h6>occupancy: {detailRoom.occupancy}</h6>
                    </div>
                    <span>{detailRoom.area}</span>

                    <p>{detailRoom.building}</p>
                    <Link to="/queue" className="queue"
                    onClick={() => addQueue(detailRoom)}>
                        add to queue
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
