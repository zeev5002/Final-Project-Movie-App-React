import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import "../styles/pages/EditMovie.css";

const EditMovie = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // הודעת הצלחה

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundMovie = movies ? movies.find((movie) => movie.id === id) : null;
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      setError("הסרט לא נמצא");
    }
    setLoading(false);
  }, [movies, id]);

  // הגדרת סכמת אימות באמצעות Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("שדה חובה"),
    description: Yup.string().required("שדה חובה"),
    year: Yup.number()
      .required("שדה חובה")
      .positive("שנה חייבת להיות חיובית")
      .integer("שנה חייבת להיות מספר שלם"),
  });

  // שימוש ב-useFormik לניהול הטופס
  const formik = useFormik({
    initialValues: {
      title: movie ? movie.title : "",
      description: movie ? movie.description : "",
      year: movie ? movie.year : "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // המרת השנה למחרוזת לפני העדכון
        const updatedMovie = {
          id: id,
          title: values.title,
          description: values.description,
          year: values.year.toString(), // שינוי כאן
        };

        await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie);

        const updatedMovies = movies.map((movie) =>
          movie.id === id ? updatedMovie : movie
        );
        setMovies(updatedMovies);

        setSuccessMessage("הסרט נשמר בהצלחה!"); // הצגת הודעת הצלחה
        setError(null);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000); // ניווט לאחר 3 שניות
      } catch (error) {
        console.error("Error updating movie:", error);
        setError(`אירעה שגיאה בעת עדכון הסרט: ${error.message}`); // הצגת סוג השגיאה
      }
    },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#123abc" loading={true} size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="edit-movie-container">
      <h1>ערוך סרט</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* הצגת הודעת הצלחה */}
        <div>
          <label htmlFor="title">שם הסרט:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="form-error-message">{formik.errors.title}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="description">תיאור:</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="form-error-message">{formik.errors.description}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="year">שנת יציאה:</label>
          <input
            type="number"
            id="year"
            name="year"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.year}
          />
          {formik.touched.year && formik.errors.year ? (
            <div className="form-error-message">{formik.errors.year}</div>
          ) : null}
        </div>
        <button type="submit">שמור</button>
      </form>
    </div>
  );
};

export default EditMovie;