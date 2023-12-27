const express = require('express')
const app = express()

// const apiRouter = require('./api.js')

// app.use('/api', apiRouter)
app.use('/', express.static('../client/build'))
app.use('/new', express.static('../client/build'))

app.listen(3001, () => console.log('App started'))