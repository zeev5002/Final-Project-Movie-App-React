import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import "../styles/pages/DeleteMovie.css"; // ✅ ייבוא קובץ ה-CSS

const DeleteMovie = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundMovie = movies ? movies.find((movie) => movie.id === id) : null;
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      setError("❌ הסרט לא נמצא");
    }
  }, [movies, id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting movie:", error);
      setError(`❌ אירעה שגיאה בעת מחיקת הסרט: ${error.message}`);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return <p className="error-message">❌ הסרט לא נמצא</p>;
  }

  return (
    <div className="delete-movie-container">
      <h1>🗑️ מחק סרט</h1>
      <p>האם אתה בטוח שברצונך למחוק את הסרט "<strong>{movie.title}</strong>"?</p>

      <div className="buttons">
        <button className="delete-btn" onClick={handleDelete}>🗑️ כן, מחק</button>
        <Link to="/">
          <button className="cancel-btn">🔙 חזור</button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteMovie;
