import React from 'react'
import BtnRender from './BtnRender'

function RoomItem({room, isAdmin, deleteRoom, handleCheck}) {

    return (
        <div className="room_card">
            {
                isAdmin && <input type="checkbox" checked={room.checked}
                onChange={() => handleCheck(room._id)} />
            }
            <img src={room.roomPicUrl} width={250} height={"auto"} alt="" />

            <div className="room_box">
                <h2 title={room.roomID}>{room.roomID}</h2>
                <span>{room.area}</span>
                <p>{room.occupancy}</p>
            </div>


            <BtnRender room={room} deleteRoom={deleteRoom} />
        </div>
    )
}

export default RoomItem
