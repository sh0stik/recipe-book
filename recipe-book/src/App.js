import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Recipes, RecipeDetails } from './components/Recipes';
import { AddRecipe } from './components/AddRecipe';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Recipe Book</h1>
          <nav>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/add-recipe">Add Recipe</Link>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Recipe Book</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
