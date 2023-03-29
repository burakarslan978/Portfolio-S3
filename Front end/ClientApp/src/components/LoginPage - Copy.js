//import React from "react";
//import { useState } from 'react';
//import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { auth, provider } from "../firebase";

///*const provider = new firebase.auth.GoogleAuthProvider();*/
//const [isLoggedIn, setIsLoggedIn] = useState(false);

//const handleSignIn = () => {
//    //const auth = getAuth();
//    signInWithPopup(auth, provider)
//        .then((result) => {
//            // This gives you a Google Access Token. You can use it to access the Google API.
//            const credential = GoogleAuthProvider.credentialFromResult(result);
//            const token = credential.accessToken;
//            // The signed-in user info.
//            const user = result.user;
//            // IdP data available using getAdditionalUserInfo(result)
//            // ...
//            setIsLoggedIn(true);
//        }).catch((error) => {
//            // Handle Errors here.
//            const errorCode = error.code;
//            const errorMessage = error.message;
//            // The email of the user's account used.
//            const email = error.customData.email;
//            // The AuthCredential type that was used.
//            const credential = GoogleAuthProvider.credentialFromError(error);
//            // ...
//        });
//};

//if (isLoggedIn) {
//    return <Redirect to="/" />;
//}

//const Login = () => {
//    return (
//        <div>
//            <button onClick={handleSignIn}>Sign in with Google</button>
//        </div>
//    );
//};

//export default Login;