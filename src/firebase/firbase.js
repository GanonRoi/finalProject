// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_l333OgzdsUBAMxJ2DIPcEYZoV6KyU5A",
  authDomain: "finalpro-747c7.firebaseapp.com",
  projectId: "finalpro-747c7",
  storageBucket: "finalpro-747c7.appspot.com",
  messagingSenderId: "244458162453",
  appId: "1:244458162453:web:8cd35a59acfcc6b2d7811c",
  measurementId: "G-J3JHB3VN3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export{app,auth,db}