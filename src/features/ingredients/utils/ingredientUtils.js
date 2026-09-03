export const createEmptyIngredientRow = () => ({
  ingredient_id: "",
  ingredient_name: "",
  search_term: "",
  matches: [],
  amount: "",
  measurement_unit: "",
  searching: false,
  creating: false,
});

export const createIngredientRowFromIngredient = (
  ingredient
) => ({
  ...createEmptyIngredientRow(),
  ingredient_id: ingredient.id,
  ingredient_name: ingredient.name,
  search_term: ingredient.name,
});