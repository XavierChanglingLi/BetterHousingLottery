const Students = require('../models/studentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentCtrl = {
    register: async (req, res) =>{
        try {
            const {studentID, name, classYear, gender, email, password} = req.body;//change HTML

            const student = await Students.findOne({email})
            if(student) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newStudent = new Students({
                studentID, name, classYear, gender, email, password: passwordHash
            })

            // Save mongodb
            await newStudent.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newStudent._id})
            const refreshtoken = createRefreshToken({id: newStudent._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/student/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const student = await Students.findOne({email})
            if(!student) return res.status(400).json({msg: "Student does not exist."})

            const isMatch = await bcrypt.compare(password, student.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: student._id})
            const refreshtoken = createRefreshToken({id: student._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/student/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/student/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, student) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: student.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    getStudent: async (req, res) =>{
        //TODO: dynamically pull rooms by ID (not entire object) for the queue.
        try {
            const student = await Students.findById(req.student.id).select('-password')
            if(!student) return res.status(400).json({msg: "Student does not exist."})

            res.json(student)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addQueue: async (req, res) =>{
        try {
            const student = await Students.findById(req.student.id)
            if(!student) return res.status(400).json({msg: "Student does not exist."})

            await Students.findOneAndUpdate({_id: req.student.id}, {
                queue: req.body.queue
            })

            return res.json({msg: "Added to queue"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({student_id: req.student.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


const createAccessToken = (student) =>{
    return jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (student) =>{
    return jwt.sign(student, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = studentCtrl

