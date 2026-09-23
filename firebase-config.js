/*
    ==========================================
    🔥 ShelfSense Firebase Realtime DB & Google Auth Config
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
var auth = null;
var googleProvider = null;
var isFirebaseActive = false;
var currentUser = null;

try {
    if (typeof firebase !== "undefined" && firebaseConfig.apiKey) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        if (firebase.auth) {
            auth = firebase.auth();
            googleProvider = new firebase.auth.GoogleAuthProvider();
        }
        isFirebaseActive = true;
        console.log("🔥 Firebase Realtime DB & Google Auth connected successfully!");
    } else {
        console.log("ℹ️ Running in browser localStorage mode.");
    }
} catch (err) {
    console.warn("Firebase initialization note:", err.message);
}

function signInWithGoogle() {
    if (!auth || !googleProvider) {
        alert("Firebase Auth is not ready.");
        return;
    }
    auth.signInWithPopup(googleProvider).then(function(result) {
        console.log("Signed in as:", result.user.displayName);
    }).catch(function(error) {
        console.error("Google Sign-In Error:", error);
        alert("Google Sign-In Error: " + error.message);
    });
}

function signOutGoogle() {
    if (!auth) return;
    auth.signOut().then(function() {
        console.log("Signed out successfully.");
    });
}
