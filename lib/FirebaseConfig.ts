// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-696c7.firebaseapp.com",
  projectId: "ai-short-video-696c7",
  storageBucket: "ai-short-video-696c7.appspot.com",
  messagingSenderId: "974114910672",
  appId: "1:974114910672:web:075d2a92e6219aae8289d5",
  measurementId: "G-J7N2PDN9KT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
