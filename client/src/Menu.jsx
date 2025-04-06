import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-10 left-10 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-pink-100 font-bold px-4 py-2 transition-all ease-in-out duration-300 cursor-pointer"
      >
        {!isOpen ? <Bars2Icon className="w-6 h-6 animate-fadeInFast hover:text-green-500 transition-all ease-in-out duration-300" /> 
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
        </div>
      )}
    </div>
  );
}

export default Menu;
