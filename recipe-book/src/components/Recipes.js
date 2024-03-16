import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function RecipeDetails({ recipe }) {
    let [isExpanded, setIsExpanded] = useState(false);
    let [isEditing, setIsEditing] = useState(false);

    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:4004/recipes/${recipe.recipe_id}`);
            handleDelete(recipe.recipe_id);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const editRecipe = () => {
        setIsEditing(true);
        // handle editing in parent component
    };
    const saveOrCancelRecipe = () => {
        setIsEditing(false);
    };

    return (
        <div className={`recipe-card ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}>

            {isEditing ? (
                <>
                    <form onSubmit={saveOrCancelRecipe}>
                        <label>
                            Recipe Name:
                            <input type="text" value={recipe.recipe_name} onChange={e => editRecipe({ ...recipe, recipe_name: e.target.value })} />
                        </label>
                        <label>
                            Description:
                            <input type="text" value={recipe.recipe_description} onChange={e => editRecipe({ ...recipe, recipe_description: e.target.value })} />
                        </label>
                        <label>
                            Instructions:
                            <input type="text" value={recipe.recipe_instructions} onChange={e => editRecipe({ ...recipe, recipe_instructions: e.target.value })} />
                        </label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <h4>Ingredient {index + 1}</h4>
                                <label>
                                    Ingredient Name:
                                    <input type="text" value={ingredient.ingredient_name} onChange={e => editRecipe({ ...recipe, ingredients: [...recipe.ingredients.slice(0, index), { ...ingredient, ingredient_name: e.target.value }, ...recipe.ingredients.slice(index + 1)] })} />
                                </label>
                                <label>
                                    Quantity:
                                    <input type="text" value={ingredient.quantity} onChange={e => editRecipe({ ...recipe, ingredients: [...recipe.ingredients.slice(0, index), { ...ingredient, quantity: e.target.value }, ...recipe.ingredients.slice(index + 1)] })} />
                                </label>
                            </div>
                        ))}
                        <button type="submit">Save</button>
                        <button type="button" onClick={saveOrCancelRecipe}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h3>{recipe.recipe_name}</h3>
                    <p>{recipe.recipe_description}</p>
                    <p>{recipe.recipe_instructions}</p>

                    {isExpanded && (
                        <>
                            <h4>Ingredients:</h4>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.ingredient_id}>
                                        {ingredient.quantity} {ingredient.units} {ingredient.ingredient_name}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={(e) => { e.stopPropagation(); deleteRecipe(); }}>Delete</button>
                            <button onClick={(e) => { e.stopPropagation(); editRecipe(); }}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const handleDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
        lopadRecipes();
    };

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:4004/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadRecipes();
    }, []);

    return (
        <div id="recipe-grid">
            <h2>All Recipes</h2>
            {recipes.map((recipe) => (
                <RecipeDetails key={recipe.recipe_id} recipe={recipe} handleDelete={handleDelete}/>
            ))}
        </div>
    );
}
