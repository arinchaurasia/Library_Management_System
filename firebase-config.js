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
        handleGuestSignIn("Firebase Auth is not initialized.");
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
        
        if (confirm("Google Sign-In Notice: " + error.message + "\n\nWould you like to sign in as Guest / Demo Student instead?")) {
            handleGuestSignIn();
        }
    });
}

function handleGuestSignIn(reason) {
    var defaultName = localStorage.getItem("guest_user_name") || "Student User";
    var defaultId = localStorage.getItem("guest_admission_id") || ("ADM-" + Math.floor(100000 + Math.random() * 900000));
    
    var msg = (reason ? reason + "\n\n" : "") + "Enter your Full Name to sign in as Guest Student:";
    var guestName = prompt(msg, defaultName);
    if (guestName === null) return;
    
    guestName = guestName.trim() || defaultName;
    localStorage.setItem("guest_user_name", guestName);
    localStorage.setItem("guest_admission_id", defaultId);
    
    var guestUser = {
        uid: "guest_" + defaultId,
        displayName: guestName,
        email: guestName.toLowerCase().replace(/\s+/g, '') + "@student.aktu.ac.in",
        photoURL: "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(guestName),
        isGuest: true
    };
    
    currentUser = guestUser;
    
    var authLockScreen = document.getElementById("authLockScreen");
    var appLayout = document.getElementById("appLayout");
    var signInBtn = document.getElementById("googleSignInBtn");
    var userProfile = document.getElementById("userProfile");
    var userAvatar = document.getElementById("userAvatar");
    var userName = document.getElementById("userName");
    
    if (authLockScreen) authLockScreen.style.display = "none";
    if (appLayout) appLayout.style.display = "grid";
    if (signInBtn) signInBtn.style.display = "none";
    if (userProfile) userProfile.style.display = "flex";
    if (userAvatar) userAvatar.src = guestUser.photoURL;
    if (userName) {
        userName.innerHTML = guestUser.displayName + ' <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.85;">(ID: ' + defaultId + ')</span>';
    }
    
    if (typeof renderAll === "function") renderAll();
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

