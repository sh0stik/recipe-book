import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Recipes, RecipeDetails } from './components/Recipes';
import { AddRecipe } from './components/AddRecipe';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        {user ? (
          <>
            Welcome, {user.username}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <header>
            <h1>Recipe Book</h1>
            <nav>
              <Navigation />
              {/* <ul>
              <Link to="/">Home</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/add-recipe">Add Recipe</Link>
              <Link to="/login">Login</Link>
            </ul> */}
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <footer>
            <p>&copy; 2024 Recipe Book</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
