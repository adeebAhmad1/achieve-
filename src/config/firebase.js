import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgyiga5B-cKXw2fDqcmQEHSZqvyCblIzw",
  authDomain: "social-feed1.firebaseapp.com",
  databaseURL: "https://social-feed1.firebaseio.com",
  projectId: "social-feed1",
  storageBucket: "social-feed1.appspot.com",
  messagingSenderId: "756473744619",
  appId: "1:756473744619:web:bf7f079e39739a89afc2ae"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();

export { db, storage, storageRef };

export default firebase;