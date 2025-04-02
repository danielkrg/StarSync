import { useUserData } from "./UserDataContext";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

function Dashboard() {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) {
        return
    }

    const views = [
        {label: "Top Songs of All Time", data: longTermData.topTracks},
        {label: "Top Songs Recently", data: shortTermData.topTracks},
        {label: "Top Artists of All Time", data: longTermData.topArtists},
        {label: "Top Artists Recently", data: shortTermData.topArtists},
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const changeView = (direction) => {
        if (direction == "left") {
            setCurrentIndex((prev) => (prev - 1 + views.length) % views.length);
        }
        else {
            setCurrentIndex((prev) => (prev + 1) % views.length);
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <h1 className="text-5xl font-bold text-pink-100 mt-10">
                Hello {shortTermData.displayName}
            </h1>

            <div className="flex w-175 justify-between space-x-4 mt-8 text-2xl text-pink-100">
                <button
                onClick={() => changeView("left")}
                className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out"
                >
                <ChevronLeftIcon className="h-6 w-6"/>
                </button>

                {views[currentIndex].label}

                <button
                onClick={() => changeView("right")}
                className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out"
                >
                <ChevronRightIcon className="h-6 w-6"/>
                </button>
            </div>

            <div className="flex space-x-2 mt-5">
                <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                ${currentIndex === 0 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
               <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                ${currentIndex === 1 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
               <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-all duration-300 ease-in-out
                                ${currentIndex === 2 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
               <div className={`rounded-full w-3 h-3 border-1 border-pink-100/40 transition-alll duration-300 ease-in-out
                                ${currentIndex === 3 ? "bg-pink-100/80" : "bg-transparent"}`}></div> 
            </div>

            <div className="relative w-full">
                {views.map((view, i) => (
                    <div key = {i}
                    className = {`absolute inset-0 transition-opacity duration-500 ${
                        currentIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        {view.data && view.data.length > 0 ? (
                            <div className="mt-15 ml-15 items-center grid grid-cols-2 gap-full">
                            {view.data.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => window.open(item.link, '_blank')}
                                    className="group">
                                    <div key={index} className="flex items-center pt-5 pb-5">
                                        <div className="w-15 text-4xl font-bold mr-4 text-right text-pink-100 opacity-40">
                                            {index + 1}
                                        </div>
                                        {item.image ? (
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="border-2 border-transparent group-hover:border-green-500 transition-all ease-in-out duration-300
                                            animate-fadeIn w-20 h-20 object-cover rounded-full scale-125"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-pink-100 opacity-20 rounded-full" />
                                        )}
                                        <div className="ml-10 flex flex-col text-left">
                                            <h3 className="animate-fadeIn text-lg font-semibold text-pink-100 grow overflow-hidden whitespace-nowrap
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
