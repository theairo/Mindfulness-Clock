'use client'

import { useEffect, useState } from "react"
export default function Home() {
    const [seconds, setSeconds] = useState(1800)
    const [stop, setStop] = useState(false)
    const [flaw, setFlaw] = useState(0)
    const [settings, setSettings] =useState(true);

    const [inputValue1, setInputValue1] = useState(0);
    const [inputValue2, setInputValue2] = useState(0);
    const [inputValue3, setInputValue3] = useState(0);
    const [inputValue4, setInputValue4] = useState(0);
    
    useEffect(() => {
        if (seconds <= 0 || stop) {
          return;
        }
        let interval ;
        if (flaw>0) {
            interval = setInterval(() => {
                setFlaw(current => {
                  if (current <= 1) {
                    clearInterval(interval); // Clear the interval when seconds reach 0
                    return 0; // Set seconds to 0
                  } else {
                    return current - 1; // Decrement seconds by 1
                  }
                });
              }, 1000);
        }
        else {
            interval = setInterval(() => {
                setSeconds(current => {
                  if (current <= 1) {
                    clearInterval(interval); // Clear the interval when seconds reach 0
                    return 0; // Set seconds to 0
                  } else {
                    return current - 1; // Decrement seconds by 1
                  }
                });
              }, 1000);
        }
        
      
        return () => clearInterval(interval);
      }, [seconds, stop, flaw]);

    function restart() {
        setSettings(true)
        setFlaw(0)
        setStop(false)
    }

    function newCycle() {
        if (inputValue1==='' || inputValue2==='' || inputValue3==='' || inputValue4==='') {
            return;
        }
        setSettings(false)
        setSeconds(parseInt(inputValue1) * 600 +
        parseInt(inputValue2) * 60 +
        parseInt(inputValue3) * 10 +
        parseInt(inputValue4))
    }

    function handleInput1(e) {
        if (e.target.value!=='') {
            setInputValue1(Math.max(Math.min(5,e.target.value),0))
        }
        else {
            setInputValue1(e.target.value);
        }
    }
    function handleInput2(e) {
        if (e.target.value!=='') {
            setInputValue2(Math.max(Math.min(9,e.target.value),0))
        }
        else {
            setInputValue2(e.target.value);
        }
    }
    function handleInput3(e) {
        if (e.target.value!=='') {
            setInputValue3(Math.max(Math.min(5,e.target.value),0))
        }
        else {
            setInputValue3(e.target.value);
        }
    }
    function handleInput4(e) {
        if (e.target.value!=='') {
            setInputValue4(Math.max(Math.min(9,e.target.value),0))
        }
        else {
            setInputValue4(e.target.value);
        }
    }

    return (
        <div className='flex items-center flex-col'>
            <div className='font-medium text-4xl mt-16 mb-10'>Mindfulness Clock</div>
            <div className={`font-medium text-8xl mb-6 ${settings && 'hidden'} ${!stop && !flaw ? 'text-black' : 'text-gray-600'}`}>{Math.floor(seconds/60)%60<10 ? `0${Math.floor(seconds/60) % 60}` : Math.floor(seconds/60)%60}:{seconds%60<10 ? `0${seconds % 60}` : seconds%60}</div>
            <div className={`flex items-center font-medium text-8xl mb-6  ${!settings && 'hidden'}`}>
                <input onFocus={() => setInputValue1('')} type="number" onInput={(e) => handleInput1(e)} value={inputValue1} className="appearance-none w-20 border-2 mr-2 rounded-xl"/>
                <input onFocus={() => setInputValue2('')} type="number" onInput={(e) => handleInput2(e)} value={inputValue2} className="w-20 border-2 mr-4 rounded-xl"/>
                : 
                <input onFocus={() => setInputValue3('')} type="number" onInput={(e) => handleInput3(e)} value={inputValue3} className="w-20 border-2 ml-4 mr-2 rounded-xl"/>
                <input onFocus={() => setInputValue4('')} type="number" onInput={(e) => handleInput4(e)} value={inputValue4} className="w-20 border-2 mr-2 rounded-xl"/>
            </div>
            <button onClick={newCycle}className={`text-lg font-medium  w-24 h-24 rounded-full bg-lime-500 cursor-pointer hover:bg-lime-600 active:bg-lime-700 ${!settings && 'hidden'}`}>Confirm</button>
            <div className={`font-medium text-xl mb-16 text-gray-600  ${!stop && 'opacity-0'}`}>The clock is stopped</div>
            <div className='flex items-end text-lg font-medium'>
                <div className="flex flex-col">
                <div className={`text-center mb-1 ${!flaw && 'opacity-0'}`}>00:{flaw%60<10 ? `0${flaw % 60}` : flaw%60}</div>
                    <button onClick={() => setFlaw(current => 30)}className={`w-24 h-24 rounded-full bg-red-500  cursor-pointer hover:bg-red-600 active:bg-red-700 ${settings && 'opacity-0'}`}>Flaw</button>
                </div>
                <button onClick={() => setStop(current => !current)}className={`ml-8 w-24 h-24 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 active:bg-blue-700 ${settings && 'opacity-0'}`}>Stop</button>
            </div>
            <div className="flex justify-center">
                <button onClick={restart}className={`text-lg font-medium  w-24 h-24 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 active:bg-green-700 ${!stop && 'opacity-0'}`}>Restart</button>
            </div>
            
            
        </div>
    )
}
