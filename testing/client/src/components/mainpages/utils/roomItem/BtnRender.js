import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({room, deleteRoom}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.studentAPI.isAdmin
    const addQueue = state.studentAPI.addQueue
    const incrementPop = state.roomsAPI.incrementPop

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteRoom(room._id, room.roomPicUrl)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_room/${room._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>{ 
                        addQueue(room)
                        incrementPop(room)
                    }}>
                        Select
                    </Link>
                    <Link id="btn_view" to={`/detail/${room._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
