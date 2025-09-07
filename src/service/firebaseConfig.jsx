// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth"; // TODO: Add SDKs for Firebase products that you want to use\
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFPfPtUto7THLZgQILbom9gFV89QHp2-c",
  authDomain: "girlsmap-63832.firebaseapp.com",
  databaseURL: "https://girlsmap-63832-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "girlsmap-63832",
  storageBucket: "girlsmap-63832.firebasestorage.app",
  messagingSenderId: "184513294074",
  appId: "1:184513294074:web:cc13e4d72c2c31114f2343"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set ke Local");
  })
  .catch((err) => {
    console.error("Error persistence:", err.message);
  });

export { auth, db };
