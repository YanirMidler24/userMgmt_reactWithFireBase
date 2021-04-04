import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAGyVYvbdStBG-hArredYejeLD9FdH6LTw",
  authDomain: "yanirporject.firebaseapp.com",
  databaseURL: "https://yanirporject-default-rtdb.firebaseio.com",
  projectId: "yanirporject",
  storageBucket: "yanirporject.appspot.com",
  messagingSenderId: "833587645362",
  appId: "1:833587645362:web:bf3680ccc50b456b83b2ab",
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;
