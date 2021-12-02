/* We are exporting a function,
    so that another file can use it.
*/
module.exports = (sequelize, DataTypes) => {
    /* We are creating a student table with
        data properties. In SQL, these would be
        the columns and their datatypes.

        Columns are name, starID, present.
    */
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    /* Create the table, force = true means override
        any old tables we might have, like a DROP
        in SQL.
    */
    Student.sync({force: false})
        .then( () => {
            console.log('Synced student table.')
        })

    return Student
}
