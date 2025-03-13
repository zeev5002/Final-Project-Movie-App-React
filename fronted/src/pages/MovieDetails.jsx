import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import { ClipLoader } from "react-spinners";
import "../styles/pages/MovieDetails.css"; // ייבוא קובץ ה-CSS

const MovieDetails = () => {
  const { movies } = useContext(MovieContext);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (movies) {
      const foundMovie = movies.find((movie) => movie.id === id);
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        setError("❌ הסרט לא נמצא");
      }
      setLoading(false);
    }
  }, [movies, id]);

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#007bff" loading={true} size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return <p className="error-message">❌ הסרט לא נמצא</p>;
  }

  return (
    <div className="movie-details-container">
      <h1>🎬 {movie.title}</h1>
      <p>{movie.description}</p>
      <p className="year">📅 שנת יציאה: {movie.year}</p>
      
      <div className="buttons">
        <Link to={`/edit/${movie.id}`}>
          <button>✏️ ערוך</button>
        </Link>
        <Link to={`/delete/${movie.id}`}>
          <button className="delete-btn">🗑️ מחק</button>
        </Link>
        <Link to="/">
          <button className="back-btn">🔙 חזור לרשימה</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
