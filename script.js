
// Debug: Confirm script is loading
console.log("Script.js started!");

document.addEventListener('DOMContentLoaded', () => {
    // Debug: Confirm DOM is ready
    console.log("DOM fully loaded");
    
    // Initialize Chess.js
    const Chess = window.Chess;
    if (!Chess) {
        console.error("Chess.js not loaded!");
        return;
    }

    // Initialize chessboard
    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true
    });

    // Debug: Confirm chessboard exists
    console.log("Chessboard initialized:", board);

    // Load puzzles
    fetch('puzzles.json')
        .then(response => {
            console.log("Fetch status:", response.status);
            return response.json();
        })
        .then(puzzles => {
            console.log("Puzzles loaded:", puzzles);
            // Simple test: Load first puzzle
            const firstPuzzle = puzzles[0];
            const game = new Chess(firstPuzzle.fen);
            board.position(firstPuzzle.fen);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}); // <-- Properly closed DOMContentLoaded
