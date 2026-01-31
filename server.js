const express=require('express')
const logger=require('./middlewares/logger')
require('dotenv').config()


const app=express()
app.use(express.json())
app.use(logger)

app.use('/users',require('./routes/user.routes'))

app.use('/vehicles',require('./routes/vehicle.routes'))

app.use('/trips',require('./routes/trip.routes'))

app.use((req,res)=>{
    res.status(404).send("This request is not found")
})

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})