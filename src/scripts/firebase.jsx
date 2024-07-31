import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuJy0Q7ywaKxO8eY5P9jnUjGEYz2Sh83A",
  authDomain: "minesweeperdb-81ee1.firebaseapp.com",
  projectId: "minesweeperdb-81ee1",
  storageBucket: "minesweeperdb-81ee1.appspot.com",
  messagingSenderId: "331076921027",
  appId: "1:331076921027:web:22bd912b146a501240e476"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);