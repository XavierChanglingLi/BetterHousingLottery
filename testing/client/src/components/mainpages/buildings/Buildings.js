import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

function Buildings() {
    const state = useContext(GlobalState)
    const [buildings] = state.buildingsAPI.buildings
    const [building, setBuilding] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.buildingsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')
    const histore = useHistory()
    const param = useParams()

   const initialState = {
        name:'',
        housingType: 'traditional',
        elevator: 1,
        location:''
    }

    const fakeState = {
        name:'fake',
        housingType: 'faked',
        elevator: 1,
        location:''
    } 
    
    const createBuilding = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/building/${id}`, {name: building}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/building', {name: building}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setBuilding('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editBuilding = async (id, value) =>{
        setID(id)
        setBuilding({...building,value})
        setOnEdit(true)
    }

    const deleteBuilding = async id =>{
        try {
            const res = await axios.delete(`/api/building/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="buildings">
            <form onSubmit={createBuilding}>
                <label htmlFor="building">Building</label>
                <input type="text" name="building" value={building} required
                onChange={e => setBuilding(e.target.value)} />

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    buildings.map(building => (
                        <div className="row" key={building._id}>
                            <p>{building.name}</p>
                            <p>{building.housingType}</p>
                            <p>{building.elevator}</p>
                            <p>{building.location}</p> 
                            <div>
                                <button onClick={() => editBuilding(building._id, building.name)}>Edit</button>
                                <button onClick={() => deleteBuilding(building._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Buildings
