    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getDatabase } from "firebase/database";

    const firebaseConfig = {
    apiKey: "AIzaSyDFxThpKCyXKqAxY-U8kzk9sSaZWw6cfxU",
    authDomain: "database-darcamp.firebaseapp.com",
    databaseURL: "https://database-darcamp-default-rtdb.firebaseio.com/", // Perbaiki "databaseUrl" -> "databaseURL"
    projectId: "database-darcamp",
    storageBucket: "database-darcamp.firebasestorage.app",
    messagingSenderId: "232527204086",
    appId: "1:232527204086:web:970eebd027751e4cbde6d7",
    measurementId: "G-NKB16YP5ZQ"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);  // Tambahkan auth untuk Authentication
    const database = getDatabase(app);

    export { auth, database };
