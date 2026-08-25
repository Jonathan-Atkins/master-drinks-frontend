import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";

import IngredientsAlphabetNav from "./IngredientsAlphabetNav";
import IngredientsFilters from "./IngredientsFilters";
import IngredientsTable from "./IngredientsTable";

function IngredientsCollection() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] =
    useState([]);

  const [
    ingredientTypes,
    setIngredientTypes,
  ] = useState([]);

  const [
    flavorProfiles,
    setFlavorProfiles,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  const [
    ingredientType,
    setIngredientType,
  ] = useState("");

  const [
    flavorProfile,
    setFlavorProfile,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

  const [deleteError, setDeleteError] =
    useState("");

  useEffect(() => {
    const fetchIngredientOptions =
      async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/v1/ingredient_options`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(
              "Unable to load ingredient filters"
            );
          }

          const data =
            await response.json();

          setIngredientTypes(
            data.ingredient_types || []
          );

          setFlavorProfiles(
            data.flavor_profiles || []
          );
        } catch (error) {
          setError(error.message);
        }
      };

    fetchIngredientOptions();
  }, []);

  useEffect(() => {
    const fetchIngredients =
      async () => {
        setLoading(true);
        setError("");

        try {
          const params =
            new URLSearchParams();

          if (search.trim()) {
            params.set(
              "search",
              search.trim()
            );
          }

          if (ingredientType) {
            params.set(
              "ingredient_type",
              ingredientType
            );
          }

          if (flavorProfile) {
            params.set(
              "flavor_profile",
              flavorProfile
            );
          }

          const queryString =
            params.toString();

          const url = queryString
            ? `${API_URL}/api/v1/ingredients?${queryString}`
            : `${API_URL}/api/v1/ingredients`;

          const response = await fetch(
            url,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(
              "Unable to load ingredients"
            );
          }

          const data =
            await response.json();

          setIngredients(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    fetchIngredients();
  }, [
    search,
    ingredientType,
    flavorProfile,
  ]);

  const availableLetters = useMemo(
    () =>
      new Set(
        ingredients
          .map((ingredient) =>
            ingredient.name
              ?.charAt(0)
              .toUpperCase()
          )
          .filter(Boolean)
      ),
    [ingredients]
  );

  const firstIngredientIdsByLetter =
    useMemo(() => {
      const ids = {};

      ingredients.forEach(
        (ingredient) => {
          const letter = ingredient.name
            ?.charAt(0)
            .toUpperCase();

          if (letter && !ids[letter]) {
            ids[letter] = ingredient.id;
          }
        }
      );

      return ids;
    }, [ingredients]);

  const handleLetterJump = (letter) => {
    const ingredientId =
      firstIngredientIdsByLetter[letter];

    if (!ingredientId) {
      return;
    }

    document
      .getElementById(
        `ingredient-${ingredientId}`
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleClearFilters = () => {
    setSearch("");
    setIngredientType("");
    setFlavorProfile("");
  };

  const handleEdit = (id) => {
    navigate(
      `/ingredients/${id}/edit`
    );
  };

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this ingredient? This can't be undone."
      );

    if (!confirmed) {
      return;
    }

    setDeleteError("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/ingredients/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete ingredient"
        );
      }

      setIngredients(
        (currentIngredients) =>
          currentIngredients.filter(
            (ingredient) =>
              ingredient.id !== id
          )
      );
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="ingredients-section">
      <IngredientsFilters
        search={search}
        ingredientType={ingredientType}
        flavorProfile={flavorProfile}
        ingredientTypes={ingredientTypes}
        flavorProfiles={flavorProfiles}
        onSearchChange={setSearch}
        onIngredientTypeChange={
          setIngredientType
        }
        onFlavorProfileChange={
          setFlavorProfile
        }
        onClear={handleClearFilters}
      />

      <IngredientsAlphabetNav
        availableLetters={availableLetters}
        onLetterJump={handleLetterJump}
      />

      {deleteError && (
        <p className="field-error">
          {deleteError}
        </p>
      )}

      {loading && (
        <p>Loading ingredients...</p>
      )}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        ingredients.length === 0 && (
          <p>No ingredients found.</p>
        )}

      {!loading &&
        !error &&
        ingredients.length > 0 && (
          <IngredientsTable
            ingredients={ingredients}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
    </section>
  );
}

export default IngredientsCollection;