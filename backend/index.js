import express from 'express'
import router from './src/routes/routes.js'
import cors from 'cors'
const app = express()
app.use(express.json())


const corsOptions = {
    origin:'http://localhost:5173',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use('/api', router)


app.listen(3000,()=>{
    console.log("server iniciated")
})