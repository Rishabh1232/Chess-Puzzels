document.addEventListener('DOMContentLoaded', () => {
    // Initialize chess.js FIRST
    window.Chess = Chess; // Explicitly expose Chess to global scope
    
    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true
    });

    // Load puzzles
    fetch('puzzles.json')
        .then(response => {
            if (!response.ok) throw new Error('HTTP error');
            return response.json();
        })
        .then(puzzles => {
            console.log('Puzzles loaded:', puzzles);
            window.puzzles = puzzles;
            loadRandomPuzzle();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = "Error loading puzzles";
        });

    document.getElementById('nextBtn').addEventListener('click', loadRandomPuzzle);

    // Initialize chess.js game instance
    let currentGame = null;
    let currentPuzzle = null;

    function loadRandomPuzzle() {
        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        currentPuzzle = puzzle;
        currentGame = new Chess(puzzle.fen); // Now Chess is defined
        board.position(puzzle.fen);
    }
});
