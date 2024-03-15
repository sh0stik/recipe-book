const Recipe = require('./recipe');
const RecipeIngredients = require('./recipeIngredient');

Recipe.hasMany(RecipeIngredients, {
  foreignKey: 'recipe_id',
  as: 'recipeIngredients'
});

RecipeIngredients.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
  as: 'recipe'
});

module.exports = {
  Recipe,
  RecipeIngredients
};