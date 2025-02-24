import React from "react";
import GenerateHoroscope from "./HoroscopeAlgorithm";

function Horoscope() {
    const horoscope = GenerateHoroscope();

    return (
        <div>
            <h2>Your Musical Horoscope</h2>
            <p>{horoscope}</p>
        </div>
    );
}

export default Horoscope;
