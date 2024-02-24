import { useState, useEffect } from "react";
import Resident from "./Resident";
import { Button } from "@/components/ui/button";

function App() {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(
    `https://swapi.dev/api/planets/?page=${page}&format=json`
  );
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [results, setResults] = useState([]);
  const [buttons, setButtons] = useState(
    Array.from({ length: 0 }, (_, index) => index + 1)
  );

  useEffect(() => {
    setButtons(
      Array.from(
        { length: totalCount / results.length },
        (_, index) => index + 1
      )
    );
    console.log("buttons", buttons);
  }, [totalCount, results]);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data?.results);
        setTotalCount(data?.count);
        setNext(data?.next);
        setPrev(data?.previous);
        setIsLoading(false);
      });
  }, [url]);

  const handleNext = () => {
    setUrl(next);
    setPage((page) => page + 1);
  };

  const handlePrev = () => {
    setUrl(prev);
    setPage((page) => page - 1);
  };
  // min-h-screen min-w-screen p-3 text-white
  return (
    <div className="bg-[#202124]  min-h-screen min-w-screen p-3 text-white">
      <div className="flex items-center justify-center w-full p-8 text-center font-mono">
        <h3 className="text-[#fff] text-[50px] font-bold font-abc w-fit bg-[#202124]">
          SWAPI
        </h3>
      </div>

      <div className="w-full flex justify-center p-8 space-x-2 font-mono">
        <Button
          onClick={handlePrev}
          disabled={prev === null}
          className="bg-[#1f128392] text-white border border-[#7b7ba195] rounded-full hover:bg-[#4e41b592] focus:outline-none focus:shadow-outline"
        >
          prev
        </Button>
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={() => {
              setUrl(
                `https://swapi.dev/api/planets/?page=${button}&format=json`
              );
              setPage(button);
            }}
            className="bg-[#0708454e] text-white border border-[#7b7ba195] rounded-full hover:bg-[#4e41b592] focus:outline-none focus:shadow-outline"
          >
            {button}
          </Button>
        ))}
        <Button
          onClick={handleNext}
          disabled={next === null}
          className="bg-[#1f128392] text-white border border-[#7b7ba195] rounded-full hover:bg-[#4e41b592] focus:outline-none focus:shadow-outline"
        >
          next
        </Button>
      </div>

      <div className="flex items-center justify-center w-full p-8 text-center">
        <p className="text-[30px] text-[#fff] font-bold font-abc w-fit bg-[#202124]">Page: {page}</p>
      </div>

      <div className="text-lg text-center">
        <div>
          <ul className="flex flex-wrap gap-5 justify-center">
            {results.map((result) => (
              <li
                className="min-h-[500px] w-[500px] bg-[#0708454e] rounded-2xl  border-[2px] border-[#7b7ba195] text-[#fff] text-lg p-8 text-left font-mono"
                key={result.name}
              >
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold text-center mb-4 text-[#fff]">Planet {result.name}</h1>
                    <div>Climate: {result.climate}</div>
                    <div>Population: {result.population}</div>
                    <div>Orbital Period: {result.orbital_period}</div>
                    <div>Rotation Period: {result.rotation_period}</div>
                    <div>Diameter: {result.diameter}</div>
                    <div>Terrain: {result.terrain}</div>
                    <div>
                      {result.residents.map((resident) => (
                        <Resident residentUrl={resident} />
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './index.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className='bg-red-500'>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
