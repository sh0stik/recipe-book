import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function RecipeDetails({ recipe }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const deleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:4004/recipes/${recipe.recipe_id}`);
            // handle deletion in parent component
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const editRecipe = () => {
        // handle editing in parent component
    };

    return (
        <div className={`recipe-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
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
        </div>
    );
}

export function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const handleDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
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
                <RecipeDetails key={recipe.recipe_id} recipe={recipe} />
            ))}
        </div>
    );
}
