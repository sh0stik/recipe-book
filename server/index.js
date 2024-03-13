require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed } = require('./controllers/seed')
const { getRecipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById, addQuantity}  = require('./controllers/recipesController')
const { getIngredients, addIngredient, updateIngredient, deleteIngredient, getIngredientById}  = require('./controllers/ingredientsController')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('node_modules'))

app.post('/seed', seed)

app.get('/recipes', getRecipes)
app.get('/recipes/:recipe_id', getRecipeById)
app.post('/recipes', addRecipe)
app.put('/recipes/:recipe_id', updateRecipe)
app.delete('/recipes/:recipe_id', deleteRecipe)

app.get('/ingredients', getIngredients) 
app.post('/ingredients', addIngredient)
app.put('/ingredients/:ingredient_id', updateIngredient)
app.delete('/ingredients/:ingredient_id', deleteIngredient)
app.get('/ingredients/:ingredient_id', getIngredientById)

app.post('/quantity', addQuantity)


app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))