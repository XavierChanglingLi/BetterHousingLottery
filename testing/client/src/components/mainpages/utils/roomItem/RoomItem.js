import React from 'react'
import BtnRender from './BtnRender'

function RoomItem({room, isAdmin, deleteRoom, handleCheck}) {

    return (
        <div className="room_card">
            {
                isAdmin && <input type="checkbox" checked={room.checked}
                onChange={() => handleCheck(room._id)} />
            }
            <img src={room.roomPicUrl} alt="" />

            <div className="room_box">
                <h2 title={room.roomID}>{room.roomID}</h2>
                <span>Area: {room.area}</span>
                <p>Occupancy: {room.occupancy}</p>
                <p>Popularity: {room.popularity}</p>
            </div>

            
            <BtnRender room={room} deleteRoom={deleteRoom} />
        </div>
    )
}

export default RoomItem
