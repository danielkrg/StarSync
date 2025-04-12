import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Security() {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "111111") {
      setShowInput(!showInput);
      navigate("/aboutme");
    } else {
      alert("Invalid code");
    }
  };

  return (
    <div className="absolute top-4 right-4 text-right z-50">
      <button
        onClick={() => setShowInput(!showInput)}
        className={`font-semibold text-pink-500 hover:text-green-500
        py-2 px-4 rounded-full cursor-pointer
        transition-all duration-300 ease-in-out`}
      >
        Recruiters Click Here
      </button>

      <form onSubmit={handleSubmit} 
      className={`mt-2 ${showInput ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <label htmlFor="code" 
        className={`font-semibold mb-2 text-pink-500`}>
          Enter Code:
        </label>
        <input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          className="flex text-right focus:outline-none space-x-5 rounded mb-2 text-pink-500"
          placeholder="_ _ _ _ _ _"
        />
      </form>
  </div>
  );
}

export default Security;
