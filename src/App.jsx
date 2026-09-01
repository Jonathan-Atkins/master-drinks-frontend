import {
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

import DrinksPage from "./pages/DrinksPage";
import AllRecipesPage from "./pages/AllRecipesPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Dashboard from "./pages/Dashboard";
import DrinkMakerPage from "./pages/DrinkMakerPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DrinkRecipesPage from "./pages/DrinkRecipesPage";
import SettingsPage from "./pages/SettingsPage";
import EditRecipePage from "./pages/EditRecipePage";
import EditDrinkPage from "./pages/EditDrinkPage";
import IngredientsPage from "./pages/IngredientsPage";
import NewIngredientPage from "./pages/NewIngredientsPage";
import CommunityPage from "./pages/CommunityPage";
import CommunityProfilePage from "./pages/CommunityProfilePage";

import ProtectedLayout from "./components/layout/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        element={<ProtectedLayout />}
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/community"
          element={<CommunityPage />}
        />

        <Route
          path="/community/:username"
          element={
            <CommunityProfilePage />
          }
        />

        <Route
          path="/my-recipes"
          element={<RecipesPage />}
        />

        <Route
          path="/recipes"
          element={<AllRecipesPage />}
        />

        <Route
          path="/recipes/:recipeId"
          element={
            <RecipeDetailPage />
          }
        />

        <Route
          path="/drinks"
          element={<DrinksPage />}
        />

        <Route
          path="/drink-maker"
          element={<DrinkMakerPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/drinks/:drinkId/recipes/new"
          element={
            <CreateRecipePage />
          }
        />

        <Route
          path="/drinks/:drinkId/edit"
          element={<EditDrinkPage />}
        />

        <Route
          path="/recipes/:recipeId/edit"
          element={
            <EditRecipePage />
          }
        />

        <Route
          path="/drinks/:drinkId/recipes"
          element={
            <DrinkRecipesPage />
          }
        />

        <Route
          path="/ingredients"
          element={
            <IngredientsPage />
          }
        />

        <Route
          path="/ingredients/new"
          element={
            <NewIngredientPage />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;