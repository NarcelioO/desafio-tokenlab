import { User } from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (params = {})=>{
    return jwt.sign(params,process.env.SECRET,{
        expiresIn:84600
    })
}

const authController = {
    
    async login(req, res){
        const {email, password} = req.body

        const user = await User.findOne({email}).select('+password')

        if(!user)
            return res.status(400).send({error : "user not found"})
        

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error:'invalid password'})

        user.password = undefined

        res.send({
            user, 
            token: generateToken({id:user.id})
        })
    },

    async register(req, res){
        const {email} = req.body
        try{
            if(await User.findOne({email}))
                return res.status(400).send({error: 'User already exists'})


            const user = await User.create(req.body)

            user.password = undefined

            res.send({
                user,
                token:generateToken({id:user.id})
            })

        }catch(erro){
            console.log(erro)
        }
    },

}

export default authController;