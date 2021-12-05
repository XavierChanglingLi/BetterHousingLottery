import React, {createContext, useState, useEffect} from 'react'
import RoomsAPI from './api/RoomsAPI'
import StudentAPI from './api/StudentAPI'
import BuildingsAPI from './api/BuildingsAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/student/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        roomsAPI: RoomsAPI(),
        studentAPI: StudentAPI(token),
        buildingsAPI: BuildingsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}