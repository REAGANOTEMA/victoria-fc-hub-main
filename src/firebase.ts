import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAeaTDinB7bmLdW9hQL1M3EfkO62B1UFGY",
  authDomain: "victoria-fc-orom.firebaseapp.com",
  projectId: "victoria-fc-orom",
  storageBucket: "victoria-fc-orom.firebasestorage.app",
  messagingSenderId: "620091666222",
  appId: "1:620091666222:web:0a6078d3590e95a17894bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);