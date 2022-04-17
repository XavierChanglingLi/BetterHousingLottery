import React from 'react'
import BtnRender from './BtnRender'

function RoomList({room, isAdmin, deleteRoom, handleCheck}) {

    return (
        <table>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
            </tr>
            <tr>
                <td>Peter</td>
                <td>Griffin</td>
            </tr>
            <tr>
                <td>Lois</td>
                <td>Griffin</td>
            </tr>
        </table>
        // <div className="room_card">
        //     {
        //         isAdmin && <input type="checkbox" checked={room.checked}
        //                           onChange={() => handleCheck(room._id)} />
        //     }
        //     <img src={room.roomPicUrl} alt="" />
        //
        //     <div className="room_box">
        //         <h2 title={room.roomID}>{room.roomID}</h2>
        //         <span>Area: {room.area}</span>
        //         <p>Occupancy: {room.occupancy}</p>
        //         <p>Popularity: {room.popularity}</p>
        //     </div>
        //
        //
        //     <BtnRender room={room} deleteRoom={deleteRoom} />
        // </div>
    )
}

export default RoomList
