require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed } = require('./controllers/seed')
const {addOrUpdateRecipe, getRecipe, getRecipes, deleteRecipe} = require('./controllers/recipeDtoController')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('node_modules'))

app.post('/seed', seed)

app.get('/recipes', getRecipes)
app.get('/recipes/:recipe_id', getRecipe)
app.post('/recipes', addOrUpdateRecipe)
app.put('/recipes/:recipe_id', addOrUpdateRecipe)
app.delete('/recipes/:recipe_id', deleteRecipe)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))