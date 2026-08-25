export function groupRecipesByCategory(recipes) {
  return recipes.reduce((groups, recipe) => {
    const categories = recipe.drink.categories || [];

    categories.forEach((category) => {
      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(recipe);
    });

    return groups;
  }, {});
}