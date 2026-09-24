const express = require('express')
const authrouter = require('./routes/auth.routes')
const promptrouter = require('./routes/prompts.routes')
const cookieparser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authrouter)
app.use('/api/prompt', promptrouter)


module.exports = app  