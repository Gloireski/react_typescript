const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'trello_clone',
    'root',
    'Belem235',
    {
        host: 'localhost',
        dialect: 'mysql'
  });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
})
sequelize.sync({ force: true })
    .then(() => {
        console.log('Database and table created')
})
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = { sequelize };