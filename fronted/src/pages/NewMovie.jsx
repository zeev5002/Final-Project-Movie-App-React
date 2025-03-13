import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/pages/NewMovie.css";

const NewMovie = () => {
//   const {  } = useContext(MovieContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required("❌ שדה חובה"),
    description: Yup.string().required("❌ שדה חובה"),
    year: Yup.number()
      .required("❌ שדה חובה")
      .positive("❌ חייב להיות מספר חיובי")
      .integer("❌ חייב להיות מספר שלם")
      .min(1000, "❌ שנה חייבת להיות לפחות 4 ספרות"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const newMovie = {
          title: values.title,
          description: values.description,
          year: values.year.toString(),
        };

        await axios.post( // ✅ remove response and addMovie
          "http://localhost:5000/movies",
          newMovie
        );

        setSuccessMessage("✅ הסרט נשמר בהצלחה!");
        setError(null);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error adding movie:", error);
        setError(`❌ אירעה שגיאה בעת הוספת הסרט: ${error.message}`);
      }
    },
  });

  return (
    <div className="new-movie-container">
      <h1>🎬 הוסף סרט חדש</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">שם הסרט:</label>
          <input
            type="text"
            id="title"
            name="title"
            className={formik.touched.title && formik.errors.title ? "error" : ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error-message">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">תיאור:</label>
          <textarea
            id="description"
            name="description"
            className={
              formik.touched.description && formik.errors.description
                ? "error"
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error-message">{formik.errors.description}</div>
          )}
        </div>
        <div>
          <label htmlFor="year">שנת יציאה:</label>
          <input
            type="number"
            id="year"
            name="year"
            className={formik.touched.year && formik.errors.year ? "error" : ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.year}
          />
          {formik.touched.year && formik.errors.year && (
            <div className="error-message">{formik.errors.year}</div>
          )}
        </div>
        <button type="submit">📌 שמור</button>
      </form>
    </div>
  );
};

export default NewMovie;