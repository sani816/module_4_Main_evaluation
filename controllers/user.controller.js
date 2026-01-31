const supabase=require('../config/supabase')

exports.signUp=async(req,res)=>{
    const{name,email,password,role}=req.body

    const validRoles=['customer','owner','driver']

    if(!validRoles.includes(role)){
        return
        res.status(400).json({message:"invalid role.must be customer,owner,or driver"})
    }

    const{data,error}=await supabase
    .from('user_new')
    .insert([{name,email,password,role}])
    .select()

    if(error){
        return
        res.status(400).json({message:error.message})
    }
    res.status(201).json({message:"user created succesfully",user:data[0]})
}