import { useState } from "react";
import Grad from '../assets/GradPhoto.jpg'

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

    const handleDemo = () => {
      localStorage.setItem('demoMode', 'true');
      window.location.href = "http://localhost:3000/dashboard"
    }

    return (
      <div className={`relative flex h-screen bg-gradient-to-t from-pink-950 from-50% to-indigo-950 overflow-hidden`}>
        <div className={`${showProfile ? "blur-none" : "blur-md"} flex flex-col items-center w-full`}>
          <div className="flex w-screen justify-left ml-40 items-center mt-30 space-x-120">
            <img
                src={Grad}
                className="w-40 h-40 rounded-full"
            />
            <div className={`transition-all duration-2000`}>
              <h1 className={`text-5xl font-bold text-pink-100`}>About Me</h1>
            </div>
          </div>
          <p className="text-3xl font-bold text-pink-100 p-30">
            {"I like to code and stuff I promise I learn very fast and work very hard just give me a chance to prove it"}
          </p>
          <button onClick={handleDemo}
            className="cursor-pointer text-pink-500 border-pink-500 border-2 hover:border-green-500 hover:text-green-500
            font-semibold py-2 px-4 w-35 rounded-full mb-30 transition-all duration-300 ease-in-out
            hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]">
              View Demo
            </button>
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
  