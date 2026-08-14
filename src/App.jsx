import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import DrinksPage from "./pages/DrinksPage";
import AllRecipesPage from "./pages/AllRecipesPage";
import UserRecipesPage from "./pages/UserRecipesPage";
import PersonalPage from "./pages/PersonalPage";
import DrinkMakerPage from "./pages/DrinkMakerPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DrinkRecipesPage from "./pages/DrinkRecipesPage";
import SettingsPage from "./pages/SettingsPage";
import EditRecipePage from "./pages/EditRecipePage";
import EditDrinkPage from "./pages/EditDrinkPage";

import ProtectedLayout from "./components/layout/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/my-recipes" element={<UserRecipesPage />} />
        <Route path="/recipes" element={<AllRecipesPage />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/drink-maker" element={<DrinkMakerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/drinks/:drinkId/recipes/new" element={<CreateRecipePage />} />
        <Route path="/drinks/:drinkId/edit"element={<EditDrinkPage />} />
        <Route path="/recipes/:recipeId/edit"element={<EditRecipePage />}/>
        <Route path="/drinks/:drinkId/recipes"element={<DrinkRecipesPage />}/></Route>
    </Routes>
  );
}

export default App;