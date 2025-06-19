import { useState } from "react";
import confetti from 'canvas-confetti'

import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./storage/index.js";

// Componente principal de la aplicación
function App() {
  const [board, setBoard] = useState(() => {
    // Recuperar el tablero del localStorage si existe,
    //window.localStorage.getItem('board') devuelve un string
    const boardFromStorage = window.localStorage.getItem('board')
    // si no existe, inicializarlo 
    // con un array de 9 elementos nulos
    // (representando un tablero vacío)
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  // Estado para el turno actual, 
  // por defecto es X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    //?? // Si no hay turno guardado en localStorage,
    // devolver el turno por defecto (X)
    // Si hay turno guardado, devolverlo
    return turnFromStorage ?? TURNS.X

  })
  //null no hay ganador, false es empate, true hay ganador
  const [winner, setWinner] = useState(null)


  // Función para reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  // Función para actualizar el tablero
  const updateBoard = (index) => {
    // Si la casilla ya tiene un valor, no hacer nada  
    if (board[index] || winner) return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar aqui partida en localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn })
    // Comprobar si hay un ganador
    // Si hay un ganador, actualizar el estado del ganador
    // Si no hay ganador, seguir jugando
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      // Si hay un ganador, actualizar el estado del ganador
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      // Si no hay ganador y el juego ha terminado, es un empate
      setWinner(false)
    }
  }

  // Renderizar el componente principal
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )

          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App