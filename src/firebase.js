import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKwJQkrYqBVIRc6LSk0G-qbDcZux7gnyM",
  authDomain: "clone-276bb.firebaseapp.com",
  projectId: "clone-276bb",
  storageBucket: "clone-276bb.appspot.com",
  messagingSenderId: "1029854771977",
  appId: "1:1029854771977:web:bc678908422d63cd55f1d8",
  measurementId: "G-CC2X8RL711",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//https://www.googleapis.com/auth/youtube.force-ssl

//helper function for login , logout and initial load
function loginWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}
function logOut() {
  return signOut(auth);
}
function getUserInitialLoad(info) {
  return onAuthStateChanged(auth, info);
}

export { loginWithGoogle, logOut, getUserInitialLoad };
