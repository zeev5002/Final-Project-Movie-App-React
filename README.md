# Movie App

אפליקציה לניהול סרטים פשוטה.

## תיאור

אפליקציה זו מאפשרת למשתמשים לנהל רשימה של סרטים. ניתן להוסיף סרטים חדשים, לערוך סרטים קיימים, למחוק סרטים ולראות את פרטי הסרטים.

## טכנולוגיות

* **React:** ספריית JavaScript לבניית ממשקי משתמש.
* **React Router DOM:** ניהול נתיבים (routing) באפליקציית React.
* **Context API:** ניהול מצב (state management) באפליקציה.
* **axios:** שליחת בקשות HTTP ל-API.
* **JSON Server:** הדמיית שרת REST API לצורך פיתוח.
* **formik ו-Yup:** טיפול בטפסים ואימות נתונים.

## התקנה והרצה

1.  **Clone את המאגר:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>  ```

2.  **התקן את התלויות (dependencies) של הצד הקדמי:**

    ```bash
    cd fronted
    npm install
    ```

3.  **הפעל את שרת הפיתוח של הצד הקדמי:**

    ```bash
    npm start
    ```

    האפליקציה תהיה זמינה בכתובת `http://localhost:3000`.

4.  **הפעל את ה-JSON Server (בטרמינל אחר):**

    ```bash
    cd Server
    npm install -g json-server # אם עדיין לא מותקן גלובלית
    json-server --watch db.json --port 5000
    ```

    ה-API יהיה זמין בכתובת `http://localhost:5000`.

## שימוש

* **דף הבית:** מציג רשימה של סרטים עם אפשרות חיפוש.
* **הוספת סרט חדש:** ניתן להוסיף סרט חדש על ידי לחיצה על כפתור "הוסף סרט חדש".
* **צפייה בפרטי סרט:** לחיצה על שם הסרט תוביל לדף עם פרטי הסרט.
* **עריכת סרט:** ניתן לערוך סרט על ידי לחיצה על כפתור "ערוך" בדף פרטי הסרט.
* **מחיקת סרט:** ניתן למחוק סרט על ידי לחיצה על כפתור "מחק" בדף פרטי הסרט.

## מבנה הפרויקט
my-final-project/
├── fronted/
│   ├── node_modules/
│   ├── public/
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   └── MovieList.jsx
│   │   ├── context/
│   │   │   └── MovieContext.jsx
│   │   ├── pages/
│   │   │   ├── DeleteMovie.jsx
│   │   │   ├── EditMovie.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── NewMovie.jsx
│   │   ├── App.js
│   │   ├── ...
│   │   └── index.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── Server/
│   └── db.json
└──

![image](https://github.com/user-attachments/assets/a259f671-028a-4dc3-92a1-721cf7ac5d8d)

* **`fronted/`**: מכיל את קוד הצד הקדמי של האפליקציה (React).
* **`Server/`**: מכיל את קובץ הנתונים (`db.json`) עבור ה-JSON Server.
* **`src/components/`**: מכיל רכיבי React שניתנים לשימוש חוזר.
* **`src/context/`**: מכיל את קונטקסט הסרטים לניהול המצב הגלובלי.
* **`src/pages/`**: מכיל דפים (views) של האפליקציה.
* **`App.js`**: הרכיב הראשי של האפליקציה.
* **`db.json`**: קובץ הנתונים של ה-JSON Server (מכיל את רשימת הסרטים).
