import React from "react";
import GenerateHoroscope from "./HoroscopeAlgorithm";

function Horoscope() {
    const horoscopeArr = GenerateHoroscope();

    return (
        <div>
            <h2>Your Musical Horoscope</h2>
            <p>{horoscopeArr[0]}</p>
            <p>{horoscopeArr[1]}</p>
        </div>
    );
}

export default Horoscope;
