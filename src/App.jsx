import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState();

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow == true) {
      str += "0123456789";
    }
    if (charallow == true) {
      str += "!@#$%^&*";
    }
    for (let i = 1; i <= length; i++) {
      let ind = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ind);
    }

    setPassword(pass);
  }, [length, numallow, charallow, setPassword]);

  const copyPassword = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password]);



  useEffect(()=>{
    passwordGenerator()
  },[length, numallow, charallow, passwordGenerator])
  return (
    <>
      <h1 className="text-4xl text-center">Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 bg-orange-500 text-xl">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 rounded-lg"
          placeholder="password"
          ref={passRef}
        />
        <button 
        onClick={copyPassword}
        className="bg-black text-white py-2 px-4 mt-2 text-sm hover:outline-none border-none">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
      
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numallow}
          id="numberInput"
          onChange={() => {
            setNumallow((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={charallow}
          id="charInput"
          onChange={() => {
            setCharallow((prev) => !prev);
          }}
        />
        <label htmlFor="charInput">Characters</label>
      </div>
      </div>
    </>
  );
}

export default App;
