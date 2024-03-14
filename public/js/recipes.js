window.onload = function () {
    loadRecipes();
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            toggleCardExpansion(card);
        });
    });
};

const loadRecipes = () => {
    fetch('http://localhost:4004/recipes')
        .then(response => response.json())
        .then(recipes => {
            const grid = document.getElementById('recipe-grid');
            recipes.forEach(recipe => {
                const card = createRecipeCard(recipe, grid);
                grid.appendChild(card);
            });
        }).catch(error => {
            console.error('Error:', error);
        });
};


const deleteRecipe = (recipe, card, grid) => {
    fetch(`http://localhost:4004/recipes/${recipe.recipe_id}`, { method: 'DELETE' })
        .then(() => {
            grid.removeChild(card);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const createRecipeCard = (recipe, grid) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <h3>${recipe.recipe_name}</h3>
        <p>${recipe.recipe_description}</p>
        <p>${recipe.recipe_instructions}</p>
        <div class="ingredients-container"></div>
        <button class="delete-button">Delete</button>
        <button class="edit-button">Edit</button>
    `;

    card.querySelector('.delete-button').addEventListener('click', (evt) => {
        deleteRecipe(recipe, card, grid);
    });

    card.querySelector('.edit-button').addEventListener('click', (evt) => {
        editRecipe(recipe, card, grid);
    });

    card.addEventListener('click', () => {
        toggleCardExpansion(card, recipe);
    });

    return card;
};

const toggleCardExpansion = (card, recipe) => {
    card.classList.toggle('expanded');
    const ingredientsContainer = card.querySelector('.ingredients-container');
    if (card.classList.contains('expanded')) {
        ingredientsContainer.innerHTML = '<h4>Ingredients:</h4><ul class="ingredients-list"></ul>';
        const ingredientsList = ingredientsContainer.querySelector('.ingredients-list');
        fetch(`http://localhost:4004/recipe/ingredients/${recipe.recipe_id}`)
            .then(response => response.json())
            .then(ingredients => {
                ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = `${ingredient.ingredient_name}: ${ingredient.quantity} ${ingredient.unit}`;
                    ingredientsList.appendChild(li);
                });
            });
    } else {
        ingredientsContainer.innerHTML = '';
    }
};



const createForm = (recipe, ingredients) => {
    const form = document.createElement('form');
    form.innerHTML = `
        <label>
            Recipe Name:
            <input type="text" name="recipe_name" value="${recipe.recipe_name}">
        </label>
        <label>
            Recipe Description:
            <textarea name="recipe_description">${recipe.recipe_description}</textarea>
        </label>
        <label>
            Recipe Instructions:
            <textarea name="recipe_instructions">${recipe.recipe_instructions}</textarea>
        </label>
    `;

    ingredients.forEach((ingredient, index) => {
        form.innerHTML += `
            <h4>Ingredient ${index + 1}</h4>
            <label>
                Ingredient Name:
                <input type="text" name="ingredient_name_${index}" value="${ingredient.ingredient_name}">
            </label>
            <label>
                Quantity:
                <input type="text" name="quantity_${index}" value="${ingredient.quantity}">
            </label>
        `;
    });

    form.innerHTML += '<button type="submit">Save</button>';
    form.innerHTML += '<button type="button" class="cancel-button">Cancel</button>';
    return form;
}

const editRecipe = (recipe, card, grid) => {
    fetch(`http://localhost:4004/recipe/ingredients/${recipe.recipe_id}`)
        .then(response => response.json())
        .then(ingredients => {
            const form = createForm(recipe, ingredients);
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                const formData = new FormData(form);
                const updatedRecipe = {
                    recipe_name: formData.get('recipe_name'),
                    recipe_description: formData.get('recipe_description'),
                    recipe_instructions: formData.get('recipe_instructions'),
                    ingredients: getUpdatedIngredients(formData),
                };
                updateRecipe(recipe, updatedRecipe);
                replaceFormWithCard(form, card);
                refreshRecipes(grid);
            });
            replaceCardWithForm(card, form);
            form.querySelector('.cancel-button').addEventListener('click', () => {
                replaceFormWithCard(form, card);
            });
        })
        .catch(console.error);
};

const replaceFormWithCard = (form, card) => {
    form.parentNode.replaceChild(card, form);
}

const replaceCardWithForm = (card, form) => {
    card.parentNode.replaceChild(form, card);
}

const refreshRecipes = (grid) => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    loadRecipes();
}

function updateRecipe(recipe, updatedRecipe) {
    fetch(`http://localhost:4004/recipes/${recipe.recipe_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipe_name: updatedRecipe.recipe_name,
            recipe_description: updatedRecipe.recipe_description,
            recipe_instructions: updatedRecipe.recipe_instructions,
        }),
    })
        .then(() => {
            updateIngredientQuantities(updatedRecipe.ingredients, recipe.recipe_id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getUpdatedIngredients(formData) {
    const ingredients = [];
    formData.forEach((value, key) => {
        if (key.startsWith('ingredient_name_')) {
            const index = key.split('_')[2];
            const ingredient = {
                ingredient_name: value,
                quantity: formData.get(`quantity_${index}`),
                unit: formData.get(`unit_${index}`),
            };
            ingredients.push(ingredient);
        }
    });
    return ingredients;
}

function updateIngredientQuantities(ingredients, recipeId) {
    ingredients.forEach((ingredient) => {
        fetch(`http://localhost:4004/ingredients/name/${ingredient.ingredient_name}`)
            .then(response => response.json())
            .then(data => {
                const ingredientId = data.ingredient_id;
                console.log(ingredientId);
                fetch(`http://localhost:4004/quantity`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recipe_id: recipeId,
                        ingredient_id: ingredientId,
                        quantity: ingredient.quantity,
                    }),
                });
            });
    });
}