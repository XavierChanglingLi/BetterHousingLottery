import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Buildings() {
    const state = useContext(GlobalState)
    const [buildings] = state.buildingsAPI.buildings
    const [building, setBuilding] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.buildingsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

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

    const editBuilding = async (id, name) =>{
        setID(id)
        setBuilding(name)
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
