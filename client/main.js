const express = require('express')
const app = express()

app.use('/', express.static('./build'))

app.listen(1410, () => console.log('Client started at 3001'))