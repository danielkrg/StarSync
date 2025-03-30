import { useUserData } from "./UserDataContext";

function Dashboard() {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) {
        return "There seems to be an issue finding any data..."
    }

    return (
        <div className="relative flex flex-col items-center justify-start h-screen bg-gradient-to-t from-pink-950 to-indigo-950">
            <h1 className="text-5xl font-bold text-pink-100 mt-10">
                Hello {shortTermData.displayName}
            </h1>

            <div className="mt-8 text-2xl text-pink-100">
                Top Songs of All Time
            </div>

            {longTermData.topTracks && longTermData.topTracks.length > 0 ? (
                <div className="p-10 ml-20 grid grid-cols-2 gap-full">
                {longTermData.topTracks.map((track, index) => (
                    <button
                        key={index}
                        onClick={() => window.open(track.link, '_blank')}
                        className="border-2 border-transparent hover:border-green-500 rounded
                        transition-all duration-300 ease-in-out">
                        <div key={index} className="flex items-center p-4">
                            <div className="w-15 text-4xl font-bold mr-4 text-left text-pink-100 opacity-40">
                                {index + 1}
                            </div>
                            {track.image ? (
                                <img
                                src={track.image}
                                alt={track.name}
                                className="w-20 h-20 object-cover rounded scale-125"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-pink-100 opacity-20 rounded" />
                            )}
                            <div className="ml-10 flex flex-col text-left">
                                <h3 className="text-lg font-semibold text-pink-100 grow">
                                {track.name}
                                </h3>
                                <p className="text-sm text-pink-100 opacity-40">
                                {track.artists[0]}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
                </div>
            ) : (
                <p className="mt-6 text-white">No top tracks available.</p>
            )}
        </div>

    );
}

export default Dashboard;
