import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Backpack from '../assets/Images/Backpack.jpg'
import Board from '../assets/Images/Board.jpg'
import Grad from '../assets/Images/Grad.jpg'
import Kelp from '../assets/Images/Kelp.jpg'
import Tent from '../assets/Images/Tent.jpg'
import useMobile from '../Hooks/useMobile'

function AboutMe() {
    const [showProfile, setShowProfile] = useState(false);
    const [code, setCode] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const mobile = useMobile();

    const images = [Grad, Kelp, Board, Backpack, Tent];
    const captions = [
      'UBC Class of 2025: Mathematics',
      'My latest obsession...',
      'But I enjoy most outdoor things',
      'Even those that hurt my back',
      'Anything for a view like this...',
    ]
    

    const handleSubmit = (e) => {
      e.preventDefault();
      if (code === "HireMe") {
        localStorage.setItem('demoMode', 'true');
        setShowProfile(true);
      } else {
        alert("Invalid code");
      }
    };

    const handleDemo = () => {
      window.location.href = "/dashboard"
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
    
      <div className={`${showProfile ? "min-h-screen" : "h-screen overflow-hidden"} overflow-x-hidden relative flex bg-gradient-to-t from-pink-950 from-50% to-indigo-950`}>
        <div className={`${showProfile ? "blur-none" : "blur-md"} flex flex-col items-center w-full`}>
          {/* Page */}
          <div className={`flex ${mobile ? "flex-col items-center p-15" : "p-30"} w-screen pb-0`}>
            <div className="flex flex-col">
              <h1 className={`${mobile ? "text-7xl" : "text-9xl"} font-bold text-pink-100`}>ABOUT:</h1>
              {/* Paragraphs */}
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
              {/* Demo Button */}
              <div className="flex w-full justify-center mt-10">
                <button onClick={handleDemo}
                className={`cursor-pointer text-pink-500 border-pink-500 border-2 hover:border-green-500 hover:text-green-500
                font-semibold mb-10 py-2 px-4 w-35 rounded-full transition-all duration-300 ease-in-out
                hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]`}>
                  View Demo
                </button>
              </div>
            </div>
            {/* Image Carousel */}
              <div className="flex flex-col items-center">
                <div className={`relative ${mobile ? "h-[375px] w-[300px]" : "h-[500px] w-[400px]"}`}>
                  {/* Background */}
                  <div className="w-full h-full bg-black/20 rounded-3xl" />
                  {/* Current Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      key={currentIndex}
                      src={images[currentIndex]}
                      className={`${showProfile ? "opacity-100 animate-fadeInMed ease-in-out" : "opacity-0"} 
                      ${mobile ? "h-[335px] w-[260px]" : "h-[460px] w-[360px]"} object-cover rounded-2xl`}
                    />
                  </div>
                </div>
                {/* Carousel Buttons and Subtitles */}
                <div className="flex w-110 p-10 items-center justify-between">
                  <button
                  onClick={() => changeImage("left")}
                  className="h-6 w-6 hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <ChevronLeftIcon className="h-6 w-6"/>
                  </button>
                  {/* Current Subtitle */}
                  <div className="flex text-center">
                    <p key={currentIndex}
                      className={`${mobile ? "text-sm" : ""} italic text-pink-100/60 animate-fadeInFast ease-in-out`}>
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
        </div>

        {/* Security */}
        {!showProfile && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Form */}
            <form onSubmit={handleSubmit} 
            className={`${mobile ? "h-screen w-full items-center" : ""} flex bg-black/15 rounded-2xl text-pink-100 p-20`}>
              <div className="flex flex-col w-full">
                <h2 className="text-5xl font-bold mb-10">Enter Access Code:</h2>
                
                <div className="relative w-fit">
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)}
                    }
                    maxLength={6}
                    type={'password'}
                    className="focus:outline-none text-5xl mb-4 w-64 tracking-widest"
                  />
                  {/* Array of dissapearing underscores */}
                  <div className="absolute text-5xl tracking-widest ml-1 bottom-5 pointer-events-none">
                    {Array.from({length: 6}).map((_, i) => (
                      <span key={i} style={{ opacity: i < code.length ? 0 : 1 }}>_</span>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
  
  export default AboutMe;
  