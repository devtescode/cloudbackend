const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const env = require ('dotenv').config()
const PORT = process.env.PORT
const URI = process.env.URI
const cors = require('cors')
const userRoutes = require("./Routes/user.routes")

mongoose.connect(URI)
.then(()=>{
    console.log("Mongo connect successful to database");
}).catch((err)=>{
    console.log(err);
})

app.listen(PORT, ()=>{
    console.log("server is running at port 3500");
})

app.use(cors())
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))
app.use("/cloud", userRoutes)