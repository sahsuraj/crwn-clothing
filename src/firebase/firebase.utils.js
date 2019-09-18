import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { log } from 'handlebars';

const firebaseConfig = {
    apiKey: "AIzaSyAe7q8NoZsOUmjFHGNBjrV25V9xU0GzNE4",
    authDomain: "crwn-project-suraj.firebaseapp.com",
    databaseURL: "https://crwn-project-suraj.firebaseio.com",
    projectId: "crwn-project-suraj",
    storageBucket: "",
    messagingSenderId: "529576074563",
    appId: "1:529576074563:web:66bc3b15da61512489a3f6"
  };

  export const createUserProfileDocument = async(userAuth, additionalData ) =>{
   if(!userAuth) return;

   const userRef= firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();
   //console.log(userAuth);
   if(!snapShot.exists){
     const { displayName, email } = userAuth;
     const createdAt = new Date();

     try{
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       } )
     }catch (error){
        console.log('error creating user', error.message);
     }
   }
   return userRef;
  } ;
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth= firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;