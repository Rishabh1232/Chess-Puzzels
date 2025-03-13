let currentGame = null;
let currentPuzzle = null;
let puzzles = [];
let board = null;

$(document).ready(function() {
    // Initialize chessboard with piece images
    board = Chessboard('board', {
        draggable: true,
        dropOffBoard: 'snapback',
        onDrop: handleMove,
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard.js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        position: 'start'
    });

    // Load puzzles and initialize first puzzle
    fetch('puzzles.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            puzzles = data;
            loadRandomPuzzle();
        })
        .catch(error => {
            console.error('Error loading puzzles:', error);
            setStatus('Failed to load puzzles', 'danger');
        });

    // Next puzzle button handler
    $('#nextBtn').on('click', loadRandomPuzzle);
});

// ... keep rest of the script.js functions the same ...
