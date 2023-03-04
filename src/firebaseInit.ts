// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcqVkI17T5XgvzOlpGDzO3Bci3oUC4vcU",
  authDomain: "coop-lists.firebaseapp.com",
  databaseURL: "https://coop-lists-default-rtdb.firebaseio.com",
  projectId: "coop-lists",
  storageBucket: "coop-lists.appspot.com",
  messagingSenderId: "19365554384",
  appId: "1:19365554384:web:d501cf0da24755cebd96d5",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
// This happens automatically in main.ts: https://vuefire.vuejs.org/guide/auth.html#installation
// getAuth(firebaseApp);
