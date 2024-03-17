import React, { useState } from 'react';
import axios from 'axios';

export function AddRecipe() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([{ quantity: '', unit: 'gram', item: '' }]);

    const addIngredientRow = () => {
        setIngredients([...ingredients, { quantity: '', unit: '', item: '' }]);
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const addNewRecipe = async () => {
        const recipe = {
            recipe_name: title,
            recipe_description: description,
            recipe_instructions: instructions,
            ingredients: ingredients.map(ingredient => ({
                ingredient_name: ingredient.item,
                quantity: ingredient.quantity,
                units: ingredient.unit
            }))
        }
        try {
            await axios.post('http://localhost:4004/recipes', recipe);
        } catch (error) {
            console.error('Error:', error);
        }
        setTitle('');
        setDescription('');
        setInstructions('');
        setIngredients([{ quantity: '', unit: '', item: '' }]);
    }
    const renderIngredients = () => {
        const units = ["gram", "kilogram", "milliliter", "liter", "piece", "teaspoon", "tablespoon", "cup", "ounce", "pound"];

        return ingredients.map((ingredient, index) => (
                <tr key={index}>
                    <td>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            min="1"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            name="unit"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        >
                            {units.map((unit) => (
                                <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="item"
                            placeholder="Item"
                            value={ingredient.item}
                            onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                        />
                    </td>
                </tr>
        ));
    };

    return (
        <form id="add-recipe-form" onSubmit={(event) => { event.preventDefault(); addNewRecipe(); }}>
            <h2>Add Recipe</h2>

            <input type="text" id="title" name="title" required placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <textarea id="description" name="description" placeholder="Recipe Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <textarea id="instructions" name="instructions" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
            <h2>Ingredients</h2>
            <div className="ingredients">
                <table id="ingredients-table">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderIngredients()}
                    </tbody>
                </table>
                <button type="button" id="add-ingredient-button" onClick={addIngredientRow}>Add Ingredient</button>
            </div>

            <button type="submit">Add Recipe</button>
        </form>
    );
}