import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, googleProvider } from "@/firebase";

// Register
export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Google Login
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Logout
export const logoutUser = async () => {
  return await signOut(auth);
};

// Reset Password
export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};