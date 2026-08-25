import { useEffect, useState } from "react";

import { API_URL } from "../../config/api";

import CommunitySearch from "../community/CommunitySearch";
import CommunityUserCard from "../community/CommunityUserCard";
import CommunityPagination from "../community/CommunityPagnation";

function CommunityCollection() {
  const [users, setUsers] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: page.toString(),
        });

        if (search) {
          params.set("search", search);
        }

        const response = await fetch(
          `${API_URL}/api/v1/users?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load community members");
        }

        const data = await response.json();

        setUsers(data.users);
        setPerPage(data.pagination.per_page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage((currentPage) =>
      Math.max(1, currentPage - 1)
    );
  };

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <section className="community-section">
      <CommunitySearch
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSubmit={handleSearchSubmit}
        onClear={handleSearchClear}
      />

      {loading && (
        <p className="community-status">
          Loading community...
        </p>
      )}

      {error && (
        <p className="community-status community-error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        users.length === 0 && (
          <p className="community-status">
            No community members found.
          </p>
        )}

      {!loading &&
        !error &&
        users.length > 0 && (
          <>
            <div className="community-user-grid">
              {users.map((user) => (
                <CommunityUserCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>

            <CommunityPagination
              page={page}
              canGoBack={page > 1}
              canGoForward={users.length === perPage}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </>
        )}
    </section>
  );
}

export default CommunityCollection;