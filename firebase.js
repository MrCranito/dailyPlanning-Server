// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyDwDwkvpwdKIm09EUBiK-UQ0yoorek-EF4",
    authDomain: "devmobile-56377.firebaseapp.com",
    databaseURL: "https://devmobile-56377.firebaseio.com",
    projectId: "devmobile-56377",
    storageBucket: "devmobile-56377.appspot.com",
    messagingSenderId: "1027769887047",
    appId: "1:1027769887047:web:2e0d2cb470171c47064462"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);