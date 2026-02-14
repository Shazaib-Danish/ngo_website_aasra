
// Use compat imports to resolve missing named export errors in specific environments
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Replace these values with your actual Firebase project configuration
// from the Firebase Console (Project Settings > General > Your Apps)
const firebaseConfig = {
  apiKey: "AIzaSyBQlXE3ZTGzEDp3U1YucSfbCUOz4oRRUEw",
  authDomain: "aasra-messaging-system.firebaseapp.com",
  projectId: "aasra-messaging-system",
  storageBucket: "aasra-messaging-system.appspot.com",
  messagingSenderId: "724660037659",
  appId: "1:724660037659:web:491959639bc5c298d0b0be",
  measurementId: "G-R1EPPS4QXT"
};
// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the firestore instance and serverTimestamp for use in other components
export const db = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export default firebase;
