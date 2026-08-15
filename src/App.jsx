import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DrinksPage from "./pages/DrinksPage";
import AllRecipesPage from "./pages/AllRecipesPage";
import RecipesPage from "./pages/RecipesPage";
import Dashboard from "./pages/Dashboard";
import DrinkMakerPage from "./pages/DrinkMakerPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DrinkRecipesPage from "./pages/DrinkRecipesPage";
import SettingsPage from "./pages/SettingsPage";
import EditRecipePage from "./pages/EditRecipePage";
import EditDrinkPage from "./pages/EditDrinkPage";
import IngredientsPage from "./pages/IngredientsPage";

import ProtectedLayout from "./components/layout/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-recipes" element={<RecipesPage />} />
        <Route path="/recipes" element={<AllRecipesPage />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/drink-maker" element={<DrinkMakerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/drinks/:drinkId/recipes/new" element={<CreateRecipePage />} />
        <Route path="/drinks/:drinkId/edit"element={<EditDrinkPage />} />
        <Route path="/recipes/:recipeId/edit"element={<EditRecipePage />}/>
        <Route path="/drinks/:drinkId/recipes" element={<DrinkRecipesPage />} />
        <Route path="/ingredients"element={<IngredientsPage />} />
      </Route>
    </Routes>
  );
}

export default App;