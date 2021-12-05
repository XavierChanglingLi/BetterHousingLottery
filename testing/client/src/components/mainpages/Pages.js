import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Rooms from './rooms/Rooms'
import DetailRoom from './detailRoom/DetailRoom'
import Login from './auth/Login'
import Register from './auth/Register'
import Queue from './queue/Queue'
import NotFound from './utils/not_found/NotFound'
import Buildings from './buildings/Buildings'
import CreateRoom from './createRoom/CreateRoom'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.studentAPI.isLogged
    const [isAdmin] = state.studentAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Rooms} />
            <Route path="/detail/:id" exact component={DetailRoom} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/building" exact component={isAdmin ? Buildings : NotFound} />
            <Route path="/create_room" exact component={isAdmin ? CreateRoom : NotFound} />
            <Route path="/edit_room/:id" exact component={isAdmin ? CreateRoom : NotFound} />



            <Route path="/queue" exact component={Queue} />


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
