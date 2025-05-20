import { useUserData } from '../Components/UserDataContext';
import { useState, useEffect} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Menu from '../Components/Menu'

function useMobile() {
    const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  
    useEffect(() => {
        const handleResize = () => {
        setMobile(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
    
        // Clean up on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return mobile;
}

function Dashboard() {
    const { longTermData, shortTermData } = useUserData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const mobile = useMobile();

    if (!longTermData || !shortTermData) {
        return ( 
        <div className="relative flex flex-col items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950"></div>
        )
    }

    const views = [
        {label: 'Top Songs of All Time', data: longTermData.topTracks},
        {label: 'Top Artists of All Time', data: longTermData.topArtists},
        {label: 'Top Songs Lately', data: shortTermData.topTracks},
        {label: 'Top Artists Lately', data: shortTermData.topArtists},
    ];

    const changeView = (direction) => {
        if (direction == 'left') {
            setCurrentIndex((prev) => (prev - 1 + views.length) % views.length);
        }
        else {
            setCurrentIndex((prev) => (prev + 1) % views.length);
        }
    }

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <Menu />
            <div className={`flex justify-center ${mobile ? "w-50" : "w-full"}`}>
                <div className="flex flex-col text-center justify-center items-center">
                    {/* GREETING */}
                    <h1 className="text-7xl font-bold text-pink-100 mt-5">
                        HELLO {shortTermData.displayName.toUpperCase() }
                    </h1>
                    {/* SCROLLER */}
                    <div className="flex mt-5 w-120 justify-between space-x-4 text-2xl font-semibold text-pink-100">
                        <button
                        onClick={() => changeView("left")}
                        className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                        >
                            <ChevronLeftIcon className="h-6 w-6"/>
                        </button>

                        {views[currentIndex].label}

                        <button
                        onClick={() => changeView("right")}
                        className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                        >
                            <ChevronRightIcon className="h-6 w-6"/>
                        </button>
                    </div>
                    {/* DOTS */}
                    <div className="flex space-x-2 mt-2">
                        <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                        ${currentIndex === 0 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
                        <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                            ${currentIndex === 1 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
                        <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                            ${currentIndex === 2 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
                        <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-alll duration-300 ease-in-out
                                            ${currentIndex === 3 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
                    </div>
                </div>
            </div>

            <div className="w-full">
                {views.map((view, i) => (
                    <div key = {i}
                    className={`inset-0 transition-opacity duration-500
                        ${currentIndex === i ? "opacity-100" 
                        : `${mobile ? "absolute top-[191px]" : "absolute top-[133px]"} opacity-0 pointer-events-none`} 
                        `}
                    >
                        {view.data && view.data.length > 0 ? (
                            <div className={`mt-15 ml-15 items-center grid ${mobile ? "grid-cols-1" : "grid-cols-2"} gap-full`}>
                            {view.data.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => window.open(item.link, '_blank')}
                                    className="group cursor-pointer">
                                    <div key={index} className="flex items-center pt-5 pb-5">
                                        <div className="w-15 text-4xl font-bold mr-4 text-right text-pink-100 opacity-40">
                                            {index + 1}
                                        </div>
                                        {item.image ? (
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="border-2 border-transparent group-hover:border-green-500 transition-all ease-in-out duration-300
                                            animate-fadeIn w-20 h-20 object-cover rounded-full scale-125
                                            group-hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-pink-100 opacity-20 rounded-full" />
                                        )}
                                        <div className="ml-10 flex flex-col text-left">
                                            <h3 className="animate-fadeIn text-lg text-pink-100 grow overflow-hidden whitespace-nowrap
                                            group-hover:text-green-500 transition-all ease-in-out duration-300">
                                            {item.name}
                                            </h3>
                                            <p className="animate-fadeInTranslucent text-sm text-pink-100 opacity-40 overflow-hidden whitespace-nowrap">
                                            {Array.isArray(item.artists)
                                                ? item.artists[0]
                                                : item.genres.join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            </div>
                        ) : (
                        <div className="flex flex-col w-full mt-50 space-y-20 items-center justify-center">
                            <div className="text-2xl font-semibold mt-6 text-pink-100">
                                We couldn't find any data...
                            </div>
                            <div className="text-2xl font-semibold mt-6 text-pink-100">
                                Listen to more music and come back!
                            </div>
                        </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
