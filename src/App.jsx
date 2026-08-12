import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import DrinksPage from "./pages/DrinksPage";
import AllRecipesPage from "./pages/AllRecipesPage";
import UserRecipesPage from "./pages/UserRecipesPage";
import RegisterPage from "./pages/RegisterPage";
import PersonalPage from "./pages/PersonalPage";
import DrinkMakerPage from "./pages/DrinkMakerPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DrinkRecipesPage from "./pages/DrinkRecipesPage";

import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/drinks" element={<DrinksPage />} />

        <Route path="/recipes" element={<AllRecipesPage />} />
        <Route path="/my-recipes" element={<UserRecipesPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/drink-maker" element={<DrinkMakerPage />} />

        <Route
          path="/drinks/:drinkId/recipes/new"
          element={<CreateRecipePage />}
        />

        <Route
          path="/drinks/:drinkId/recipes"
          element={<DrinkRecipesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;