/*
    ==========================================
    🔥 ShelfSense Firebase Realtime Database Config
    ==========================================
*/

var firebaseConfig = {
    apiKey: "AIzaSyDE9BVf22P0ksqtyVutIrtAbLoAA4GwXpA",
    authDomain: "library-management-2e40c.firebaseapp.com",
    databaseURL: "https://library-management-2e40c-default-rtdb.firebaseio.com",
    projectId: "library-management-2e40c",
    storageBucket: "library-management-2e40c.firebasestorage.app",
    messagingSenderId: "193433726804",
    appId: "1:193433726804:web:6f7ece7a18bb878dc2e2c1",
    measurementId: "G-YE5TTR9DDR"
};

var db = null;
var isFirebaseActive = false;

try {
    if (typeof firebase !== "undefined" && firebaseConfig.apiKey) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        isFirebaseActive = true;
        console.log("🔥 Firebase Realtime Database connected successfully!");
    } else {
        console.log("ℹ️ Running in browser localStorage mode.");
    }
} catch (err) {
    console.warn("Firebase initialization note:", err.message);
}
