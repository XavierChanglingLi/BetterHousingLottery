import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    roomID: '',
    occupancy: 1,
    area: 100,
    roomPicUrl:'',
    building: '',
    _id: ''
}

function CreateRoom() {
    const state = useContext(GlobalState)
    const [room, setRoom] = useState(initialState)
    const [buildings] = state.buildingsAPI.buildings
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.studentAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [rooms] = state.roomsAPI.rooms
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.roomsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            rooms.forEach(room => {
                if(room._id === param.id) {
                    setRoom(room)
                    setImages(room.roomPicUrl)
                }
            })
        }else{
            setOnEdit(false)
            setRoom(initialState)
            setImages(false)
        }
    }, [param.id, rooms])


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setRoom({...room, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            // if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/rooms/${room._id}`, {...room, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/rooms', {...room, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="create_room">

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="roomID">Room ID</label>
                    <input type="text" name="roomID" id="roomID" required
                    value={room.roomID} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="occupancy">Occupancy</label>
                    <input type="number" name="occupancy" id="occupancy" required
                    value={room.occupancy} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="area">Area</label>
                    <input type="number" name="area" id="area" required
                    value={room.area} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="roomPicUrl">Picture</label>
                    <textarea type="text" name="roomPicUrl" id="roomPicUrl" required
                    value={room.roomPicUrl} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="buildings">Buildings: </label>
                    <select name="building" value={room.building} onChange={handleChangeInput} >
                        <option value="">Please select a building</option>
                        {
                            buildings.map(building => (
                                <option value={building._id} key={building._id}>
                                    {building.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateRoom
