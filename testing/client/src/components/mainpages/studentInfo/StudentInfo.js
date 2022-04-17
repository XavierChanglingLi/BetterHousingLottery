import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from '../rooms/Filters'
import {Link} from 'react-router-dom';

const Student = props=>(
    <tr>
        <td>{props.student.studentID}</td>
        <td>{props.student.name}</td>
        <td>{props.student.classYear}</td>
        <td>{props.student.gender}</td>
        <td>{props.student.specialNeeds}</td>
        <td>{props.student.housingType}</td>
        <td>{props.student.assignedRoom}</td>
        <td>{props.student.email}</td>
        <td>{props.student.password}</td>
        <td>
            <Link to={'edit/'+props.student._id}>edit</Link> | <a href='#' onClick={() =>props.deleteStudent(props.student._id)}>delete</a>
        </td>
    </tr>
)

function StudentInfo() {
    const state = useContext(GlobalState)
    const [students, setStudents] = state.studentsAPI.students
    const [isAdmin] = state.studentAPI.isAdmin
    const [token] = state.token
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [callback, setCallback] = state.studentsAPI.callback


    const handleCheck = (id) =>{
        students.forEach(student => {
            if(student._id === id) student.checked = !student.checked
        })
        setStudents([...students])
    }

    const deleteStudent = async(id) => {
        try {
            setLoading(true)
            const deleteStudent = axios.delete(`/api/students/${id}`, {
                headers: {Authorization: token}
            })
            await deleteStudent
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        students.forEach(student => {
            student.checked = !isCheck
        })
        setStudents([...students])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        students.forEach(student => {
            if(student.checked) deleteStudent(student._id)
        })
    }

    const studentList=()=>{
        return students.map(currentstudent => {
            //Comment component has three props
            return <Student room={currentstudent} deleteRoom={deleteStudent} key={currentstudent._id}/>
        })
    }

    if(loading) return <div><Loading /></div>

    return(
        <>
            <Filters/>
            <table>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Class Year</th>
                    <th>Gender</th>
                    <th>Special Needs</th>
                    <th>Housing Type</th>
                    <th>Assigned Room</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                <tbody>
                { studentList()}
                </tbody>
            </table>
        </>
    )
}

export default StudentInfo