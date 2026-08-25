function CommunityPagination({
  page,
  canGoBack,
  canGoForward,
  onPrevious,
  onNext,
}) {
  return (
    <nav
      className="community-pagination"
      aria-label="Community pages"
    >
      <button
        type="button"
        className="form-secondary-button"
        onClick={onPrevious}
        disabled={!canGoBack}
      >
        Previous
      </button>

      <span className="community-page-number">
        Page {page}
      </span>

      <button
        type="button"
        className="form-secondary-button"
        onClick={onNext}
        disabled={!canGoForward}
      >
        Next
      </button>
    </nav>
  );
}

export default CommunityPagination;