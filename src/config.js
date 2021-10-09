import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

var firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD4uCMOr94Bwvvdhdg8I230jo8rQTjzK3I",
  authDomain: "iot-museum-project.firebaseapp.com",
  databaseURL:
    "https://iot-museum-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-museum-project",
  storageBucket: "iot-museum-project.appspot.com",
  messagingSenderId: "1079910907667",
  appId: "1:1079910907667:web:c6e48089e4628337ace4e6",
  measurementId: "G-VY7ZN8KLVT",
});

export default firebaseConfig;
