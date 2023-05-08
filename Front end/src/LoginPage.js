import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user.email) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default LoginPage;