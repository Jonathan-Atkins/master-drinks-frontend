import { useEffect, useState } from "react";

import { API_URL } from "../../../config/api";

function FunFactTicker() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/fun_facts`
        );

        if (!response.ok) {
          throw new Error("Unable to load fun facts");
        }

        const data = await response.json();

        setFacts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFunFacts();
  }, []);

  if (loading) {
    return <p>Loading fun fact...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (facts.length === 0) {
    return <p>No fun facts available.</p>;
  }

  return (
    <section className="dashboard-fun-fact">
      <p>
        <strong>Did You Know?</strong>{" "}
        {facts[0].body}
      </p>
    </section>
  );
}

export default FunFactTicker;