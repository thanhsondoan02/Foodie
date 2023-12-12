const express = require('express')
const app = express()

// const apiRouter = require('./api.js')

// app.use('/api', apiRouter)
app.use('/', express.static('../Foodie/client'))

app.listen(5174, () => console.log('Server ready'))