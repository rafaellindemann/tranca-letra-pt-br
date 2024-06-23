import React, { useState, useEffect } from 'react';
import './App.css';

const faceis = [
  "objetos",
  "comidas",
  "Animais",
  "filmes",
  "personagens",
  "cantor/cantora/banda",
  "frutas",
  "objetos escolares",
  "comidas de café da manhã",
  "coisas azuis",
  "coisas redondas",
  "adjetivos",
  "filmes da disney",
  "monstros e criaturas míticas",
  "nomes de bichos de estimação",
  "neste recinto",
  "profissões e ocupações",
  "vestuário",
  "partes do corpo humano",
  "nomes femininos",
  "nomes masculinos",
  "países, cidades e estados",
  "jogos",
  "coisas vermelhas",
  "comidas de padaria",
  "coisas de jardim",
  "objetos de banheiro",
  "sobremesas",
  "heróis/heroínas",
  "coisas macias",
  "eletrônicos",
  "brinquedos",
  "vegetais",
  "coisas para usar na cabeça",
  "objetos de quarto",
  "material de escritório",
  "cores",
  "desenhos animados",
  "seriados",
  "insetos",
  "coisas do museu",
  "ervas e temperos",
  "hábitos ruins",
  "na floresta",
  "sabores de sorvete",
  "no oceano",
  "bebidas",
  "produtos de limpeza",
  "comida porcaria (junkie food)",
  "coisas assustadoras",
  "cosméticos",
];

const dificeis = [
    "celebridades",
    "coisas de um casamento",
    "objetos com botões",
    "equipamentos esportivos",
    "reptéis e anfíbios",
    "metais preciosos e gemas",
    "palavras com cinco letras",
    "esportes olímpicos",
    "ator/atriz",
    "coisas úmidas/molhadas",
    "livros",
    "instrumentos musicais",
    "armas",
    "hobbies",
    "flores e plantas",
    "carros",
    "partes do carro",
    "figuras históricas",
    "políticos",
    "objetos de consultório médico",
    "coisas circenses",
    "coisas grudentas",
    "sabores de pizza",
    "tipos de queijo",
    "motivos para uma comemoração/festa",
    "termos de computação",
    "carnes",
    "Áreas da ciência",
]

function App() {
  const [alfabeto, setAlfabeto] = useState([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]);

  function mostrarRegras() {
    alert(`Dê uma resposta para a categoria sorteada utilizando as letras disponíveis na tela.
      O último jogador restante ganha a rodada.  
Seja criativo nas respostas para evitar ficar sem opções e tente sempre ter uma resposta preparada para sua próxima vez. Pressione a letra correspondente à primeira letra da sua resposta (exemplo: se sua resposta for "Tênis", aperte a letra "T").\nAs letras já pressionadas são excluídas, aumentando a dificuldade do jogo a cada resposta. Jogadores são eliminados da rodada se:
* Não responderem dentro dos 25 segundos do cronômetro;
* Derem uma resposta que não se enquadre na categoria e/ou seja considerada errada (decidido pelos outros jogadores);
* Pressionarem uma letra incorreta.
Quando um jogador é eliminado, o próximo jogador ecolhe uma letra e a rodada continua até restar apenas um jogador, que ganha a carta da rodada. 
Continue jogando até que um jogador ganhe 3 rodadas primeiro.\nAs letras podem ser pressionadas no teclado ou clicadas na tela. Boa sorte!`);
  }


  function sortearFacil() {
    if (faceis.length > 0) {
      let n = Math.floor(Math.random() * faceis.length);
      setCategoria(faceis[n].toUpperCase());
      faceis.splice(n, 1);
      setTamanhoFaceis(faceis.length);
    } else {
      alert("ACABARAM AS FÁCEIS");
    }
  }

  function sortearDificil() {
    if (dificeis.length > 0) {
      let n = Math.floor(Math.random() * dificeis.length);
      setCategoria(dificeis[n].toUpperCase());
      dificeis.splice(n, 1);
      setTamanhoDificeis(dificeis.length);
    } else {
      alert("ACABARAM AS DIFÍCEIS");
    }
  }

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [tamanhoFaceis, setTamanhoFaceis] = useState(faceis.length);
  const [tamanhoDificeis, setTamanhoDificeis] = useState(dificeis.length);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (alfabeto.includes(key)) {
        handleLetterClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [alfabeto, currentLetter, isRunning]);

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
      setCurrentLetter(null);
      playBeep();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const playBeep = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, context.currentTime);
    gainNode.gain.setValueAtTime(1, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 50);
  };

  const handleLetterClick = (letter) => {
    if (isRunning && currentLetter) {
      setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== currentLetter));
    }
    setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== letter));
    startTimer(letter);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="header">
        <div className='painelBotoes'>
          <p>Sugerir Categoria</p>
          <div className='botoes'>
            <button onClick={sortearFacil} >Fácil ({tamanhoFaceis})</button>
            <button onClick={sortearDificil} >Difícil ({tamanhoDificeis})</button>
          </div>
          <div>
            {/* {categoria && <p>..:: {categoria} ::..</p>} */}
            {categoria && <p> #{categoria}</p>}
          </div>
        </div>
        {/* <h1 className='terco'><img src="/tranca-letras2.png" alt="Tranca Letras" /></h1> */}
        <h1 className='terco'>TRANCA LETRAS</h1>

        <div>
          {true && (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* <h2 className='letra'>⏳{timeLeft}s⏳</h2> */}
              <h2 className='letra'>
                {timeLeft}s
                <img src="/game-icons--extra-time.svg" alt="" className='ampuletas'/>
                {/* <img src="/game-icons--solar-time.svg" alt="" className='ampuletas'/> */}
                </h2>
              <h2 className='letra currentLetter'>{currentLetter} </h2>
            </div>
          )}
        </div>
      </div>


      <div className='divLetras'>
        {alfabeto.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="button letter-button"
          >
            {letter}
          </button>
        ))}
      </div>
      <footer>
        <button onClick={mostrarRegras}>❔❔Como jogar❔❔</button>
      </footer>
    </div>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import './App.css';

// const faceis = [
//   "objetos",
//   "cosméticos",
// ];

// const dificeis = [
//   "celebridades",
//   "coisas de um casamento",
//   "objetos com botões",
//   "Áreas da ciência",
// ];

// function App() {
//   const [alfabeto, setAlfabeto] = useState([
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
//   ]);

//   function sortearFacil() {
//     if (faceis.length > 0) {
//       let n = Math.floor(Math.random() * faceis.length);
//       setCategoria(faceis[n].toUpperCase());
//       faceis.splice(n, 1);
//       setTamanhoFaceis(faceis.length);
//     } else {
//       alert("ACABARAM AS FÁCEIS");
//     }
//   }

//   function sortearDificil() {
//     if (dificeis.length > 0) {
//       let n = Math.floor(Math.random() * dificeis.length);
//       setCategoria(dificeis[n].toUpperCase());
//       dificeis.splice(n, 1);
//       setTamanhoDificeis(dificeis.length);
//     } else {
//       alert("ACABARAM AS DIFÍCEIS");
//     }
//   }

//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentLetter, setCurrentLetter] = useState(null);
//   const [tamanhoFaceis, setTamanhoFaceis] = useState(faceis.length);
//   const [tamanhoDificeis, setTamanhoDificeis] = useState(dificeis.length);
//   const [categoria, setCategoria] = useState('');

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
//       setCurrentLetter(null);
//       playBeep();
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft]);

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
//     }, 50); // 50 ms
//   };

//   const handleLetterClick = (letter) => {
//     if (isRunning && currentLetter) {
//       setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== currentLetter));
//     }
//     setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== letter));
//     startTimer(letter);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div className="header">
//         <div className='terco'>
//           {true && (
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//               <h2 className='letra'>⏳{timeLeft}s⏳</h2>
//               <h2 className='letra'>{currentLetter} </h2>
//             </div>
//           )}
//         </div>
//         <h1 className='terco'><img src="/tranca-letras2.png" alt="" /></h1>
//         <div className='painelBotoes terco'>
//           <p>Sortear Categoria</p>
//           <div className="botoes">
//             <button onClick={sortearFacil}>Fácil ({tamanhoFaceis})</button>
//             <button onClick={sortearDificil}>Difícil ({tamanhoDificeis})</button>
//           </div>
//           <div>
//             {categoria && <p>.: {categoria} :.</p>}
//           </div>
//         </div>
//       </div>
//       <div>
//         {alfabeto.map((letter) => (
//           <button
//             key={letter}
//             className="button"
//             onClick={() => handleLetterClick(letter)}
//           >
//             <div className='letraNoBotao'>
//               <label>
//                 {letter}

//               </label>

//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './App.css';

// const faceis = [
//   "objetos",
//   "cosméticos",
// ];

// const dificeis = [
//     "celebridades",
//     "coisas de um casamento",
//     "objetos com botões",
//     "Áreas da ciência",
// ]

// function App() {



//   const [alfabeto, setAlfabeto] = useState([
//     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
//   ]);



//   function sortearFacil() {
//     if (faceis.length > 0) {
//       let n = Math.floor(Math.random() * faceis.length);
//       // alert("Categoria selecionada: " + faceis[n].toUpperCase());
//       setCategoria(faceis[n].toUpperCase());
//       faceis.splice(n, 1);
//       console.log(n);
//       console.log(faceis.length);
//       console.log(faceis);
//       setTamanhoFaceis(faceis.length);
//     } else {
//       alert("ACABARAM AS FÁCEIS");
//     }
//   }

//   function sortearDificil() {
//     if (dificeis.length > 0) {
//       let n = Math.floor(Math.random() * dificeis.length);
//       // alert("Categoria selecionada: " + dificeis[n].toUpperCase());
//       setCategoria(dificeis[n].toUpperCase());
//       dificeis.splice(n, 1);
//       console.log(n);
//       console.log(dificeis.length);
//       setTamanhoDificeis(dificeis.length);
//     } else {
//       alert("ACABARAM AS DIFÍCEIS");
//     }
//   }

//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentLetter, setCurrentLetter] = useState(null);
//   const [tamanhoFaceis, setTamanhoFaceis] = useState(faceis.length);
//   const [tamanhoDificeis, setTamanhoDificeis] = useState(dificeis.length);
//   const [categoria, setCategoria] = useState('');

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
//       setCurrentLetter(null);
//       playBeep();
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, timeLeft]);

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
//     }, 50); // 100 ms
//   };

//   const handleLetterClick = (letter) => {
//     if (isRunning && currentLetter) {
//       setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== currentLetter));
//     }
//     setAlfabeto((prevAlfabeto) => prevAlfabeto.filter(l => l !== letter));
//     startTimer(letter);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div className="header">
//         <div className='terco'>
//           {/* {currentLetter && ( */}
//           { true && (
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//               <h2 className='letra'>⏳{timeLeft}s⏳</h2>
//               <h2 className='letra'>{currentLetter} </h2>
//             </div>
//           )}
//         </div>
//         {/* <h1>Tranca Letras</h1> */}
//         <h1  className='terco'><img src="/tranca-letras2.png" alt="" /></h1>
//         <div className='painelBotoes terco'>
//           <p>Sortear Categoria</p>
//           <div className="botoes">
//             <Button onClick={sortearFacil}>Fácil ({tamanhoFaceis})</Button>
//             <Button onClick={sortearDificil}>Difícil ({tamanhoDificeis})</Button>
//           </div>
//           <div>
//             {categoria && <p>.: {categoria} :.</p>}
//           </div>
//         </div>
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
//                className: 'button',
//               '&:hover': {
//                 backgroundColor: '#3c096c',
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
