import mongoose  from "../database/index.js";

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    start:{
        type:Date,
        default:Date.now
    },
    end:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

export const Event = mongoose.model('Event', eventSchema)