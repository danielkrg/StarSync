import { useState, useEffect} from "react";

function Error() {
    const api = import.meta.env.VITE_API_BASE_URL;
    const messages = [
        'YOU FOUND A BUG',
        'PLEASE TRY AGAIN',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [phase, setPhase] = useState('typing');

    useEffect(() => {
        const currentMessage = messages[currentIndex];

        let timeout;
        if (phase === 'typing') {
            if (displayedText.length < currentMessage.length) {
              timeout = setTimeout(() => {
                setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
              }, 100);
            } 
            else {
              // Typing done → pause before deleting
              setTimeout(() => setPhase('pausing'), 2500);
            }
          } 
        else if (phase === 'pausing') {
        // Just hold the message for a bit longer before deleting
        timeout = setTimeout(() => setPhase('deleting'), 2000);
        } 
        else if (phase === 'deleting') {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                setDisplayedText(currentMessage.slice(0, displayedText.length - 1));
                }, 50);
            }
            else {
                setCurrentIndex((prev) => (prev + 1) % messages.length);
                setPhase('typing');
            }
        }
      
        return () => clearTimeout(timeout);
    }, [displayedText, phase, currentIndex]);

    const handleHome = () => {
        localStorage.setItem('demoMode', 'false');
        window.location.href = `/home`;
    }

    return (
        <div className="relative flex flex-col h-screen bg-gradient-to-t from-rose-700/80 from-10% to-slate-900 overflow-hidden">
            <div className="flex flex-col items-center space-y-50 mt-25 flex-grow z-10">
                <h1
                    className="font-bold text-9xl text-pink-100 leading-tight h-14"
                >
                    ERROR:
                </h1>
                <h1
                    className="font-bold text-5xl text-pink-100 leading-tight h-14"
                >
                    {displayedText}
                    <span className="animate-blinking-cursor text-5xl">|</span>
                </h1>
                <button
                    onClick={handleHome}
                    className="border-2 border-slate-600 hover:border-green-500 
                    font-semibold text-slate-600 hover:text-green-500
                    py-2 px-4 rounded-full cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]"
                >
                    Home
                </button>
            </div>
        </div>
    );
}   

export default Error;