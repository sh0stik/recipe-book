async function addNewRecipe() {
    const recipeName = document.getElementById("title").value;
    const recipeDescription = document.getElementById("description").value;
    const recipeInstructions = document.getElementById("instructions").value;

    const ingredients = Array.from(document.querySelectorAll("#ingredients-table tr")).slice(1).map(row => {
        const [quantity, unit, item] = row.querySelectorAll("input, select");
        return {
            quantity: quantity.value,
            unit: unit.value,
            item: item.value
        }
    });
    var recipeId;
    try {
        const response = await fetch('http://localhost:4004/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipe_name: recipeName,
                recipe_description: recipeDescription,
                recipe_instructions: recipeInstructions,
            })
        });
        if (!response.ok) {
            console.error(`Server returned status code ${response.status}`);
            return;
        }
        const data = await response.json();
        recipeId = data.recipe_id;

    } catch (error) {
        console.error('Error:', error);
    }
    console.log("Add new recipe before add new ingredient")
    const quatityByingredientId = await addNewIngredient(ingredients);
    console.log(quatityByingredientId.size)
    quatityByingredientId.forEach((value, key) => console.log(key + " : " + value));
    addQuantity(quatityByingredientId, recipeId);

}

async function addQuantity(quatityByingredientId, recipeId) {
    for (const [ingredientId, quantity] of await quatityByingredientId) {
        console.log("Add quantity before fetch")
        console.log("Recipe id: " + recipeId + " Ingredient id: " + ingredientId + " Quantity: " + quantity);
        try {
            console.log("Add quantity before fetch")
            const response = await fetch('http://localhost:4004/quantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipe_id: recipeId,
                    ingredient_id: ingredientId,
                    quantity: quantity
                })
            });
            if (response.status === 200) {
                document.getElementById('add-recipe-form').reset();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}



async function addNewIngredient(ingredients) {
    const quatityByingredientId = new Map();

    console.log("Add new ingredient before loop")
    for (const ingredient of ingredients) {
        try {
            console.log("Add new ingredient before checking ingredient exist or not")
            let response = await fetch(`http://localhost:4004/ingredients`);
            const set = new Set(await response.json());
            let ingredientExists = false;
            for (const responseData of set) {
                console.log(responseData.ingredient_name + " : " + ingredient.item)
                if (responseData.ingredient_name === ingredient.item) {
                    quatityByingredientId.set(responseData.ingredient_id, ingredient.quantity);
                    ingredientExists = true;
                    break;
                }
            }
            if (!ingredientExists) {
                console.log("Add new ingredient before fetch")
                response = await fetch('http://localhost:4004/ingredients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ingredient_name: ingredient.item,
                        unit: ingredient.unit
                    })
                });
                const data = await response.json();
                console.log("Ingredient id: " + data.ingredient_id + " Quantity: " + ingredient.quantity);
                quatityByingredientId.set(data.ingredient_id, ingredient.quantity);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    console.log("Add new ingredient before return")
    console.log(quatityByingredientId.size);
    return quatityByingredientId;
}

function addIngredientRow() {
    const table = document.getElementById("ingredients-table");
    const units = ["grams", "milliliters", "cups", "teaspoons", "tablespoons", "pounds", "ounces", "units"];

    const row = document.createElement("tr");

    const quantityCell = document.createElement("td");
    const unitCell = document.createElement("td");
    const itemCell = document.createElement("td");

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.placeholder = "Quantity";

    const unitInput = document.createElement("select");
    unitInput.name = "unit";
    units.forEach(unit => {
        const option = document.createElement("option");
        option.value = unit;
        option.text = unit.charAt(0).toUpperCase() + unit.slice(1);
        unitInput.appendChild(option);
    });

    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.name = "item";
    itemInput.placeholder = "Item";

    quantityCell.appendChild(quantityInput);
    unitCell.appendChild(unitInput);
    itemCell.appendChild(itemInput);

    row.appendChild(quantityCell);
    row.appendChild(unitCell);
    row.appendChild(itemCell);

    table.appendChild(row);
}