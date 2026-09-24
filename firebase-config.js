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

try {
    if (typeof firebase !== "undefined" && firebaseConfig.apiKey) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        if (firebase.auth) {
            auth = firebase.auth();
            googleProvider = new firebase.auth.GoogleAuthProvider();
        }
        isFirebaseActive = true;
        console.log("Firebase initialized successfully");
    }
} catch (err) {
    console.warn("Firebase init error:", err.message);
}

// ─── Google Sign-In ─────────────────────────────────────────────────────────
function signInWithGoogle() {
    console.log("signInWithGoogle triggered");

    if (!auth || !googleProvider) {
        promptGoogleUserLogin();
        return;
    }

    try {
        googleProvider.setCustomParameters({ prompt: 'select_account' });

        auth.signInWithPopup(googleProvider).then(function (result) {
            if (result && result.user) {
                console.log("Popup login success:", result.user.email);
                _onFirebaseUserReady(result.user);
            }
        }).catch(function (error) {
            console.warn("Google Sign-In Popup Error:", error.code, error.message);

            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
                return; // User closed popup — do nothing
            }
            if (error.code === 'auth/popup-blocked') {
                console.log("Popup blocked — trying redirect...");
                auth.signInWithRedirect(googleProvider);
                return;
            }
            // Any other error — fall back to manual entry
            promptGoogleUserLogin();
        });
    } catch (err) {
        console.error("signInWithGoogle exception:", err);
        promptGoogleUserLogin();
    }
}

// ─── Manual email fallback ───────────────────────────────────────────────────
function promptGoogleUserLogin() {
    var email = prompt("📧 Enter your Google Account Email to sign in:");
    if (!email || !email.trim()) return;
    email = email.trim().toLowerCase();

    var name = prompt("👤 Enter your Full Name:");
    if (!name || !name.trim()) name = email.split("@")[0];
    name = name.trim();

    var hash = 0;
    for (var i = 0; i < email.length; i++) {
        hash = ((hash << 5) - hash) + email.charCodeAt(i);
        hash |= 0;
    }

    _onFirebaseUserReady({
        uid: "guser_" + Math.abs(hash),
        displayName: name,
        email: email,
        photoURL: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=4f46e5&color=fff&size=64"
    });
}

// ─── Core: called whenever we have a verified user object ────────────────────
function _onFirebaseUserReady(user) {
    // Always wait for script.js to define applyLoggedInUser before calling it
    if (typeof applyLoggedInUser === "function") {
        applyLoggedInUser(user);
    } else {
        // Script.js not loaded yet — queue for when it's ready
        window._pendingAuthUser = user;
        console.log("Queuing auth for script.js initialization");
    }
}

// ─── Handle redirect result (called after page load from redirect flow) ──────
if (auth) {
    auth.getRedirectResult().then(function (result) {
        if (result && result.user) {
            console.log("Redirect login success:", result.user.email);
            _onFirebaseUserReady(result.user);
        }
    }).catch(function (err) {
        console.warn("Redirect result error:", err.code);
    });
}

// ─── Sign Out ────────────────────────────────────────────────────────────────
function signOutGoogle() {
    if (auth && auth.currentUser) {
        auth.signOut().catch(function(e){ console.warn("signOut error:", e); });
    }

    // Clear all session data
    localStorage.removeItem("shelf_current_user");
    currentUser = null;

    // Reset session flag in script.js
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

    console.log("User signed out successfully");
}