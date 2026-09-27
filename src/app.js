const express = require('express')
const authrouter = require('./routes/auth.routes')
const promptrouter = require('./routes/prompts.routes')
const uploadRouter = require('./routes/upload.routes')
const cookieparser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authrouter)
app.use('/api/prompt', promptrouter)
app.use('/api', uploadRouter)

module.exports = app