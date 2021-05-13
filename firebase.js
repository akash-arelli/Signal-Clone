import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbpuD-Zy15BgNnZXEVZwJegiTt4yevQUA",
  authDomain: "signal-clone-76b37.firebaseapp.com",
  projectId: "signal-clone-76b37",
  storageBucket: "signal-clone-76b37.appspot.com",
  messagingSenderId: "56609175813",
  appId: "1:56609175813:web:b7b4a3c5b5c6b461f75f6c",
  measurementId: "G-QHXRBV21HN",
};

let app;

app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
