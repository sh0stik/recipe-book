require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env

const {seed, getRecipes, getIngredients} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.get('/recipes', getRecipes)
app.get('/ingredients', getIngredients)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))