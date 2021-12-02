let { Sequelize, DataTypes } = require('sequelize')
const student = require('./student')

/* We need to figure out which DB to connect to.
    Use an environment variable for Heroku, otherwise,
    If the app runs locally on your computer, it will
    use the 'development' option, which uses sqlite3.
*/
let env = process.env.NODE_ENV || 'development'

// Look inside our current directory and apply the config.json file.
let config = require(__dirname + '/../config.json')[env]

let db = {}

let sequelize

// Figure out how to connect to the database.
// Heroku or locally?

// Heroku, use postgres.
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    // Locally, use base config file.
    sequelize = new Sequelize(config)
}

// We are returning a function to be used here.
let studentModel = require('./student')(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize // info on how to connect to the DB
db.Sequelize = Sequelize // reference to the Sequelize Library

module.exports = db
