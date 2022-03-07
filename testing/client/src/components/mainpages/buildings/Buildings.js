import React, {useState, useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

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

function Buildings() {
    // const state = useContext(GlobalState)
    // const [building, setBuilding] = useState(initialState)
    // const [buildings] = state.buildingsAPI.buildings
    // const [loading, setLoading] = useState(false)
    // const [id, setID] = useState('')

    // const [isAdmin] = state.studentAPI.isAdmin
    // const [token] = state.token

    // const history = useHistory()
    //const param = useParams()

    // //const [buildings] = state.buildingsAPI.buildings
    // const [onEdit, setOnEdit] = useState(false)
    // const [callback, setCallback] = state.buildingsAPI.callback

    // useEffect(() => {
    //     if(param.id){
    //         setOnEdit(true)
    //         buildings.forEach(building => {
    //             if(building._id === param.id) {
    //                 setBuilding(building)
    //             }
    //         })
    //     }else{
    //         setOnEdit(false)
    //         setBuilding(initialState)
    //     }
    // }, [param.id, buildings])


    // const handleChangeInput = e =>{
    //     const {name, value} = e.target
    //     setBuilding({...building, [name]:value})
    // }

    // const handleSubmit = async e =>{
    //     e.preventDefault()
    //     try {
    //         if(!isAdmin) return alert("You're not an admin")
    //         // if(!images) return alert("No Image Upload")

    //         if(onEdit){
    //             await axios.put(`/api/building/${id}`, {...building}, {
    //                 headers: {Authorization: token}
    //             })
    //         }else{
    //             await axios.post('/api/building', {...building}, {
    //                 headers: {Authorization: token}
    //             })
    //         }
    //         setCallback(!callback)
    //         history.push("/")
    //     } catch (err) {
    //         alert(err.response.data.msg)
    //     }
    // }

    // const editBuilding = async (id, name) =>{
    //     setID(id)
    //     setBuilding(name)
    //     setOnEdit(true)
    // }

    // const deleteBuilding = async id =>{
    //     try {
    //         const res = await axios.delete(`/api/building/${id}`, {
    //             headers: {Authorization: token}
    //         })
    //         alert(res.data.msg)
    //         setCallback(!callback)
    //     } catch (err) {
    //         alert(err.response.data.msg)
    //     }
    // }

    // return (
    //     <div className="create_building">

    //         <form onSubmit={handleSubmit}>
    //             <div className="row">
    //                 <label htmlFor="name">Building Name</label>
    //                 <input type="text" name="name" id="name" required
    //                 value={building.name} onChange={handleChangeInput} disabled={onEdit} />
    //             </div>

    //             <div className="row">
    //                 <label htmlFor="housingType">Housing Type</label>
    //                 <input type="text" name="housingType" id="housingType" required
    //                 value={building.housingType} onChange={handleChangeInput} />
    //             </div>

    //             <div className="elevator">
    //                 <label htmlFor="elevator">Elevator</label>
    //                 <input type="number" name="elevator" id="elevator" required
    //                 value={building.elevator} onChange={handleChangeInput} />
    //             </div>

    //             <div className="location">
    //                 <label htmlFor="location">Location</label>
    //                 <input type="text" name="location" id="location" required
    //                 value={building.location} onChange={handleChangeInput} />
    //             </div>

    //             <button type="submit">{onEdit? "Update" : "Create"}</button>
    //             <div className="col">
    //                 {
    //                 buildings.map(building => (
    //                     <div className="row" key={building._id}>
    //                         <p>{building.name}</p>
    //                         <div>
    //                             <button onClick={() => editBuilding(building._id, building.name)}>Edit</button>
    //                             <button onClick={() => deleteBuilding(building._id)}>Delete</button>
    //                         </div>
    //                     </div>
    //                 ))
    //                 }
    //         </div>
    //         </form>
    //     </div>
    // )

    const state = useContext(GlobalState)
    const [building, setBuilding] = useState(initialState)
    const [buildings] = state.buildingsAPI.buildings
    const [loading, setLoading] = useState(false)
    const [id, setID] = useState('')

    const [isAdmin] = state.studentAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    //const param = useParams()

    //const [buildings] = state.buildingsAPI.buildings
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.buildingsAPI.callback



    const createBuilding = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                //setBuilding([...buildings])
                //setBuilding(building)
                // buildings.forEach(building=>{
                //     if(building._id === param.id){
                //         setBuilding(building)
                //     }
                // })
                // setBuilding(fakeState)
                const res = await axios.put(`/api/building/${id}`, {...building}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/building', {...building}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setBuilding(initialState)
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editBuilding = async(id, value) =>{
        setID(id)
        setBuilding({...building, value})
        setOnEdit(true)
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setBuilding({...building,[name]:value})
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
                <label htmlFor="name">Building</label>
                <input type="text" name="name" value={building.name} required
                onChange={handleChangeInput} />
                <label htmlFor="housingType">Housing Type</label>
                <input type="text" name="housingType" value={building.housingType} required
                onChange={handleChangeInput} />
                <label htmlFor="elevator">Elevator</label>
                <input type="number" name="elevator" value={building.elevator} required
                onChange={handleChangeInput} />
                <label htmlFor="location">Location</label>
                <input type="text" name="location" value={building.location} required
                onChange={handleChangeInput}/>

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
