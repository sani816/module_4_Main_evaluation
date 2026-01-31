const fs=require('fs')

const logger=(req,res,next)=>{
    const logEntry=`${req.method}|${req.url}|${new Date().toISOString()}\n`
    fs.appendFileSync('logs.txt',logEntry)
    next()
}

module.exports=logger