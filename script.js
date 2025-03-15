let currentGame = null;
let currentPuzzle = null;
let puzzles = [];
let board = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize chessboard
    board = ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'snapback',
        onDrop: handleMove,
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        position: 'start'
    });

    // Load puzzles
    fetch('puzzles.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load puzzles');
            return response.json();
        })
        .then(data => {
            puzzles = data;
            loadRandomPuzzle();
        })
        .catch(error => {
            console.error('Error:', error);
            setStatus('Failed to load puzzles', 'danger');
        });

    // Next puzzle button
    document.getElementById('nextBtn').addEventListener('click', loadRandomPuzzle);
});

function handleMove(source, target) {
    const move = currentGame.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    const isCorrect = currentPuzzle.correctMoves.includes(move.san);

    if (isCorrect) {
        if (isPuzzleSolved()) {
            setStatus('Puzzle Solved!', 'success');
            document.getElementById('nextBtn').disabled = false;
        } else {
            setStatus('Correct!', 'success');
        }
    } else {
        setStatus('Incorrect - try again!', 'danger');
        currentGame.undo();
        board.position(currentGame.fen());
    }

    return isCorrect ? true : 'snapback';
}

function loadRandomPuzzle() {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    currentPuzzle = puzzle;
    currentGame = new Chess(puzzle.fen);
    
    board.position(puzzle.fen);
    setStatus('Find the best move!', 'primary');
    document.getElementById('nextBtn').disabled = true;
}

function isPuzzleSolved() {
    return currentPuzzle.correctMoves.every(move => 
        currentGame.history().includes(move)
    );
}

function setStatus(message, type = 'primary') {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.className = `alert alert-${type}`;
      }
