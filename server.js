require('dotenv').config()

const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()


app.listen('4213', ()=>{
    console.log('App is running on 4213')
})