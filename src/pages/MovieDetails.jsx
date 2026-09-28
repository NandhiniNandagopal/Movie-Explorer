import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie details not found.");
        }
      } catch (error) {
        setError("Unable to load movie details.");
      }

      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="details-container">
      <Link to="/" className="back-btn">
        ← Back to Movies
      </Link>

      <div className="details-card">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
        />

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <p className="rating">
            ⭐ {movie.imdbRating}/10
          </p>

          <p>
            <strong>Year:</strong> {movie.Year}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>

          <p>
            <strong>Language:</strong> {movie.Language}
          </p>

          <p>
            <strong>Plot:</strong>
          </p>

          <p>{movie.Plot}</p>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;