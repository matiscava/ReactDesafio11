// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjxk9OeDPKoAypEDFwFLNdoMuTWKk5p1w",
  authDomain: "coderhouse-clase12-cadf1.firebaseapp.com",
  projectId: "coderhouse-clase12-cadf1",
  storageBucket: "coderhouse-clase12-cadf1.appspot.com",
  messagingSenderId: "452335896168",
  appId: "1:452335896168:web:efbe9d3cc8420bc8d7dddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;