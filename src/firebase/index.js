// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ZsnxxSl-FSagTkpLUpKYP46M99-cSoo",
  authDomain: "proyectofinalreact-7b279.firebaseapp.com",
  projectId: "proyectofinalreact-7b279",
  storageBucket: "proyectofinalreact-7b279.appspot.com",
  messagingSenderId: "815725477940",
  appId: "1:815725477940:web:33e43bfe99909d40324a61"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const getFirestore = () => firebase.firestore();