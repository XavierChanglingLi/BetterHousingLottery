import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [student, setStudent] = useState({
        studentID:'', name:'', classYear: '', gender: '', email:'', password:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setStudent({...student, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/student/register', {...student})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="studentID" required autoComplete="on"
                       placeholder="studentID" value={student.studentID} onChange={onChangeInput} />

                <input type="text" name="name" required
                placeholder="Name" value={student.name} onChange={onChangeInput} />

                <input type="text" name="classYear" required
                placeholder="Class Year" value={student.classYear} onChange={onChangeInput} />

                <input type="text" name="gender" required
                placeholder="Gender" value={student.gender} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={student.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={student.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register