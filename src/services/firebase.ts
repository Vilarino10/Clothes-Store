import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    // @ts-expect-error
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0GygY1IyxFE262IHg2MDRxcNVKVcTrcw",
  authDomain: "clothes-store-3c576.firebaseapp.com",
  projectId: "clothes-store-3c576",
  storageBucket: "clothes-store-3c576.firebasestorage.app",
  messagingSenderId: "1079107145919",
  appId: "1:1079107145919:web:5ab55e69c1c0b71100760a",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
