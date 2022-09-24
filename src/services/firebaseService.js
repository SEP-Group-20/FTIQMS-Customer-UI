import { initializeApp } from "firebase/app";
import defaultConfig from "../config/default";
import { getAuth } from "firebase/auth";

// Initialize Firebase
// console.log(defaultConfig.firebaseConfig);
const app = initializeApp(defaultConfig.firebaseConfig);

export const authentication = getAuth(app);