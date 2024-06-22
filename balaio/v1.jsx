// a versão que remove letras no fim

// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './App.css';

// function App() {
//   const [alfabeto, setAlfabeto] = useState([
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
//   ]);

//   const faceis = [
//     "objetos",
//     "comidas",
//     "Animais",
//     "filmes",
    
// ];

//   const dificeis = [
//       "celebridades",
//       "coisas de um casamento",
//       "objetos com botões",
      
//   ]

//   function sortearFacil(){
//     if(faceis.length > 0){
//       let n = Math.floor(Math.random()*faceis.length)
//       alert("Categoria selecionada: " + faceis[n])
//       faceis.splice(faceis.indexOf(faceis[n]),1)
//       console.log(n);
//       console.log(faceis.length);
//     }else{
//       alert("ACABARAM AS FÁCEIS")
//     }
//   }

//   function sortearDificil(){
//     if(dificeis.length > 0){
//       let n = Math.floor(Math.random()*dificeis.length)
//       alert("Categoria selecionada: " + dificeis[n])
//       dificeis.splice(dificeis.indexOf(dificeis[n]),1)
//       console.log(n);
//       console.log(dificeis.length);
//     }else{
//       alert("ACABARAM AS DIFÍCEIS")
//     }
//   }

//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentLetter, setCurrentLetter] = useState(null);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       const key = event.key.toUpperCase();
//       if (alfabeto.includes(key)) {
//         handleLetterClick(key);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [alfabeto, currentLetter, isRunning]);

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
//     oscillator.frequency.setValueAtTime(100, context.currentTime); // 100 Hz
//     gainNode.gain.setValueAtTime(1, context.currentTime);

//     oscillator.connect(gainNode);
//     gainNode.connect(context.destination);

//     oscillator.start();
//     setTimeout(() => {
//       oscillator.stop();
//     }, 100); // 100 ms
//   };

//   const handleLetterClick = (letter) => {
//     if (isRunning && currentLetter) {
//       setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== currentLetter));
//     }
//     startTimer(letter);
//   };

//   return (
//     <div style={{ textAlign: 'center' }} >
//       <div className="header">
//         <h1>Tranca Letras</h1>
//           <div>
//             {currentLetter && (
//                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//                   <h2 className='letra'>⏳ {timeLeft}s ⏳</h2>
//                   <h2 className='letra'>{currentLetter}</h2>
//                 </div>
//               )}
//           </div>
//           <div className='painelBotoes'>
//             <p>Sortear Categoria</p>
//             <div className="botoes">
//               <Button onClick={sortearFacil}>Fácil</Button>
//               <Button onClick={sortearDificil}>Difícil</Button>
//             </div>
//           </div>

//       </div>

//       <div>
//         {alfabeto.map((letter) => (
//           <Button
//             key={letter}
//             variant="contained"
//             onClick={() => handleLetterClick(letter)}
//             sx={{
//               width: '140px',
//               height: '140px',
//               margin: '5px',
//               fontSize: '80px',
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
// }

// export default App;