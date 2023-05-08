import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { UserContext } from './UserContext';
import './Home.css';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            }
        });

    }, [])


    return (
        <section>
            <div>
                <h1>Welkom bij Motohut Beveiliging {user ? user.displayName : ''}</h1>
                <p>Bedankt voor het kiezen van Motohut Beveiliging</p>
            </div>
            {user && (
                <div>
                    <h2>Persoonlijke gegevens:</h2>
                    <p><b>Naam: </b>{user.displayName}</p>
                    <p><b>Email: </b>{user.email}</p>
                    <p><b>Gebruikers ID: </b>{user.uid}</p>
                    <img src={user.photoURL} alt="User Profile" />
                </div>
            )}
        </section>

    )
}

export default Home