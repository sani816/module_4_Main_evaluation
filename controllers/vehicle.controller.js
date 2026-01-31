const supabase=require('../config/supabase')

exports.addVehicle=async(req,res)=>{
    const{name,registration_number,allowed_passengers,rate_per_km,owner_id}=req.body
    const{data,error}=await
    supabase
    .from('vehicles')
    .insert([{name,registration_number,allowed_passengers,rate_per_km,owner_id,isAvailable:true}])
    .select()

    if(error)return
    res.status(400).json({message:error.message})

    res.status(201).json({message:"vehicle added succesfully",vehicle:data[0]})
}

exports.assignDriver=async(req,res)=>{
    const{vehicleid}=req.params
    const{driver_id}=req.body
    const{data,error}=await
    supabase
    .from('vehicles')
    .update({driver_id})
    .eq('id',vehicleid)
    .select()

    if(error)return
    res.status(400).json({message:error.message})

    res.status(201).json({message:"Driver assign succesfully",vehicle:data[0]})
}

exports.getVehicleById=async(req,res)=>{
    const{vehicleid}=req.params
    const{data,error}=await
    supabase
    .from('vehicles')
    .select('*,user_new!owner_id(name)')
    .eq('id',vehicleid)
    .select()

    if(error)return
    res.status(404).json({message:"vehicle not found"})
    res.json(data)
}