import { useNavigate } from "react-router-dom";
import RecipesCollection from "../components/RecipesCollection";

function RecipesPage() {
  const navigate = useNavigate();
  
  return (
    <main>
      <h1>Recipes Page</h1>
      
      <button 
        type="button" onClick={() => navigate("/personal")}
      >
        Back to Home    
      </button>

      <RecipesCollection />
    </main>
  );
}

export default RecipesPage;
