import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const loadRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:4004/recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
        loadRecipes();
    };

    const handleSave = (recipe) => {
        setRecipes([...recipes, recipe]);
    };

    useEffect(() => {
        loadRecipes();
    }, []);


    return (
        <div id="recipe-grid">
            <h2>All Recipes</h2>
            {recipes.map((recipe) => (
                <RecipeDetails key={recipe.recipe_id} recipe={recipe} handleDelete={handleDelete} handleSave={handleSave} />
            ))}
        </div>
    );
}

export function RecipeDetails({ recipe, handleDelete, handleSave }) {
    let [isExpanded, setIsExpanded] = useState(false);
    let [isEditing, setIsEditing] = useState(false);
    const [recipeToUpdate, setRecipe] = useState(recipe);

    useEffect(() => {
        setRecipe(recipe);
    }, [recipe]);


    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:4004/recipes/${recipe.recipe_id}`);
            handleDelete(recipe.recipe_id);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const editRecipe = async () => {
        setIsEditing(true);
    };

    const saveRecipe = async () => {
        try {
            await axios.put(`http://localhost:4004/recipes/${recipe.recipe_id}`, recipeToUpdate);
        }
        catch (error) {
            console.error('Error:', error);
        }
        setIsEditing(false);
        setIsExpanded(true);
        handleSave(recipeToUpdate);
    }

    const cancelRecipe = () => {
        setIsEditing(false);
        setIsExpanded(true);
    };
    const units = ["gram", "kilogram", "milliliter", "liter", "piece", "teaspoon", "tablespoon", "cup", "ounce", "pound"];

    return (
        <div className={`recipe-card ${isExpanded ? 'expanded' : ''}`}
            onClick={() => !isExpanded && setIsExpanded(true)}>

            {isEditing ? (

                <>
                    <form className='update-form'onSubmit={saveRecipe}>
                        <h2>Edit Recipe</h2>
                        <label>
                            Recipe Name:
                            <input type="text" value={recipeToUpdate.recipe_name} onChange={e => setRecipe({ ...recipeToUpdate, recipe_name: e.target.value })} />
                        </label>
                        <label>
                            Description:
                            <input type="text" value={recipeToUpdate.recipe_description} onChange={e => setRecipe({ ...recipeToUpdate, recipe_description: e.target.value })} />
                        </label>
                        <label>
                            Instructions:
                            <input type="text" value={recipeToUpdate.recipe_instructions} onChange={e => setRecipe({ ...recipeToUpdate, recipe_instructions: e.target.value })} />
                        </label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <h4>Ingredient {index + 1}</h4>
                                <label>
                                    Ingredient Name:
                                    <input type="text" value={ingredient.ingredient_name} onChange={e => setRecipe({ ...recipeToUpdate, ingredients: [...recipeToUpdate.ingredients.slice(0, index), { ...ingredient, ingredient_name: e.target.value }, ...recipeToUpdate.ingredients.slice(index + 1)] })} />
                                </label>
                                <label>
                                    Quantity:
                                    <input type="text" value={ingredient.quantity} onChange={e => setRecipe({ ...recipeToUpdate, ingredients: [...recipeToUpdate.ingredients.slice(0, index), { ...ingredient, quantity: e.target.value }, ...recipeToUpdate.ingredients.slice(index + 1)] })} />
                                </label>
                                <label>
                                    Units:
                                    <select value={ingredient.units} onChange={e => setRecipe({ ...recipeToUpdate, ingredients: [...recipeToUpdate.ingredients.slice(0, index), { ...ingredient, units: e.target.value }, ...recipeToUpdate.ingredients.slice(index + 1)] })}>
                                        {units.map((unit, unitIndex) => (
                                            <option key={unitIndex} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        ))}
                        <div className="button-container">
                            <button type="submit">Save</button>
                            <button type="button" onClick={cancelRecipe}>Cancel</button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h3>{recipe.recipe_name}</h3>
                    <p>{recipe.recipe_description}</p>
                    <p>{recipe.recipe_instructions}</p>

                    {isExpanded && (
                        <><button className="close-button" onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}>X</button>
                            <h4>Ingredients:</h4>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.ingredient_id}>
                                        {ingredient.quantity} {ingredient.units} {ingredient.ingredient_name}
                                    </li>
                                ))}
                            </ul>
                            <button id='delete-button' onClick={(e) => { e.stopPropagation(); deleteRecipe(); }}>Delete</button>
                            <button id='edit-button' onClick={(e) => { e.stopPropagation(); editRecipe(); }}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}