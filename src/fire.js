import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyARYMfkZMaBzKxUf0-PUvTXkFwKYrkX8ro",
  authDomain: "react-firebase-practice-31c7c.firebaseapp.com",
  databaseURL: "https://react-firebase-practice-31c7c.firebaseio.com",
  projectId: "react-firebase-practice-31c7c",
  storageBucket: "react-firebase-practice-31c7c.appspot.com",
  messagingSenderId: "230462173025",
  appId: "1:230462173025:web:691d3ebb6afaf7a3091f20",
  measurementId: "G-126MXFTN4W",
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;
