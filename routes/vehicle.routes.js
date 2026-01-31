const express=require('express')
const router=express.Router()
const vehicleCtrl=require('../controllers/vehicle.controller')
const rateLimiter=require('../middlewares/rateLimiter')

router.post('/add',rateLimiter,vehicleCtrl.addVehicle)
router.patch('/assign-driver/:vehicleid',vehicleCtrl.assignDriver)
router.get('/:vehicleid',vehicleCtrl.getVehicleById)

module.exports=router