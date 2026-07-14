import { useEffect, useState } from "react";

function App() {
  const [drinks, setDrinks] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [alcoholic, setAlcoholic] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/drinks", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) => console.error("Error loading drinks:", error));
  }, []);

  return (
    <main>
      <h1>Drink Lab</h1>
      <form>
        <div>
          <label htmlFor="name">Drink name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="alcoholic">Alcoholic</label>
          <input
            id="alcoholic"
            type="checkbox"
            checked={alcoholic}
            onChange={(event) => setAlcoholic(event.target.checked)}
          />
        </div>

        <button type="submit">Create Drink</button>
      </form>
      <h2>Drinks</h2>

      {drinks.length === 0 ? (
        <p>No drinks found.</p>
      ) : (
        <ul>
          {drinks.map((drink) => (
            <li key={drink.id}>{drink.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
