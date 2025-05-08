import { createContext, useState, useEffect, useContext } from "react";
import longTermDemo from '../assets/DemoData/longTermDemo.json'
import shortTermDemo from '../assets/DemoData/shortTermDemo.json'
import axios from "axios";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
    const [longTermData, setLongTermData] = useState(null);
    const [shortTermData, setShortTermData] = useState(null);
    const isDemo = localStorage.getItem('demoMode') === 'true'

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

    const fetchDemoData = async () => {
        setLongTermData(longTermDemo);
        setShortTermData(shortTermDemo);
    }

    useEffect(() => {
        if (isDemo) {
            fetchDemoData();
        }
        else {
            fetchLongTermData();
            fetchShortTermData();
        }
    }, [isDemo]);

    return (
        <UserDataContext.Provider value={{ longTermData, shortTermData, fetchLongTermData, fetchShortTermData }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}
