const express=require('express')

const router=express.Router()
const tripCtrl=require('../controllers/trip.controller')

router.post('/create',tripCtrl.createTrip)

router.patch('/update/:tripid',tripCtrl.updateTrip)

router.get('/:tripid',tripCtrl.getTripById)

module.exports=router