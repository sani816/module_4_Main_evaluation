const supabase=require('../config/supabase')

exports.createTrip=async(req,res)=>{
    const{customer_id,vehicle_id,start_date,location,passengers}=req.body


        const{data:vehicle,error:vError}=await
        supabase
        .from('vehicles')
        .select("isAvailable",allowed_passengers)
        .eq('id',vehicle_id)
        .single()

        if(vError||!vehicle)return
        res.status(404).json({message:"vehicle not found"})

        if(!vehicle.isAvailable){
            return
            res.status(400).json({message:"selelcted vehicle is not available"})
        }


        if(passengers>vehicle.allowed_passengers){
            return
            res.status(400).json({message:"no of passengers exceeds vehicle capacity"})
        }
    const{data:trip,error:tError}=await
    supabase
    .from('trips')
    .insert([{customer_id,vehicle_id,start_date,location,passengers,isCompleted:false}])
    .select()

    if(tError) throw tError

    await supabase.from('vehicles').update({isAvailable:false})
    .eq('id',vehicle_id)

    res.status(201).json(trip[0])

}

exports.endTrip=async(req,res)=>{
    const{tripid}=req.params
    const{distance_km}=req.body

    const{data:trip,error:tError}=await supabase
    .from('trips')
    .select('*,vehicles(rate_per_km)')
    .eq('id',tripid)
    .single()

    if(tError||!trip)return
    req.status(404).json({message:"Trip not found"})


    

    const tripCost=distance_km*trip.vehicle.rate_per_km

    const{error:updateError}=await
    supabase.from('trips')
    .update({isCompleted:true,tripCost,distance_km,end_date:new Date()})
    .eq('id',tripid)

    if(updateError)throw updateError

    await supabase
    .from('vehicles').update({isAvailable:true}).eq('id',trip.vehicle_id)

    res.json({message:"Trip ended succesfully",tripCost})

}

exports.getTripById=async(req,res)=>{
    const{data,error}=await
    supabase.from('trips').select('*,vehicles(*)')
    .eq('id',req.params.tripid).single()

    if(error)return

    res.status(404).json({message:"Trip not found"})

    res.json(data)

}

exports.updateTrip=async(req,res)=>{
    const{data,error}=await
    supabase.from('trips').update(req.body)
    .eq('id',req.params.tripid).single()

    if(error)return

    res.status(400).json(error)


    res.json(data[0])
}


