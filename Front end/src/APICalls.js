
const Url = "http://localhost:5157/FirebaseStorageService";

export const checkIfEmailExists = async (email) => {
    try {
        const response = await fetch(
            `${Url}/CheckEmail?email=${encodeURIComponent(email)}`
        );
        const data = await response.json();
        const id = data.id;
        if (id === "0") {
            // Email niet gevonden
            return false;
        } else {
            // Email gevonden
            return true;
        }
    } catch (error) {
        // Foutbericht
        console.log("Account checken mislukt." + error);
        return false;
    }
};

export const createUserData = async (email, huisnummer, postcode, stad, straat) => {
    try {
        // Call the API to save the user's registration data
        const response = await fetch(Url + '?email=' + encodeURIComponent(email)
            + '&huisnummer=' + encodeURIComponent(huisnummer) + '&postcode=' + encodeURIComponent(postcode)
            + '&stad=' + encodeURIComponent(stad) + '&straat=' + encodeURIComponent(straat), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const id = data.id;
            if (id) {
                // Registration successful, redirect to home page
                return true;
            } else {
                // Show error message
                console.log("Er is iets fout gegaan...");
                return false;
            }
        } else {
            // Show error message
            console.log("Er is iets fout gegaan...");
            return false;
        }
    } catch (error) {
        // Show error message
        console.log("Er is iets fout gegaan..." + error);
        return false
    }
}

export const getUserVideos = async (email) => {
    try {
        const response = await fetch(`${Url}?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Er is iets fout gegaan bij het ophalen van de gegevens" + error);
        return false;
    }
}
