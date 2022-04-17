import {useState, useEffect} from 'react'
import axios from 'axios'

function StudentsAPI() {
    const [students, setStudents] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getStudents = async () => {
            const res = await axios.get(`/api/students?limit=${page*9}`)
            setStudents(res.data.students)
            setResult(res.data.result)
        }
        getStudents()
    },[callback, sort, search, page])



    return {
        students: [students, setStudents],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default StudentsAPI
