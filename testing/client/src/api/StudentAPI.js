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


                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            axios.get('/student/queue', {
                headers: {Authorization: token}
            }).then((res)=>{
                console.log(res) 
                setQueue(res.data)
            })

            getStudent()

        }
    },[token])



    const addQueue = async (room) => {
        if(!isLogged) return alert("Please login to continue")

        const currentRoomIds = queue.map(item =>{
            return item._id
        })

        if(!currentRoomIds.includes(room._id)){
            setQueue([...queue, {...room, quantity: 1}])

            await axios.patch('/student/addqueue', {queue: [...queue, room._id]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This room has already been added to your queue!")
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