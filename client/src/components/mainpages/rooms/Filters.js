import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [buildings] = state.buildingsAPI.buildings

    const [building, setBuilding] = state.buildingsAPI.building
    const [sort, setSort] = state.buildingsAPI.sort
    const [search, setSearch] = state.buildingsAPI.search


    const handleBuilding = e => {
        setBuilding(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="building" value={building} onChange={handleBuilding} >
                    <option value=''>All Rooms</option>
                    {
                        buildings.map(building => (
                            <option value={"building=" + building._id} key={building._id}>
                                {building.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=Occupancy'>Occupancy: Low-High</option>
                    <option value='sort=-Occupancy'>Occupancy: High-Low</option>
                    <option value='sort=-area'>Area: Large-Small</option>
                    <option value='sort=area'>Area: Small-Large</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
