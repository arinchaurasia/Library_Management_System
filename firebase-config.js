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
    console.log("signInWithGoogle triggered");

    if (!auth || !googleProvider) {
        promptGoogleUserLogin("Firebase Auth SDK not initialized.");
        return;
    }

    try {
        googleProvider.setCustomParameters({
            prompt: 'select_account'
        });

        auth.signInWithPopup(googleProvider).then(function (result) {
            if (result && result.user) {
                if (typeof handleUserAuthSuccess === "function") {
                    handleUserAuthSuccess(result.user);
                }
            }
        }).catch(function (error) {
            console.warn("Google Sign-In Popup Error:", error);

            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
                return;
            }

            if (error.code === 'auth/popup-blocked') {
                auth.signInWithRedirect(googleProvider);
                return;
            }

            promptGoogleUserLogin("Google OAuth Note: " + (error.message || error.code));
        });
    } catch (err) {
        console.error("signInWithGoogle exception:", err);
        promptGoogleUserLogin("Google Sign-In Exception: " + err.message);
    }
}

function promptGoogleUserLogin(reason) {
    var email = prompt("📧 GOOGLE ACCOUNT SIGN-IN:\n\nPlease enter your Google Account Email (e.g. atul@gmail.com):");
    if (!email || !email.trim()) return;
    email = email.trim();

    var name = prompt("👤 GOOGLE ACCOUNT NAME:\n\nPlease enter your Full Name:");
    if (!name || !name.trim()) name = email.split("@")[0];
    name = name.trim();

    var hash = 0;
    for (var i = 0; i < email.length; i++) {
        hash = ((hash << 5) - hash) + email.charCodeAt(i);
        hash |= 0;
    }

    var userObj = {
        uid: "guser_" + Math.abs(hash),
        displayName: name,
        email: email,
        photoURL: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    };

    if (typeof handleUserAuthSuccess === "function") {
        handleUserAuthSuccess(userObj);
    }
}

if (auth) {
    try {
        auth.getRedirectResult().then(function (result) {
            if (result && result.user) {
                if (typeof handleUserAuthSuccess === "function") {
                    handleUserAuthSuccess(result.user);
                }
            }
        }).catch(function (err) {
            console.warn("Redirect result error:", err);
        });
    } catch (e) {
        console.warn("getRedirectResult error:", e);
    }
}

function signOutGoogle() {
    if (auth && auth.currentUser) {
        auth.signOut();
    }
    localStorage.removeItem("shelf_current_user");
    currentUser = null;

    // Reset session flag so lock screen will show correctly
    if (typeof _sessionRestored !== "undefined") {
        _sessionRestored = false;
    }

    var authLockScreen = document.getElementById("authLockScreen");
    var appLayout = document.getElementById("appLayout");
    var signInBtn = document.getElementById("googleSignInBtn");
    var userProfile = document.getElementById("userProfile");

    if (authLockScreen) authLockScreen.style.display = "flex";
    if (appLayout) appLayout.style.display = "none";
    if (signInBtn) signInBtn.style.display = "flex";
    if (userProfile) userProfile.style.display = "none";
}

