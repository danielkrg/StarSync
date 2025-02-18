import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5001/userdata", { withCredentials: true })
            .then(response => setUserData(response.data))
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    return (
        <UserDataContext.Provider value={userData}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}
