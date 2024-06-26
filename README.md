# Recipe Book
Recipe Book is a web application designed to help you manage your favorite recipes.  Save, update, and delete them with ease, or search for new culinary inspiration. Recipe Book keeps your kitchen organized and your taste buds happy!

## MVP Goals:
* Users can search for recipes based on ingredient or recipe name
* Users can add favorite recipes 
* Users can view recipe details and instructions
* Users can delete recipe

## Technologies
* JavaScript
* Express
* PostgreSQL
* React
* Node.js 
* HTML
* CSS

## Recipe Book app
### Home page
On the Home page User can search for a new recipe

![Home page](/screenshoots/home.png)
### Recipes
Recipes page shows all added recipes 

![All recipes](/screenshoots/recipes.png)
### Recipe card
Recipe card shows full recipe information (title, description, instructions, ingredients)

![Recipe card](/screenshoots/recipe%20card.png)
### Edit recipe
User can edit any field in recipe, to save changes - needs to click 'Save'

![Edit recipe](/screenshoots/edit.png)
### Add recipe
From Add recipe page User can save their own recipes

![Add recipe](/screenshoots/add.png)

## Getting Started
* Clone or download the repository
* Open the folder with the app and install all dependencies by running `npm install` 
* Create `.env` file and add `SERVER_PORT=`, `CONNECTION_STRING=postgresql://postgres:${PASSWORD}@${SERVER}:${PORT}/${YOU_DATABASE_NAME}`, and `API_KEY=` for [Edamam api](https://www.edamam.com/) 
* Run server by `node server/server.js`
* Go to recipe-book folder and run `npm install` 
* Run fronend by `npm start`
* Seed data base `http://${SERVER}:${PORT}/seed`

