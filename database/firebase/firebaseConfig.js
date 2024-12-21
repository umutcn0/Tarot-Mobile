import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSsGezHrHMhZB7NbVzMXcn6fD46RccR-k",
  authDomain: "tarotproject-ai.firebaseapp.com",
  projectId: "tarotproject-ai",
  storageBucket: "tarotproject-ai.firebasestorage.app",
  messagingSenderId: "57681496311",
  appId: "1:57681496311:web:f6395443d49bdc6bccabf2"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

export default app;
