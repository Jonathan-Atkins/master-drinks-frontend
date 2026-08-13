export function groupRecipesByCategory(recipes) {
  return recipes.reduce((groups, recipe) => {
    const category = recipe.drink.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(recipe);

    return groups;
  }, {});
}