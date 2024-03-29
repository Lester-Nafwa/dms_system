import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFunctions, httpsCallable } from "firebase/functions";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAIVJLuoNoV5ASFE05kf_vXFbkMOCOJGXI",

  authDomain: "dms-kenya.firebaseapp.com",

  databaseURL: "https://dms-kenya-default-rtdb.firebaseio.com",

  projectId: "dms-kenya",

  storageBucket: "dms-kenya.appspot.com",

  messagingSenderId: "870862696437",

  appId: "1:870862696437:web:aeb916b4e95186346f3abc"

}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const functions = getFunctions(app);
const setRoleClaimFunction = httpsCallable(functions, "setRoleClaim");


// Calling the Cloud Function
async function assignRoleToUser(uid, role) {
  try {
    const response = await setRoleClaimFunction({ uid, role });
    console.log(response.data); // Success message or other response data
  } catch (error) {
    console.error("Error assigning role:", error);
  }}

 

firebase.initializeApp(firebaseConfig);
 
 
// Initialize Firebase firestore
 
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export { auth,assignRoleToUser }