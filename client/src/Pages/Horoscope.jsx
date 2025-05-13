import { useUserData } from '../Components/UserDataContext';
import GenerateHoroscope from '../Components/HoroscopeAlgorithm';
import { useState, useEffect } from 'react';
import Menu from '../Components/Menu'
import Waves from '../assets/layered-waves.svg?react'

function Horoscope() {
    const { longTermData, shortTermData } = useUserData();
    const isDemo = localStorage.getItem('demoMode') === 'true'

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
        <div className="relative flex flex-col space-y-10 items-center h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <div className="flex w-full justify-between items-start">
                <Menu />
                <h1 className="mt-5 text-7xl font-bold text-pink-100">
                    YOUR READING:
                </h1>
                <button
                    onClick={() => window.location.href = "/aboutme"}
                    className={`opacity-0 pointer-events-none font-semibold text-pink-500 hover:text-green-500
                    mr-5 mt-5 rounded-full cursor-pointer
                    transition-all duration-300 ease-in-out`}
                >
                    Recruiters Click Here
                </button>
            </div>
            <div className="absolute mt-50 space-y-30 w-full h-250"> 
                <p className="ml-30 mr-30 text-2xl text-pink-100/60">
                    {firstHoroscope}
                    {phase === 'first' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 text-2xl text-pink-100/60">
                    {secondHoroscope}
                    {phase === 'second' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 text-2xl text-pink-100/60">
                    {thirdHoroscope}
                    {(phase === 'third' || phase == 'done') && <span className="animate-blinking-cursor">|</span>}
                </p>
            </div>
            <button onClick={(phase !== 'done' && phase !== '') ? handleSkip : handleRegenerate} 
            className="absolute mt-185 cursor-pointer text-pink-500 border-pink-500 border-2 hover:border-green-500 hover:text-green-500
            font-semibold py-2 px-4 w-35 rounded-full mb-30 transition-all duration-300 ease-in-out
            hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]">
                <span
                key={phase}
                className="animate-fadeInFast">
                    {(phase !== 'done' && phase !== '') ? "Skip" : "Regenerate"}
                </span>
            </button>
            {/* Waves */}
            <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none z-0">
                <Waves className="w-full h-auto scale-x-[-1]"/>
            </div>
        </div>
    );
}

export default Horoscope;
