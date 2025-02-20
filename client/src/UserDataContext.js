import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const [longTermData, setLongTermData] = useState(null);
    const [shortTermData, setShortTermData] = useState(null);

    // Function to fetch long-term data
    const fetchLongTermData = async () => {
        try {
            const response = await axios.get("http://localhost:5001/userdata?time_range=long_term", { withCredentials: true });
            setLongTermData(response.data);
        } catch (error) {
            console.error("Error fetching long-term user data:", error);
        }
    };

    // Function to fetch short-term data
    const fetchShortTermData = async () => {
        try {
            const response = await axios.get("http://localhost:5001/userdata?time_range=short_term", { withCredentials: true });
            setShortTermData(response.data);
        } catch (error) {
            console.error("Error fetching short-term user data:", error);
        }
    };

    useEffect(() => {
        fetchLongTermData();
        fetchShortTermData();
    }, []);

    return (
        <UserDataContext.Provider value={{ longTermData, shortTermData, fetchLongTermData, fetchShortTermData }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}
