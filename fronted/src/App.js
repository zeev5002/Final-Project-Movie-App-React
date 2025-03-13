import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieContextProvider from "./context/MovieContext";
import MovieList from "./components/MovieList";
import MovieDetails from "./pages/MovieDetails";
import EditMovie from "./pages/EditMovie";
import DeleteMovie from "./pages/DeleteMovie";
import NewMovie from "./pages/NewMovie";
import { useContext } from "react";
import { MovieContext } from "./context/MovieContext";
import "./styles/App.css";

function App() {
  const { globalErrorMessage, setGlobalErrorMessage } = useContext(MovieContext);

  return (
    <div>
      <MovieContextProvider>
        <BrowserRouter>
          {globalErrorMessage && (
            <div className="global-error-message">
              {globalErrorMessage}
              <button onClick={() => setGlobalErrorMessage(null)}>סגור</button>
              {/* כפתור לסגירת ההודעה */}
            </div>
          )}
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/delete/:id" element={<DeleteMovie />} />
            <Route path="/new" element={<NewMovie />} />
          </Routes>
        </BrowserRouter>
      </MovieContextProvider>
    </div>
  );
}

export default App;