const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Autorise uniquement le frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

const { sequelize } = require('./db')
// const AppData = require('./model')


const port = 5000

app.use(express.json())
app.use(cors(corsOptions))

app.post('/save', (req, res) => {
  const { lists } =  req.body
  console.log(lists)
  res.status(200).json({ message: 'save!'})
})

app.get('/load', (req, res) => {
  AppData = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }],
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        },
    ],
    draggedItem: null
}
  res.status(203).json(AppData)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router