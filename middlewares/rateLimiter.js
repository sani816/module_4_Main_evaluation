const store={}



const rateLimiter=(req,res,next)=>{
    const ip=req.ip
    const now=Date.now()

    if(!store[ip])
         store[ip]=[]
    store[ip]=store[ip].filter(timestamp=>now-timestamp<60000)

    if(store[ip].length>=3){
        return
        res.status(429).json({message:"maximum 3 request per minute per ip"})
    }
    store[ip].push(now)
    next()
}
module.exports=rateLimiter