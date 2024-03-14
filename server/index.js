require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed } = require('./controllers/seed')
const { getRecipes, addRecipe, updateRecipe, deleteRecipe, getRecipeById } = require('./controllers/recipesController')
const { getIngredients, addIngredient, updateIngredient, deleteIngredient, getIngredientById, getIngredientByName } = require('./controllers/ingredientsController')
const { getIngredientsAndQuantityByRecipeId, addQuantity, updateQuantity } = require('./controllers/recipeIngredientsController')

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
app.get('/ingredients/name/:ingredient_name', getIngredientByName)

app.get('/recipe/ingredients/:recipe_id', getIngredientsAndQuantityByRecipeId)

app.post('/quantity', addQuantity)
app.put('/quantity', updateQuantity)


app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))