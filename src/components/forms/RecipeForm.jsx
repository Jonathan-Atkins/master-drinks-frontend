function RecipeForm({
  name,
  setName,
  instructions,
  setInstructions,
  publiclyVisible,
  setPubliclyVisible,
  onSubmit,
  submitting,
  submitLabel,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="recipe-name">Recipe Name</label>

        <input
          id="recipe-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="instructions">Instructions</label>

        <textarea
          id="instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="publicly-visible">
          Public Recipe
        </label>

        <input
          id="publicly-visible"
          type="checkbox"
          checked={publiclyVisible}
          onChange={(event) =>
            setPubliclyVisible(event.target.checked)
          }
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;