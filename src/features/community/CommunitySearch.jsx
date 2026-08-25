function CommunitySearch({
  searchInput,
  onSearchInputChange,
  onSubmit,
  onClear,
}) {
  return (
    <form
      className="community-search"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <label htmlFor="community-search">
          Search Username
        </label>

        <input
          id="community-search"
          type="search"
          placeholder="Search by username..."
          value={searchInput}
          onChange={(event) =>
            onSearchInputChange(event.target.value)
          }
        />
      </div>

      <div className="community-search-actions">
        <button
          type="submit"
          className="primary-button"
        >
          Search
        </button>

        <button
          type="button"
          className="form-secondary-button"
          onClick={onClear}
          disabled={!searchInput}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default CommunitySearch;