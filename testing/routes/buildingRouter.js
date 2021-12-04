const router = require('express').Router()
const buildingCtrl = require('../controllers/buildingCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/building')
    .get(buildingCtrl.getBuildings)
    .post(auth, authAdmin, buildingCtrl.createBuilding)

router.route('/building/:id')
    .delete(auth, authAdmin, buildingCtrl.deleteBuilding)
    .put(auth, authAdmin, buildingCtrl.updateBuilding)


module.exports = router