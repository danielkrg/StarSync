import { useUserData } from '../Components/UserDataContext';
import GenerateHoroscope from '../Components/HoroscopeAlgorithm';
import { useState, useEffect } from 'react';
import Menu from '../Components/Menu'
import Waves from '../assets/SVGs/layeredWavesHoroscope.svg?react'

function Horoscope() {
    const { longTermData, shortTermData } = useUserData();

    const [horoscopeArr, setHoroscopeArr] = useState(() => {
        const saved = localStorage.getItem('horoscope');
        try {
            const parsed = saved ? JSON.parse(saved) : [];
            const isValid = Array.isArray(parsed) && parsed.length === 3 && parsed.every(p => p !== null);
            return isValid ? parsed : [];
        } catch {
            return [];
        }
    });
    
    const [firstHoroscope, setFirstHoroscope] = useState('');
    const [secondHoroscope, setSecondHoroscope] = useState('');
    const [thirdHoroscope, setThirdHoroscope] = useState('');
    const [phase, setPhase] = useState('first');

    const [regenerate, setRegenerate] = useState(false);
    const [skip, setSkip] = useState(false);
    const specialChars = [',', '.', ';', '-', '?']

    const handleRegenerate = () => {
        localStorage.removeItem('horoscope');
        setRegenerate(true);    
    };

    const handleSkip = () => {
        setSkip(true);
    }

    const addDelay = (char) => {
        if (specialChars.includes(char)) {
            return 100
        }
        else {
            return 0
        }
    }

    useEffect(() => {
        const dataFetched = (shortTermData !== null) && (longTermData !== null)
        if ((horoscopeArr.length === 0 || regenerate) && dataFetched) {
            const newHoroscope = GenerateHoroscope({ longTermData, shortTermData });
            setHoroscopeArr(newHoroscope);
            setFirstHoroscope('')
            setSecondHoroscope('')
            setThirdHoroscope('')
            setPhase('first')
            localStorage.setItem('horoscope', JSON.stringify(newHoroscope));
            setRegenerate(false);
        }

        let timeout;

        if (skip) {
            setFirstHoroscope(horoscopeArr[0]);
            setSecondHoroscope(horoscopeArr[1]);
            setThirdHoroscope(horoscopeArr[2]);
            setPhase('')
            setSkip(false)
            return () => clearTimeout(timeout);
        }

        if (phase == 'first' && horoscopeArr[0]) {
            if (firstHoroscope.length < horoscopeArr[0].length) {
                timeout = setTimeout(() => {
                    setFirstHoroscope(horoscopeArr[0].slice(0, firstHoroscope.length + 1));
                }, 15 + addDelay(firstHoroscope[firstHoroscope.length - 1]));
            }
            else {
                timeout = setTimeout(() => setPhase('second'), 15);
            }
        }
        else if (phase == 'second') {
            if (secondHoroscope.length < horoscopeArr[1].length) {
                timeout = setTimeout(() => {
                    setSecondHoroscope(horoscopeArr[1].slice(0, secondHoroscope.length + 1));
                }, 15 + addDelay(secondHoroscope[secondHoroscope.length - 1]));
            }
            else {
                timeout = setTimeout(() => setPhase('third'), 15);
            }
        }
        else if (phase == 'third') {
            if (thirdHoroscope.length < horoscopeArr[2].length) {
                timeout = setTimeout(() => {
                    setThirdHoroscope(horoscopeArr[2].slice(0, thirdHoroscope.length + 1));
                }, 15 + addDelay(thirdHoroscope[thirdHoroscope.length - 1]));
            }
            else {
                timeout = setTimeout(() => setPhase('done'));
            }
        }
        else if (phase == 'done') {
            timeout = setTimeout(() => setPhase(''), 4000)
        }
        return () => clearTimeout(timeout);
    }, [regenerate, shortTermData, longTermData, horoscopeArr, firstHoroscope, secondHoroscope, thirdHoroscope, phase]);

    return (
        <div className="relative flex flex-col space-y-10 items-center min-h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <Menu />
            <div className="flex h-40 justify-between">
                <div className="w-50"></div>
                <h1 className="mt-5 text-7xl text-center font-bold text-pink-100 pointer-events-none">
                    YOUR READING:
                </h1>
                <div className="w-50"></div>
            </div>
            <div className="flex flex-col w-full"> 
                <p className="ml-30 mr-30 mb-20 text-2xl min-h-[4.5em] text-pink-100/60">
                    {firstHoroscope}
                    {phase === 'first' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 mb-20 text-2xl min-h-[3em] text-pink-100/60">
                    {secondHoroscope}
                    {phase === 'second' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 mb-10 text-2xl min-h-[3em] text-pink-100/60">
                    {thirdHoroscope}
                    {(phase === 'third' || phase == 'done') && <span className="animate-blinking-cursor">|</span>}
                </p>
                <div className="flex flex-col items-center justify-center">
                    <button onClick={(phase !== 'done' && phase !== '') ? handleSkip : handleRegenerate} 
                    className="cursor-pointer text-pink-500 border-pink-500 border-2 hover:border-green-500 hover:text-green-500
                    font-semibold py-2 px-4 w-35 rounded-full transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]">
                        <span
                        key={phase}
                        className="animate-fadeInFast">
                            {(phase !== 'done' && phase !== '') ? "Skip" : "Regenerate"}
                        </span>
                    </button>
                    <div className="w-full pointer-events-none z-0">
                        <Waves className="w-full h-auto"/>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default Horoscope;
