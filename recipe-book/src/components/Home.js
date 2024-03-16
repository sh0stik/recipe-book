import React, { useState } from 'react';

export function Home() {
    const [inputValue, setInputValue] = useState('');
    const [recipes, setRecipes] = useState([]);

    const searchRecipe = () => {
        fetch(`http://localhost:4004/search?query=${inputValue}`)
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <div id="search-container">
            <h2>Search Recipes</h2>
                <div id="search-bar">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search recipes..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    /><button id="clear-button" onClick={() => setInputValue('')}>
                        Clear
                    </button>
                    <button id="search-button" onClick={searchRecipe}>
                        Search
                    </button>
                </div>
                <div className="recipe-cards">
                    {recipes.map(recipe => (
                        <div key={recipe.url}>
                            <a href={recipe.url}>{recipe.label}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}