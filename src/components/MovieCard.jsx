import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>📅 {movie.Year}</p>

        <p>🎬 {movie.Type}</p>

        <Link to={`/movie/${movie.imdbID}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;