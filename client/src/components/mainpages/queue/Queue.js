import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

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


    // const increment = (id) =>{
    //     queue.forEach(item => {
    //         if(item._id === id){
    //             item.quantity += 1
    //         }
    //     })
    //
    //     setCart([...cart])
    //     addToCart(cart)
    // // }
    //
    // const decrement = (id) =>{
    //     cart.forEach(item => {
    //         if(item._id === id){
    //             item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
    //         }
    //     })
    //
    //     setCart([...cart])
    //     addToCart(cart)
    // }

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

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {queue, paymentID, address}, {
            headers: {Authorization: token}
        })

        setQueue([])
        addToQueue([])
        alert("You have successfully placed an order.")
    }


    if(queue.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Queue Empty</h2>

    return (
        <div>
            {
                queue.map(room => (
                    <div className="detail queue" key={room._id}>
                        <img src={room.roomPicUrl} alt="" />

                        <div className="box-detail">
                            <h2>{room.roomID}</h2>

                            <h3>{room.area}</h3>
                            <p>{room.occupancy}</p>
                            <p>{room.building}</p>

                            
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
