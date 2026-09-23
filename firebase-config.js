/*
    ==========================================
    🔥 ShelfSense Firebase Realtime Database Config
    ==========================================
    Instructions for User / Next Steps:
    1. Go to Firebase Console: https://console.firebase.google.com/
    2. Click 'Add Project' and name it 'ShelfSense-Library'.
    3. Click 'Build' -> 'Realtime Database' -> 'Create Database'.
    4. Start in 'Test Mode' (Rules: { ".read": true, ".write": true }).
    5. Go to Project Settings -> Web App -> Copy credentials below.
    6. Replace the placeholder values in `firebaseConfig` object below.

    * Note: If you leave placeholders as is, ShelfSense will run seamlessly 
    in local mode using localStorage!
*/

var firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY_HERE",
    authDomain: "shelfsense-library.firebaseapp.com",
    databaseURL: "https://shelfsense-library-default-rtdb.firebaseio.com",
    projectId: "shelfsense-library",
    storageBucket: "shelfsense-library.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

var db = null;
var isFirebaseActive = false;

try {
    if (typeof firebase !== "undefined" && firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY_HERE") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        isFirebaseActive = true;
        console.log("🔥 Firebase Realtime Database connected successfully!");
    } else {
        console.log("ℹ️ Firebase credentials not configured yet. Running in browser localStorage mode.");
    }
} catch (err) {
    console.warn("Firebase initialization skipped:", err.message);
}
