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
        signInAsGuestOrStudent();
        return;
    }

    isSigningIn = true;
    auth.signInWithPopup(googleProvider).then(function (result) {
        isSigningIn = false;
        if (result && result.user) {
            localStorage.setItem("shelf_current_user", JSON.stringify({
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }));
        }
    }).catch(function (error) {
        isSigningIn = false;
        console.warn("Google Sign-In Error:", error);

        if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
            return;
        }

        alert("⚠️ Google Sign-In Note: " + (error.message || "OAuth domain restricted") + "\n\nSwitching to Instant Student / Faculty Sign-In mode...");
        signInAsGuestOrStudent();
    });
}

function signInAsGuestOrStudent() {
    var name = prompt("🎓 STUDENT / FACULTY SIGN-IN:\n\nPlease enter your Full Name:");
    if (!name || !name.trim()) return;
    name = name.trim();

    var admissionId = null;
    while (!admissionId || !admissionId.trim()) {
        admissionId = prompt("🔒 COMPULSORY REGISTRATION:\n\nPlease enter your Student Admission ID / University Roll Number (e.g., ADM-2024-001):");
        if (admissionId === null) return;
        if (!admissionId.trim()) alert("⚠️ Admission ID / Roll Number is compulsory.");
    }
    admissionId = admissionId.trim();

    var localUser = {
        uid: "usr_" + Date.now(),
        displayName: name,
        email: name.toLowerCase().replace(/\s+/g, ".") + "@student.aktu.ac.in",
        photoURL: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    };

    localStorage.setItem("shelf_current_user", JSON.stringify(localUser));
    localStorage.setItem("user_admission_id_" + localUser.uid, admissionId);

    if (typeof applyLoggedInUser === "function") {
        applyLoggedInUser(localUser, admissionId);
    }
}

function signOutGoogle() {
    if (auth && auth.currentUser) {
        auth.signOut();
    }
    localStorage.removeItem("shelf_current_user");
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

