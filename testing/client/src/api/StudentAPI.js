import {useState, useEffect} from 'react'
import axios from 'axios'

function StudentAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [queue, setQueue] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getStudent = async () =>{
                try {
                    const res = await axios.get('/student/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setQueue(res.data.queue)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getStudent()

        }
    },[token])



    const addQueue = async (room) => {
        if(!isLogged) return alert("Please login to continue")

        const check = queue.every(item =>{
            return item._id !== room._id
        })

        if(check){
            setQueue([...queue, {...room, quantity: 1}])

            await axios.patch('/student/addqueue', {queue: [...queue, {...room, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This rooms has been added to queue.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        queue: [queue, setQueue],
        addQueue: addQueue,
        history: [history, setHistory]
    }
}

export default StudentAPI