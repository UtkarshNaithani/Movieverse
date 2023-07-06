import { initializeApp } from "firebase/app";
//we have created our firestore,to access it
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDc_YxKbmglkNSPlN-NUNutDE3aSFxU1tA",
    authDomain: "movieverse-cb0b5.firebaseapp.com",
    projectId: "movieverse-cb0b5",
    storageBucket: "movieverse-cb0b5.appspot.com",
    messagingSenderId: "778559557515",
    appId: "1:778559557515:web:087b9aba34bea520e8a98e"
};


const app = initializeApp(firebaseConfig);
//will access app from the getfirestore that we have imported,export so others can use
export const db=getFirestore(app);
//to access the collection inside that app
export const moviesRef=collection(db, "movies");
export const reviewsRef=collection(db, "reviews");
export const usersRef=collection(db, "users");

export default app;