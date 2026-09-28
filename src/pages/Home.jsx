import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Home() {
  const [search, setSearch] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const fetchMovies = async () => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies =
    category === "all"
      ? movies
      : movies.filter((movie) => movie.Type === category);

  return (
    <main className="container">
      <h1>🎬 Movie Explorer</h1>

      <p className="subtitle">
        Search and explore your favorite movies
      </p>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={fetchMovies}
      />

      <div className="filters">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          All
        </button>

        <button
          className={category === "movie" ? "active" : ""}
          onClick={() => setCategory("movie")}
        >
          Movies
        </button>

        <button
          className={category === "series" ? "active" : ""}
          onClick={() => setCategory("series")}
        >
          Series
        </button>

        <button
          className={category === "episode" ? "active" : ""}
          onClick={() => setCategory("episode")}
        >
          Episodes
        </button>
      </div>

      {loading && <Loader />}

      {error && !loading && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {!loading && !error && (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;