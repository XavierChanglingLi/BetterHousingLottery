import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

const initialState = {
    building:'',
    floor:'',
    elevator:'',
    occupancy:''
}


function Filters() {
    const state = useContext(GlobalState)
    const [buildings] = state.buildingsAPI.buildings

    const [query, setQuery] = state.roomsAPI.query

    const [sort, setSort] = state.roomsAPI.sort
    const [search, setSearch] = state.roomsAPI.search

    const handleChange = e => {
        const {name, value} = e.target
        setQuery({...query, [name]:value})
    }
    
    const buttonHandler= e => {
        setQuery(initialState)
    }
    

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="building" value={query.building} onChange={handleChange}  >
                    <option value=''>All Rooms</option>
                    {
                        buildings.map(building => (
                            <option value={"building=" + building._id} key={building._id}>
                                {building.name}
                            </option>
                        ))
                    }
                </select>
                <select name="floor" value={query.floor} onChange={handleChange} >
                    <option value=''>All Floors</option>
                    <option value='floor=0'>Ground Floor</option>
                    <option value='floor=1'>Floor 1</option>
                    <option value='floor=2'>Floor 2</option>
                    <option value='floor=3'>Floor 3</option>
                    <option value='floor=4'>Floor 4</option>
                </select>
                <select name='elevator' value={query.elevator} onChange={handleChange} >
                    <option value=''>Elevator Access</option>
                    <option value='elevator=1'>Has Elevator</option>
                    <option value='elevator=0'>No Elevator</option>
                </select>
                <select name='occupancy' value={query.occupancy} onChange={handleChange} >
                    <option value=''>Occupancy</option>
                    <option value='occupancy=1'>Single</option>
                    <option value='occupancy=2'>Double</option>
                    <option value='occupancy=3'>Triple</option>
                    <option value='occupancy=4'>Quad</option>
                    <option value='occupancy=5'>5-Person</option>
                    <option value='occupancy=6'>6-Person</option>
                    <option value='occupancy=7'>7-Person</option>
                    <option value='occupancy=8'>8-Person</option>
                </select>
            </div>
            <div>
                <button className="reset_button" onClick={buttonHandler}>Reset Search</button>
            </div>

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=occupancy'>Occupancy: Low-High</option>
                    <option value='sort=-occupancy'>Occupancy: High-Low</option>
                    <option value='sort=-area'>Area: Large-Small</option>
                    <option value='sort=area'>Area: Small-Large</option>
                    <option value='sort=-popularity'>Popularity: High-Low</option>
                    <option value='sort=popularity'>Popularity: Low-High</option>
                    <option value='sort=distToBath'>Distance To Bathroom: Far-Near</option>
                    <option value='sort=-distToBath'>Distance To Bathroom: Near-Far</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
