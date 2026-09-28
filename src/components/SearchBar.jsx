function SearchBar({ search, setSearch, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <button onClick={onSearch}>
        🔍 Search
      </button>
    </div>
  );
}

export default SearchBar;