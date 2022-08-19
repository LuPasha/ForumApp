import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDLefSpOKgzQ0e-9uTZo4zumZeJkUdFqJc",
  authDomain: "forum-app-3128a.firebaseapp.com",
  projectId: "forum-app-3128a",
  storageBucket: "forum-app-3128a.appspot.com",
  messagingSenderId: "787492908828",
  appId: "1:787492908828:web:08857b3d232b49b0c794d9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, db };
