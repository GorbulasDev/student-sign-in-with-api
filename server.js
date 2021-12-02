const express = require('express')
const api_routes = require('./routes/api')
const path = require('path')

// Create our web app.
const app = express()

const vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')

app.use(express.static(vueClientPath))

/* Make sure that we're able to process JSON bodies.
    Remember, a req body can contain more than just JSON.
    Convert to JavaScript.
*/
app.use(express.json())

// Server will look for these routes inside api_routes once we hit /api
app.use('/api', api_routes)

// Handler for requests with routes we don't have.
// Respond with a 404 error.
app.use(function(req, res, next) {
    res.status(404).send('Not found!')
})

// Handler for errors.
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error!')
})

// Start the server. 
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running port', server.address().port)
})
