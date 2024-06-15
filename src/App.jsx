import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [alfabeto, setAlfabeto] = useState([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (alfabeto.includes(key)) {
        startTimer(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [alfabeto]);

  const startTimer = (letter) => {
    setTimeLeft(25);
    setIsRunning(true);
    setCurrentLetter(letter);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(letter => letter !== currentLetter));
      setCurrentLetter(null);
      playBeep();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentLetter]);

  const playBeep = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, context.currentTime); // 100 Hz
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 100); // 100 ms
  };

  const handleLetterClick = (letter) => {
    if (isRunning && currentLetter) {
      setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== currentLetter));
    }
    startTimer(letter);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {currentLetter && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <h2 className='letra'>⏳ {timeLeft}s ⏳</h2>
          <h2 className='letra'>{currentLetter}</h2>
        </div>
      )}
      <div>
        {alfabeto.map((letter) => (
          <Button
            key={letter}
            variant="contained"
            onClick={() => handleLetterClick(letter)}
            sx={{
              width: '140px',
              height: '140px',
              margin: '5px',
              fontSize: '80px',
              backgroundColor: '#9d4edd',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e64a19',
                color: '#000'
              }
            }}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './App.css'

// function App(){
//   const [alfabeto, setAlfabeto] = useState([
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
//   ]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentLetter, setCurrentLetter] = useState(null);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       const key = event.key.toUpperCase();
//       if (alfabeto.includes(key)) {
//         startTimer(key);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [alfabeto]);

//   const startTimer = (letter) => {
//     setTimeLeft(25);
//     setIsRunning(true);
//     setCurrentLetter(letter);
//   };

//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       setIsRunning(false);
//       setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(letter => letter !== currentLetter));
//       setCurrentLetter(null);
//       playBeep();
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft, currentLetter]);

//   const playBeep = () => {
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = context.createOscillator();
//     const gainNode = context.createGain();

//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(100, context.currentTime); // 1000 Hz
//     gainNode.gain.setValueAtTime(1, context.currentTime);

//     oscillator.connect(gainNode);
//     gainNode.connect(context.destination);

//     oscillator.start();
//     setTimeout(() => {
//       oscillator.stop();
//     }, 150); // 100 ms
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//             {currentLetter && (
//         <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' }}>
//           <h2 className='letra'>⏳ {timeLeft}s ⏳</h2>
//           <h2 className='letra'>{currentLetter}</h2>
//         </div>
//       )}
//       <div>
//         {alfabeto.map((letter) => (
//           <Button
//             key={letter}
//             variant="contained"
//             onClick={() => startTimer(letter)}
//             sx={{
//               width: '140px',
//               height: '140px',
//               margin: '5px',
//               fontSize: '80px',
//               // backgroundColor: '#10002bff',
//               backgroundColor: '#9d4edd',
//               color: '#fff',
//               '&:hover': { 
//                 backgroundColor: '#e64a19',
//                 color: '#000'
//               }
//             }}
//           >
//             {letter}
//           </Button>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';

// const App = () => {
//   const [alfabeto, setAlfabeto] = useState([
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
//   ]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentLetter, setCurrentLetter] = useState(null);

//   const startTimer = (letter) => {
//     setTimeLeft(10);
//     setIsRunning(true);
//     setCurrentLetter(letter);
//   };

//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       setIsRunning(false);
//       setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(letter => letter !== currentLetter));
//       setCurrentLetter(null);
//       playBeep();
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft, currentLetter]);

//   const playBeep = () => {
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = context.createOscillator();
//     const gainNode = context.createGain();

//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(1000, context.currentTime); // 1000 Hz
//     gainNode.gain.setValueAtTime(1, context.currentTime);

//     oscillator.connect(gainNode);
//     gainNode.connect(context.destination);

//     oscillator.start();
//     setTimeout(() => {
//       oscillator.stop();
//     }, 100); // 100 ms
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div>
//         {alfabeto.map((letter) => (
//           <Button
//             key={letter}
//             variant="contained"
//             onClick={() => startTimer(letter)}
//             sx={{
//               width: '160px',
//               height: '160px',
//               margin: '5px',
//             }}
//           >
//             {letter}
//           </Button>
//         ))}
//       </div>
//       {currentLetter && (
//         <div style={{ marginTop: '20px' }}>
//           <h2>Letra: {currentLetter}</h2>
//           <h2>Tempo restante: {timeLeft}s</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




// import { useState } from 'react'

// import './App.css'
// import TimerButton from './components/TimerButton'

// function App() {
//   const [count, setCount] = useState(0)
//   const [alfabeto, setAlfabeto] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
//   // const alfabetoPTBR = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  

//   return (
//     <>

//       <TimerButton />
//     </>
//   )
// }

// export default App
