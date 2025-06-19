import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheack) => {
    // Recorremos las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheack[a] &&
            boardToCheack[a] === boardToCheack[b] &&
            boardToCheack[a] === boardToCheack[c]
        ) {
            return boardToCheack[a]
        }
    }
    // Si ya hay un ganador, no hacer nada
    return null
}
export const checkEndGame = (newBoard) => {
    // Si no hay más casillas vacías, el juego ha terminado
    return newBoard.every((square) => square !== null)
}
