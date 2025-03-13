import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import "../styles/components/MovieList.css";
import { motion } from "framer-motion";

<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.5 }}
>
  <h1>רשימת הסרטים</h1>
</motion.div>



const MovieList = () => {
  const { movies } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movies
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="movie-list-container">
      <h1>רשימת הסרטים</h1>
      <Link to="/new">
        <button>➕ הוסף סרט חדש</button>
      </Link>
      <input
        type="text"
        placeholder="🔍 חפש סרט..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredMovies.length > 0 ? (
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <h2>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              </h2>
              <p>{movie.description}</p>
              <p>📅 שנת יציאה: {movie.year}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>❌ לא נמצאו סרטים</p>
      )}
    </div>
  );
};

export default MovieList;
