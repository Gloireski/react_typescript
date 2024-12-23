const { DataTypes } = require('sequelize')
const { sequelize } = require('./db')

const AppData = sequelize.define(
    'AppData',
    {
        id: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
        tasks: {
            type: DataTypes.ARRAY,
        }
    },
    {
        timestamps: false,
    },
)

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Database and table created')
//     })
module.exports = AppData;