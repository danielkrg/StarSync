import { useState } from "react";
import Mac from '../assets/Mac.jpg'

function AboutMe() {
    const [showProfile, setShowProfile] = useState(false);
    const [code, setCode] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault();
      if (code === "111111") {
        setShowProfile(true);
      } else {
        alert("Invalid code");
      }
    };

    return (
      <div className={`relative flex h-screen bg-gradient-to-t from-pink-950 from-50% to-indigo-950 overflow-hidden`}>
        <div className={`${showProfile ? "blur-none" : "blur-md"} flex flex-col items-center`}>
          <div className="flex w-screen justify-left ml-40 items-center mt-30 space-x-120">
            <img
                src={Mac}
                className="w-40 h-40 rounded-full"
            />
            <div className={`transition-all duration-700`}>
              <h1 className={`text-5xl font-bold text-pink-100`}>About Me</h1>
            </div>
          </div>
            <p className="text-3xl font-bold text-pink-100">
              {"I like to code and stuff I promise I learn very fast and work very hard just give me a chance to prove it"}
            </p>
        </div>

        {!showProfile && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <form onSubmit={handleSubmit} className="bg-black/15 rounded-2xl text-pink-100 p-20">
            <h2 className="text-5xl font-bold mb-10">Enter Access Code</h2>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="focus:outline-none text-5xl px-4 py-2 rounded mb-4 w-64 text-left tracking-widest"
              placeholder="______"
            />
          </form>
        </div>
      )}

      </div>
    );
  }
  
  export default AboutMe;
  