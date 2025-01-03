import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default (req, res, next) =>{
    
    const token = req.headers.authorization
    if(!token)
        res.status(401).send({error:'No token provided'})

    try{
        const decode = jwt.verify(token, process.env.SECRET);
        req.userId = decode.id
        next()
    }catch(e){
        res.status(401).send({error:'invalid toker'})
    }

}