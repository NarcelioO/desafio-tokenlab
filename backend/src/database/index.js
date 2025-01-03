import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/tokenlab')
    .then(()=>console.log("Connected to mongo"))
    .catch((err)=>console.log(err))

export default mongoose



