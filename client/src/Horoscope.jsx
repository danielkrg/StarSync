import { useUserData } from "./UserDataContext";
import GenerateHoroscope from "./HoroscopeAlgorithm";
import { useState, useEffect } from "react";

function Horoscope() {
    const { longTermData, shortTermData } = useUserData();
    const [horoscopeArr, setHoroscopeArr] = useState(() => {
        const saved = localStorage.getItem("horoscope");
        return saved ? JSON.parse(saved) : [];
    });

    const [regenerate, setRegenerate] = useState(false);
    const dataFetched = longTermData && shortTermData;

    useEffect(() => {
        if ((horoscopeArr.length === 0 || regenerate) && dataFetched) {
            const newHoroscope = GenerateHoroscope({ longTermData, shortTermData });
            setHoroscopeArr(newHoroscope);
            localStorage.setItem("horoscope", JSON.stringify(newHoroscope));
            setRegenerate(false);
        }
    }, [regenerate, dataFetched]);

    const handleRegenerate = () => {
        localStorage.removeItem("horoscope");
        setRegenerate(true);
    };

    return (
        <div className="relative flex flex-col space-y-10 items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <h1 className="text-5xl font-bold text-pink-100 mt-10">
                Your Musical Horoscope
            </h1>
            {horoscopeArr.length === 3 ? (
                <>
                    <p className="ml-10 mr-10">
                        {horoscopeArr[0]}
                    </p>
                    <p className="ml-10 mr-10">
                        {horoscopeArr[1]}
                    </p>
                    <p className="ml-10 mr-10">
                        {horoscopeArr[2]}
                    </p>
                    <button onClick={handleRegenerate} 
                    className="border-2 border-pink-600 hover:border-green-500 
                    font-semibold text-pink-600 hover:text-green-500
                    py-2 px-4 rounded-full 
                    transition-all duration-300 ease-in-out">
                        Regenerate
                    </button>
                </>
            ) : (
                <div className="relative flex flex-col items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950"></div>
            )}
        </div>
    );
}

export default Horoscope;
