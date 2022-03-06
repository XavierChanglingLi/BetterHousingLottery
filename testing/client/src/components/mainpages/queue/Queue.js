import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Queue() {
    const state = useContext(GlobalState)
    const [queue, setQueue] = state.studentAPI.queue
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = queue.reduce((prev, item) => {
                return prev + (item.area)
            },0)

            setTotal(total)
        }

        getTotal()

    },[queue])

    const addToQueue = async (queue) =>{
        await axios.patch('/student/addqueue', {queue}, {
            headers: {Authorization: token}
        })
    }

 
    const removeRoom = id =>{
        if(window.confirm("Do you want to remove this rooms?")){
            queue.forEach((item, index) => {
                if(item._id === id){
                    queue.splice(index, 1)
                }
            })

            setQueue([...queue])
            addToQueue(queue)
        }
    }

    if(queue.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Queue Empty</h2>

    return (
        <div>
            {
                queue.map(room => (
                    <div className="detail queue" key={room._id}>
                        <img className="image" src={room.roomPicUrl}  alt="" />

                        <div className="box-detail">
                            <h2>{room.roomID}</h2>

                            <p>Area: {room.area}</p>
                            <p>Occupancy: {room.occupancy}</p>
                            <p>Building: {room.roomID.replace(/[0-9]/g,'')}</p>
                            <p>Popularity: {room.popularity}</p>

                            
                            <div className="delete" 
                            onClick={() => removeRoom(room._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Queue
