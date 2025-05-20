import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Menu() {
  const api = import.meta.env.VITE_API_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const handleLogin = () => {
    setIsOpen(false)
    localStorage.setItem('demoMode', 'false');
    window.location.href = `${api}/login`;
  };
  const isDemo = localStorage.getItem('demoMode') === 'true'

  return (
    <div className="absolute flex flex-col left-0 ml-5 mt-5 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-pink-100 font-bold px-4 py-2 transition-all ease-in-out duration-300 cursor-pointer"
      >
        {!isOpen ? <Bars3Icon className="w-6 h-6 animate-fadeInFast hover:text-green-500 transition-all ease-in-out duration-300" /> 
        : <XMarkIcon className="w-6 h-6 animate-fadeInFast hover:text-red-500 transition-all ease-in-out duration-300" />}
      </button>

      {isOpen && (
        <div className="flex flex-col mt-2 ml-5 text-pink-100/40 space-y-5">
          <Link
            to="/dashboard"
            className="hover:text-green-500 transition-all ease-in-out duration-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/horoscope"
            className="hover:text-green-500 transition-all ease-in-out duration-300"
            onClick={() => setIsOpen(false)}
          >
            Horoscope
          </Link>
          <button
            onClick={() => handleLogin()}
            className={`${isDemo ? "cursor-pointer" : "opacity-0 pointer-events-none"} hover:text-green-500 transition-all ease-in-out duration-300 text-left`}>
            Try With Your Own Account
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
