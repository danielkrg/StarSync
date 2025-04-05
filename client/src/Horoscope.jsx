import { useUserData } from './UserDataContext';
import GenerateHoroscope from './HoroscopeAlgorithm';
import { useState, useEffect } from 'react';

function Horoscope() {
    const { longTermData, shortTermData } = useUserData();
    const [horoscopeArr, setHoroscopeArr] = useState(() => {
        const saved = localStorage.getItem('horoscope');
        return saved ? JSON.parse(saved) : [];
    });
    const [firstHoroscope, setFirstHoroscope] = useState('');
    const [secondHoroscope, setSecondHoroscope] = useState('');
    const [thirdHoroscope, setThirdHoroscope] = useState('');
    const [phase, setPhase] = useState('first');

    const [regenerate, setRegenerate] = useState(false);
    const dataFetched = longTermData && shortTermData;

    const specialChars = [',', '.', ';', '-', '?']

    useEffect(() => {
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

        if (phase == 'first') {
            if (firstHoroscope.length < horoscopeArr[0].length) {
                timeout = setTimeout(() => {
                    setFirstHoroscope(horoscopeArr[0].slice(0, firstHoroscope.length + 1));
                }, 25 + addDelay(firstHoroscope[firstHoroscope.length - 1]));
            }
            else {
                timeout = setTimeout(() => setPhase('second'), 2000);
            }
        }
        else if (phase == 'second') {
            if (secondHoroscope.length < horoscopeArr[1].length) {
                timeout = setTimeout(() => {
                    setSecondHoroscope(horoscopeArr[1].slice(0, secondHoroscope.length + 1));
                }, 25 + addDelay(secondHoroscope[secondHoroscope.length - 1]));
            }
            else {
            timeout = setTimeout(() => setPhase('third'), 2000);
            }
        }
        else if (phase == 'third') {
            if (thirdHoroscope.length < horoscopeArr[2].length) {
                timeout = setTimeout(() => {
                    setThirdHoroscope(horoscopeArr[2].slice(0, thirdHoroscope.length + 1));
                }, 25 + addDelay(thirdHoroscope[thirdHoroscope.length - 1]));
            }
            else {
                timeout = setTimeout(() => setPhase('done'));
            }
        }
        else if (phase == 'done') {
            timeout = setTimeout(() => setPhase(''), 4000)
        }
        return () => clearTimeout(timeout);
    }, [regenerate, dataFetched, firstHoroscope, secondHoroscope, thirdHoroscope, phase]);

    const handleRegenerate = () => {
        localStorage.removeItem('horoscope');
        setRegenerate(true);
    };

    const addDelay = (char) => {
        if (specialChars.includes(char)) {
            return 100
        }
        else {
            return 0
        }
    }

    return (
        <div className="relative flex flex-col space-y-10 items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <h1 className="text-5xl font-bold text-pink-100 mt-10 mb-20">
                Your Musical Horoscope
            </h1>
            <div className="space-y-30 w-full h-250"> 
                <p className="ml-30 mr-30 text-2xl text-pink-100">
                    {firstHoroscope}
                    {phase === 'first' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 text-2xl text-pink-100">
                    {secondHoroscope}
                    {phase === 'second' && <span className="animate-blinking-cursor">|</span>}
                </p>
                <p className="ml-30 mr-30 text-2xl text-pink-100">
                    {thirdHoroscope}
                    {(phase === 'third' || phase == 'done') && <span className="animate-blinking-cursor">|</span>}
                </p>
            </div>
            <button onClick={handleRegenerate} 
            className={`border-2 hover:border-green-500 hover:text-green-500
            font-semibold py-2 px-4 rounded-full mb-30 transition-all duration-300 ease-in-out
            ${(phase !== 'done' && phase !== '') ? "pointer-events-none border-zinc-600 text-zinc-600" : "border-pink-600 text-pink-600"}`}>
                Regenerate
            </button>
        </div>
    );
}

export default Horoscope;
