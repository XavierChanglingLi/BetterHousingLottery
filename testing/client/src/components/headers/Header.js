import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.studentAPI.isLogged
    const [isAdmin] = state.studentAPI.isAdmin
    const [queue] = state.studentAPI.queue
    const [menu, setMenu] = useState(false)

    const logoutStudent = async () =>{
        await axios.get('/student/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_room">Create Room</Link></li>
                <li><Link to="/building">Buildings</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/" onClick={logoutStudent}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'Housing'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'Rooms' : 'Housing'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login + Register</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{queue.length}</span>
                    <Link to="/queue">
                        <p>Queue</p>
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
