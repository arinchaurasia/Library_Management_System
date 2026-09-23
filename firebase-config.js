/* ShelfSense Firebase Realtime DB & Google Auth Config */

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

var isSigningIn = false;

try {
    if (typeof firebase !== "undefined" && firebaseConfig.apiKey) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        if (firebase.auth) {
            auth = firebase.auth();
            googleProvider = new firebase.auth.GoogleAuthProvider();
        }
        isFirebaseActive = true;
    }
} catch (err) {
    console.warn("Firebase init error:", err.message);
}

function signInWithGoogle() {
    if (isSigningIn) return;
    
    if (!auth || !googleProvider) {
        alert("Firebase Auth is not initialized. Please refresh or check connection.");
        return;
    }
    
    isSigningIn = true;
    auth.signInWithPopup(googleProvider).then(function() {
        isSigningIn = false;
    }).catch(function(error) {
        isSigningIn = false;
        console.warn("Google Sign-In Error:", error);
        
        if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
            return;
        }
        
        alert("Google Sign-In Error: " + error.message);
    });
}

function signOutGoogle() {
    if (auth && auth.currentUser) {
        auth.signOut();
    }
    currentUser = null;
    var authLockScreen = document.getElementById("authLockScreen");
    var appLayout = document.getElementById("appLayout");
    var signInBtn = document.getElementById("googleSignInBtn");
    var userProfile = document.getElementById("userProfile");
    
    if (authLockScreen) authLockScreen.style.display = "flex";
    if (appLayout) appLayout.style.display = "none";
    if (signInBtn) signInBtn.style.display = "flex";
    if (userProfile) userProfile.style.display = "none";
}

