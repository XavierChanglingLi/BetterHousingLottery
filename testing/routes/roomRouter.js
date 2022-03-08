const router = require('express').Router()
const roomCtrl = require('../controllers/roomCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/rooms')
    .get(roomCtrl.getRooms)
    .post(auth, authAdmin, roomCtrl.createRoom)


router.route('/rooms/:id')
    .delete(auth, authAdmin, roomCtrl.deleteRoom)
    .put(auth, authAdmin, roomCtrl.updateRoom)

router.patch('/rooms/incrementpop/:id', auth, roomCtrl.incrementPop)
router.patch('/rooms/decrementpop/:id', auth, roomCtrl.decrementPop)



module.exports = router