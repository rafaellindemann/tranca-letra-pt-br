import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const TimerButton = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      //playBeep(); // ***
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleClick = () => {
    setTimeLeft(2);
    setIsRunning(true);
  };

  const playBeep = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1000, context.currentTime); // 1000 Hz
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 100); // 100 ms
  };

  return (
    <Button
      variant={timeLeft > 0 ? 'outlined' : 'contained'}
      onClick={handleClick}
      sx={{
        width: '200px',
        height: '60px',
        backgroundColor: timeLeft === 0 && isRunning ? 'red' : undefined,
      }}
    >
      {timeLeft > 0 ? `${timeLeft}s` : 'Start Timer'}
    </Button>
  );
};

export default TimerButton;


// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';

// const TimerButton = () => {
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       setIsRunning(false);
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft]);

//   const handleClick = () => {
//     setTimeLeft(10);
//     setIsRunning(true);
//   };

//   return (
//     <Button
//       variant="contained"
//       onClick={handleClick}
//       style={{ backgroundColor: timeLeft === 0 && isRunning ? 'red' : undefined }}
//     >
//       {timeLeft > 0 ? `${timeLeft}s` : 'Start Timer'}
//     </Button>
//   );
// };

// export default TimerButton;
