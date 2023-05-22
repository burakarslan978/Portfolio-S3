import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkIfEmailExists, createUserData } from "./APICalls";

const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [huisnummerInput, setHuisnummerInput] = useState("");
    const [postcodeInput, setPostcodeInput] = useState("");
    const [stadInput, setStadInput] = useState("");
    const [straatInput, setStraatInput] = useState("");
    const [error, setError] = useState("");
    const [_isRegistering, setIsRegistering] = useState(false);

    
    /*useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user && !showRegisterForm) {
            setUser(user);
            navigate("/home");
          }
        });
    
        return unsubscribe;
      }, [navigate]);*/

      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            if (_isRegistering){
                if (checkIfEmailExists(user.email)) {
                    console.log(_isRegistering);
                    navigate("/home");
                  }
            }
            setIsRegistering(false);
          }
        });
    
      }, [navigate])
    // Scenario 1: User logs in with a new email and sees an error message
    // Scenario 2: User logs in with an existing email and is redirected to home page
    // Scenario 3: User registers with a new email and sees registration form
    // Scenario 4: User registers with an existing email and sees an error message
    const handleSignIn = (isRegistering) => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
                // Check if the email exists
                if(isRegistering){
                    setIsRegistering(true);
                }
                checkEmail(user.email, isRegistering);
                
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Check if the email exists in the database
    const checkEmail = async (email, isRegistering) => {
        const emailExists = checkIfEmailExists(email);
        if(!emailExists){
            if (isRegistering) {
                // Show registration form
                setShowRegisterForm(true);

                setEmailInput(user.email); // Fill email input with the user's email from Google
                setError("");
            } else {
                // Show error message
                setError("Account bestaat niet.");
                
            }
        } else{
            if (isRegistering) {
                // Show error message
                signOut(auth)
                    .then(() => {
                        setUser(null);
                        window.location.href = "/";
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    setError("Account bestaat al.");
                    setIsRegistering(false);
            } else {
                // Redirect to home page
                navigate("/home");
            }
        }
    };

    
    // Handle registration form submit
    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        const userCreated = createUserData(emailInput, huisnummerInput, postcodeInput, stadInput, straatInput);
        if(userCreated){
            navigate("/home");
        } else{
            setError("Er is iets fout gegaan...");
        }
    };



    // Handle input changes for registration form
    const handleEmailInputChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleHuisnummerInputChange = (event) => {
        setHuisnummerInput(event.target.value);
    };

    const handlePostcodeInputChange = (event) => {
        setPostcodeInput(event.target.value);
    };

    const handleStadInputChange = (event) => {
        setStadInput(event.target.value);
    };

    const handleStraatInputChange = (event) => {
        setStraatInput(event.target.value);
    };

    // Render the login page
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    {showRegisterForm ? (
                        <form onSubmit={handleRegisterFormSubmit}>
                            <h2 className="mb-3">Registreren</h2>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">
                                    E-mailadres
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    value={emailInput}
                                    onChange={handleEmailInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="huisnummerInput" className="form-label">
                                    Huisnummer
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="huisnummerInput"
                                    value={huisnummerInput}
                                    onChange={handleHuisnummerInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postcodeInput" className="form-label">
                                    Postcode
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="postcodeInput"
                                    value={postcodeInput}
                                    onChange={handlePostcodeInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stadInput" className="form-label">
                                    Stad
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stadInput"
                                    value={stadInput}
                                    onChange={handleStadInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="straatInput" className="form-label">
                                    Straat
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="straatInput"
                                    value={straatInput}
                                    onChange={handleStraatInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Registreren
                            </button>
                            {error && <div className="text-danger mt-3">{error}</div>}
                        </form>
                    ) : (
                        <div>
                            <h2 className="mb-3">Inloggen bij Motohut Beveilingssystemen</h2>
                            <button onClick={() => handleSignIn(false)} className="btn btn-primary me-3">
                                Inloggen met Google
                            </button>
                            <button onClick={() => handleSignIn(true)} className="btn btn-primary">
                                Registreren met Google
                            </button>
                            {error && <div className="text-danger mt-3">{error}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default LoginPage;