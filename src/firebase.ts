// src/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// -------------------------------
// Firebase Config from Environment Variables
// -------------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// -------------------------------
// Initialize Firebase App
// -------------------------------
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// -------------------------------
// Firebase Services
// -------------------------------
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// -------------------------------
// Google Auth Provider
// -------------------------------
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// -------------------------------
// Auth Helper Functions
// -------------------------------

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Firebase Google login error:", error);
    return null;
  }
};

// Sign out current user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Firebase sign out error:", error);
  }
};

// Listen for auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};