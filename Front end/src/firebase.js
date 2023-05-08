import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrooL3XOzqNzmstcVqUokPtLWcoC4nTRs",
    authDomain: "motohut-security.firebaseapp.com",
    projectId: "motohut-security",
    storageBucket: "motohut-security.appspot.com",
    messagingSenderId: "8269603118",
    appId: "1:8269603118:web:3ca77025c7c0b872cbdabf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
export default app;
/*export const provider = getAuth(provider);*/

export { auth, provider };