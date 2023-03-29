import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setIsLoggedIn(true);
                navigate("/");
                handleSuccessLogin();
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);


    return (
        
        <div>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Login;