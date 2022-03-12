const router = require('express').Router()
const studentCtrl = require('../controllers/studentCtrl')
const auth = require('../middleware/auth')

router.post('/register', studentCtrl.register)

router.post('/login', studentCtrl.login)

router.get('/logout', studentCtrl.logout)

router.get('/refresh_token', studentCtrl.refreshToken)

router.get('/infor', auth,  studentCtrl.getStudent)

router.patch('/addqueue', auth, studentCtrl.addQueue)

router.get('/history', auth, studentCtrl.history)



module.exports = router