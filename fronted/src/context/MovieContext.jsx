import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext({});

const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState();
  const [contextError, setContextError] = useState(null);
  const [globalErrorMessage, setGlobalErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/movies");
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setContextError("אירעה שגיאה בעת טעינת הסרטים.");
        setGlobalErrorMessage(
          "אירעה שגיאה בעת טעינת הסרטים. אנא נסה שוב מאוחר יותר."
        );
      }
    };
    fetchMovies();
  },);

  const addMovie = async (newMovie) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/movies",
        newMovie
      );
      setMovies((prevMovies) => [...prevMovies, response.data]);
    } catch (error) {
      console.error("Error adding movie to context:", error);
      setContextError("אירעה שגיאה בעת הוספת הסרט.");
      setGlobalErrorMessage("אירעה שגיאה בעת הוספת הסרט. אנא נסה שוב.");
    }
  };

  const updateMovie = async (updatedMovie) => {
    try {
      await axios.put(
        `http://localhost:5000/movies/${updatedMovie.id}`,
        updatedMovie
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
    } catch (error) {
      console.error("Error updating movie in context:", error);
      setContextError("אירעה שגיאה בעת עדכון הסרט.");
      setGlobalErrorMessage("אירעה שגיאה בעת עדכון הסרט. אנא נסה שוב.");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie from context:", error);
      setContextError("אירעה שגיאה בעת מחיקת הסרט.");
      setGlobalErrorMessage("אירעה שגיאה בעת מחיקת הסרט. אנא נסה שוב.");
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        addMovie,
        updateMovie,
        deleteMovie,
        contextError,
        globalErrorMessage,
        setGlobalErrorMessage,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;