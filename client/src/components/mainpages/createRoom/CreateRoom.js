import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    roomID: '',
    building: '',
    occupancy: 1,
    area: 100,
    roomPicUrl:'',
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

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File does not exist.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setRoom({...room, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

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

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_room">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="room_id">Room ID</label>
                    <input type="text" name="room_id" id="room_id" required
                    value={room.roomID} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="occupancy">Occupancy</label>
                    <input type="number" name="occupancy" id="occupancy" required
                    value={room.occupancy} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="area">Area</label>
                    <input type="number" name="are" id="area" required
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
