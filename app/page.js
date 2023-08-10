'use client'

import { useEffect, useState } from "react"



export default function Home() {
    const [seconds, setSeconds] = useState(1800)
    const [stop, setStop] = useState(false)
    const [flaw, setFlaw] = useState(0)
    const [settings, setSettings] =useState(true);
    const [history, setHistory] = useState(false);
    const [timer, setTimer] = useState(false);

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

      useEffect(() => {
        if (seconds%60===0) {
            setData(current => {
                const currentD = new Date();
    
                const day = currentD.getDate().toString().padStart(2, '0');
                const month = (currentD.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
                const year = currentD.getFullYear();
    
                const currentDate = `${day}/${month}/${year}`;
    
                // Check if the current date's entry exists in the array
                const existingIndex = current.findIndex(item => item.date === currentDate);
    
                if (existingIndex !== -1) {
                    // Update the existing data
                    const updatedData = {
                        ...current[existingIndex],
                        time: current[existingIndex].time + 1
                    };
    
                    // Create a new array with the updated data
                    const updatedArray = [
                        ...current.slice(0, existingIndex),
                        updatedData,
                        ...current.slice(existingIndex + 1)
                    ];
    
                    return updatedArray;
                } else {
                    // Create a new data object
                    const newData = {
                        date: currentDate,
                        time: 1,
                        flaws: 0
                    };
    
                    // Add the new data object to the array
                    return [...current, newData];
                }
                    });
        }
      }, [seconds])

    function restart() {
        setSettings(true)
        setFlaw(0)
        setStop(false)
        setHistory(false)
        setTimer(false);
    }

    function newCycle() {
        if (inputValue1==='' || inputValue2==='' || inputValue3==='' || inputValue4==='') {
            return;
        }
        setSettings(false)
        setTimer(true);
        setSeconds(parseInt(inputValue1) * 600 +
        parseInt(inputValue2) * 60 +
        parseInt(inputValue3) * 10 +
        parseInt(inputValue4))
        setData(current => {
            const currentD = new Date();

            const day = currentD.getDate().toString().padStart(2, '0');
            const month = (currentD.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
            const year = currentD.getFullYear();

            const currentDate = `${day}/${month}/${year}`;

            // Check if the current date's entry exists in the array
            const existingIndex = current.findIndex(item => item.date === currentDate);

            if (existingIndex !== -1) {
                // Update the existing data
                const updatedData = {
                    ...current[existingIndex],
                    time: current[existingIndex].time - 1
                };

                // Create a new array with the updated data
                const updatedArray = [
                    ...current.slice(0, existingIndex),
                    updatedData,
                    ...current.slice(existingIndex + 1)
                ];

                return updatedArray;
            } else {
                // Create a new data object
                const newData = {
                    date: currentDate,
                    time: 0,
                    flaws: 1
                };

                // Add the new data object to the array
                return [...current, newData];
            }
                });
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

    function openHistory() {
        setHistory(true);
        setSettings(false);
    }

    const [data, setData] = useState([])

    function closeHistory() {
        setHistory(false);
        setSettings(true);
    }

    useEffect(() => {
        const storedArray = localStorage.getItem('data');
        if (storedArray) {
          setData(JSON.parse(storedArray));
        }
      }, []);


    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
      }, [data]);

    
    function flowFunction() {
        setFlaw(current => 30)
        setData(current => {
            const currentD = new Date();

            const day = currentD.getDate().toString().padStart(2, '0');
            const month = (currentD.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
            const year = currentD.getFullYear();

            const currentDate = `${day}/${month}/${year}`;

            // Check if the current date's entry exists in the array
            const existingIndex = current.findIndex(item => item.date === currentDate);

            if (existingIndex !== -1) {
                // Update the existing data
                const updatedData = {
                    ...current[existingIndex],
                    flaws: current[existingIndex].flaws + 1
                };

                // Create a new array with the updated data
                const updatedArray = [
                    ...current.slice(0, existingIndex),
                    updatedData,
                    ...current.slice(existingIndex + 1)
                ];

                return updatedArray;
            } else {
                // Create a new data object
                const newData = {
                    date: currentDate,
                    time: 0,
                    flaws: 1
                };

                // Add the new data object to the array
                return [...current, newData];
            }
                });
    }


    return (
        <div className='flex items-center flex-col'>


            <div className='font-medium text-4xl mt-16'>Mindfulness Clock</div>
            <div className={`mt-10 font-medium text-8xl mb-6 ${!timer && 'hidden'} ${!stop && !flaw ? 'text-black' : 'text-gray-600'}`}>{Math.floor(seconds/60)%60<10 ? `0${Math.floor(seconds/60) % 60}` : Math.floor(seconds/60)%60}:{seconds%60<10 ? `0${seconds % 60}` : seconds%60}</div>
            <div className={`mt-10 flex items-center font-medium text-8xl mb-6  ${!settings && 'hidden'}`}>
                <input onFocus={() => setInputValue1('')} type="number" onInput={(e) => handleInput1(e)} value={inputValue1} className="appearance-none w-20 border-2 mr-2 rounded-xl"/>
                <input onFocus={() => setInputValue2('')} type="number" onInput={(e) => handleInput2(e)} value={inputValue2} className="w-20 border-2 mr-4 rounded-xl"/>
                : 
                <input onFocus={() => setInputValue3('')} type="number" onInput={(e) => handleInput3(e)} value={inputValue3} className="w-20 border-2 ml-4 mr-2 rounded-xl"/>
                <input onFocus={() => setInputValue4('')} type="number" onInput={(e) => handleInput4(e)} value={inputValue4} className="w-20 border-2 mr-2 rounded-xl"/>
            </div>
            <div className="flex">
                <button onClick={newCycle}className={`text-lg font-medium  w-24 h-24 rounded-full bg-lime-500 cursor-pointer hover:bg-lime-600 active:bg-lime-700 mr-8 ${!settings && 'hidden'}`}>Confirm</button>
                <button onClick={openHistory}className={`text-lg font-medium  w-24 h-24 rounded-full bg-purple-500 cursor-pointer hover:bg-purple-600 active:bg-purple-700 ${!settings && 'hidden'}`}>History</button>
            </div>
            {
                (history && 
                    <div>
                        <div className={`font-medium text-3xl mt-6 mb-6 text-gray-700 text-center`}>History</div>
                        <div className="flex justify-center mb-6">
                        <button onClick={closeHistory}className={`text-lg font-medium  w-24 h-24 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 active:bg-yellow-700 ${!history && 'hidden'}`}>Return</button>
                        </div>
                        
                        {
                            data.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div className="flex text-lg font-medium">
                                            <div className="mx-2"><span className="font-bold">Date:</span> {item.date}</div>
                                            <div className="mx-2"><span className="font-bold">Time:</span> {item.time}</div>
                                            <div className="mx-2"><span className="font-bold">Flaws:</span> {item.flaws}</div>
                                            <div className="mx-2"><span className="font-bold">Score:</span> {item.time/(item.flaws+1)}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                )
            }
            
            <div className={`font-medium text-xl mb-16 text-gray-600  ${!stop && 'opacity-0'}`}>The clock is stopped</div>
            <div className='flex items-end text-lg font-medium'>
                <div className="flex flex-col">
                <div className={`text-center mb-1 ${!flaw && 'opacity-0'}`}>00:{flaw%60<10 ? `0${flaw % 60}` : flaw%60}</div>
                    <button onClick={flowFunction}className={`w-24 h-24 rounded-full bg-red-500  cursor-pointer hover:bg-red-600 active:bg-red-700 ${!timer && 'opacity-0'}`}>Flaw</button>
                </div>
                <button onClick={() => setStop(current => !current)}className={`ml-8 w-24 h-24 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 active:bg-blue-700 ${!timer && 'opacity-0'}`}>Stop</button>
            </div>
            <button onClick={restart}className={`text-lg font-medium  w-24 h-24 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 active:bg-green-700 ${!stop && 'opacity-0'}`}>Restart</button>
            
            
        </div>
    )
}
