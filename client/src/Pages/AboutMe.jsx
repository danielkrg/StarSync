import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Backpack from '../assets/Images/Backpack.jpg'
import Board from '../assets/Images/Board.jpg'
import Grad from '../assets/Images/Grad.jpg'
import Kelp from '../assets/Images/Kelp.jpg'
import Tent from '../assets/Images/Tent.jpg'
import View from '../assets/Images/View.jpg'
import Waves from '../assets/layered-waves.svg?react'

function AboutMe() {
    const [showProfile, setShowProfile] = useState(false);
    const [code, setCode] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0) ;

    const images = [Grad, Kelp, Board, Backpack, Tent];
    const captions = [
      'UBC Class of 2025: Mathematics',
      'My latest obsession...',
      'Though I enjoy most outdoor things',
      'Even those that hurt my back',
      'Anything for a view like this...',
    ]
    

    const handleSubmit = (e) => {
      e.preventDefault();
      if (code === "111111") {
        localStorage.setItem('demoMode', 'true');
        setShowProfile(true);
      } else {
        alert("Invalid code");
      }
    };

    const handleDemo = () => {
      window.location.href = "http://localhost:3000/dashboard"
    }

    const changeImage = (direction) => {
      if (direction === 'left') {
        setCurrentIndex((curr) => (curr - 1 + images.length) % images.length);
      }
      else {
        setCurrentIndex((curr) => (curr + 1) % images.length);
      }
      console.log(currentIndex)
    }

    return (
      <div className={`relative flex h-screen bg-gradient-to-t from-pink-950 from-50% to-indigo-950 overflow-hidden`}>
        <div className={`${showProfile ? "blur-none" : "blur-md"} flex flex-col items-center w-full`}>
          <div className="flex w-screen justify-between items-top p-30 pb-0 space-x-20">
            <div className="flex flex-col">
              <h1 className={`text-9xl font-bold text-pink-100`}>ABOUT:</h1>
              <p className="text-xl font-bold text-pink-100/60 mt-10">
                {"I’m Daniel, a soon to be developer with a background in Mathematics."}
              </p>
              <p className="text-xl font-bold text-pink-100/60 mt-10">
                {"I see programming as a way to express my creative side - an opportunity to build applications that not only offer elegant solutions, but also feel intuitive and satisfying to use. "}
                {"I believe in clean, intentional design that reflects my detail-oriented and analytic mindset. "}
                {"I challenge the status quo by going beyond expectations, diligently polishing my work and adding minor details that elevate it from "} <span className="italic">good</span> {' to '} <span className="italic">great</span>.
              </p>
              <p className="text-xl font-bold text-pink-100/60 mt-10">
                {"I’m always seeking new adventures and enjoy expanding my collection of hobbies. "}
                {"My curiosity and desire to learn pushes me to conquer challenges and absorb as much information as possible along the way. "}
              </p>
              <p className="text-xl font-bold text-pink-100/60 mt-10">
                {"I look forward to joining a team where I can contribute meaningfully, continue evolving, and - most importantly - exceed expectations."}
              </p>
              <div className="flex w-full justify-center mt-10">
                <button onClick={handleDemo}
                className="cursor-pointer text-pink-500 border-pink-500 border-2 hover:border-green-500 hover:text-green-500
                font-semibold py-2 px-4 w-35 rounded-full mb-30 transition-all duration-300 ease-in-out
                hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]">
                  View Demo
                </button>
              </div>
            </div>
              <div className="flex flex-col">
                <div className="relative h-[500px] w-[400px]">
                  <div className="w-full h-full bg-black/20 rounded-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      key={currentIndex}
                      src={images[currentIndex]}
                      className={`${showProfile ? "opacity-100 animate-fadeInMed ease-in-out" : "opacity-0"} 
                      w-[360px] h-[460px] object-cover rounded-2xl`}
                    />
                  </div>
                </div>
                <div className="flex w-full h-10 pl-10 pr-10 pt-10 items-center justify-between">
                  <button
                  onClick={() => changeImage("left")}
                  className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <ChevronLeftIcon className="h-6 w-6"/>
                  </button>
                  <div className="flex align-center">
                    <p key={currentIndex}
                      className="italic text-pink-100/60 animate-fadeInFast ease-in-out">
                      {captions[currentIndex]}
                    </p>
                  </div>
                  <button
                  onClick={() => changeImage("right")}
                  className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <ChevronRightIcon className="h-6 w-6"/>
                  </button>
                </div>
              </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none z-0">
            <Waves className="w-full h-auto scale-x-[-1]"/>
          </div>
        </div>

        {/* Security */}
        {!showProfile && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-black/15 rounded-2xl text-pink-100 p-20">
          <h2 className="text-5xl font-bold mb-10">Enter Access Code</h2>
          
          <div className="relative w-fit">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value)}
              }
              maxLength={6}
              className="focus:outline-none text-5xl mb-4 w-64 ml-32 tracking-widest"
            />
            <div className="absolute text-5xl tracking-widest ml-32 bottom-5 pointer-events-none">
              {Array.from({length: 6}).map((_, i) => (
                <span key={i} style={{ opacity: i < code.length ? 0 : 1 }}>_</span>
              ))}
            </div>
          </div>
        </form>
      </div>
      
        )}
      </div>
    );
  }
  
  export default AboutMe;
  