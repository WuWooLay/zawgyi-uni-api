// SetUp
const express = require('express')
const app = express()
const glob = require('glob')
const cors = require('cors')
const bodyParser = require('body-parser')

// Morgan for Log
const morgan = require('morgan')
app.use(morgan('dev'))

// BodyParser For Request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Using Cors
app.use(cors())

// Express Use Static Public
app.use(express.static('public'))

// All Api Routes Getting
const routes = glob.sync('./routes/api/*.js')
routes.forEach((route, i) => {
	require(route)(app)
})

// Expect Routes 404 Message
app.all('*', (req, res) => {
	res.status(404).json({ message: '404 Not Found' })
})

// Server Listening
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server At Running Port ${port}`))
