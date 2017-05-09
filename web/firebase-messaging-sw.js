importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDVu7kqw9ht5RfO8okNfeneLg7nNH-8W0k",
    authDomain: "sad-ait-sg.firebaseapp.com",
    databaseURL: "https://sad-ait-sg.firebaseio.com",
    projectId: "sad-ait-sg",
    storageBucket: "sad-ait-sg.appspot.com",
    messagingSenderId: "189984423113"
  };
  firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
});



