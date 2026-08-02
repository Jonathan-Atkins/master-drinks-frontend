import { useParams } from "react-router-dom";

function CreateRecipePage() {
  const { drinkId } = useParams();

  return (
    <main>
      <h1>Create Recipe</h1>
      <p>Creating a recipe for drink ID: {drinkId}</p>
    </main>
  );
}

export default CreateRecipePage;