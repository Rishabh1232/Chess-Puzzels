// Debug: Confirm script is loading
console.log("Script.js started!");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    // Game state variables
    let currentGame = null;
    let currentPuzzle = null;

    // Initialize Chess.js
    const Chess = window.Chess;
    if (!Chess) {
        console.error("Chess.js not loaded!");
        return;
    }

    // Initialize chessboard
    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDrop: (source, target) => {
            const move = currentGame.move({
                from: source,
                to: target,
                promotion: 'q'
            });
            if (!move) return 'snapback';
            console.log("Move made:", move.san);
        }
    });

    console.log("Chessboard initialized:", board);

    // Load puzzles
    fetch('puzzles.json')
        .then(response => {
            console.log("Fetch status:", response.status);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(puzzles => {
            console.log("Puzzles loaded:", puzzles);
            if (!puzzles.length) throw new Error("No puzzles found");
            
            // Load first puzzle
            currentPuzzle = puzzles[0];
            currentGame = new Chess(currentPuzzle.fen);
            
            // Validate FEN before positioning
            if (!currentGame.validateFen(currentGame.fen()).valid) {
                throw new Error("Invalid FEN in puzzle");
            }
            
            board.position(currentGame.fen());
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('status').textContent = error.message;
        });
});
