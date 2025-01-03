import mongoose  from "../database/index.js";
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next();
})
export const User = mongoose.model('User', userSchema)