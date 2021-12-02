let express = require('express')
// This will fetch whatever index.js exports.
let db = require('../models')
let Student = db.Student

// Matches requests that functions can respond to.
let router = express.Router()

// Find all student data and return it in JSON format.
router.get('/students', function (req, res, next) {
    Student.findAll({ order: ['present', 'starID'] }).then( students => {
        return res.json(students)
    }).catch(err => next(err))
})

/* The req object contains information we can use.
    It is inside the json body that is returned.
    Any JSON that the client sends to the server.

    Every response a server sends has a response status code.
    201 means that we successfully created a resource.

    Then this is going to create a new student object using the data, 
    the body of the request that's sent, and then return a status code 201 which is convention for "something has been created"
    and send a message back that says, OK
*/
router.post('/students', function (req, res, next) {
    Student.create(req.body).then( data => {
        return res.status(201).send('Successfully created!')
    }).catch(err => {
        // handle errors
        if (err instanceof db.Sequelize.ValidationError) {
            // send back a 400 error code
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        }

        // handle something unexpected here
        return next(err)
    })
})

router.patch('/students/:id', function (req, res, next) {
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, { where: { id: studentID } })
        .then((rowsModified) => {
            let numberOfRowsModified = rowsModified[0] // number of rows changed 
            if (numberOfRowsModified == 1) { // this is exacly one row
                return res.send('Update successful!')
            } else {
                res.status(404).json(['Student with that ID not found.'])
            }
        }).catch(err => { // these are client errors
            // if it is a validation error, it is a bad request
            if (err instanceof db.Sequelize.ValidationError) {
                // tell the user we got bad data
                let messages = err.errors.map(e => e.message) 
                return res.status(400).json(messages)
            } else {
                // we got an unexpected error
                return next(err)
            }
        })
})

router.delete('/students/:id', function (req, res, next) {
    let studentID = req.params.id
    Student.destroy({ where: { id: studentID }})
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) {
                return res.send('Deleted!')
            } else {
                return res.status(404).send('Not found.')
            }
        }).catch(err => next(err)) // errors which are unexpected!
})

// Make our router available elsewhere.
module.exports = router
