document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded!"); // Debug: Confirm script is running

    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDrop: handleMove
    });

    console.log("Chessboard initialized!"); // Debug: Confirm chessboard is ready

    fetch('puzzles.json')
        .then(response => {
            console.log("Fetch response status:", response.status); // Debug: Check HTTP status
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(puzzles => {
            console.log("Puzzles loaded successfully:", puzzles); // Debug: Confirm JSON data
            window.puzzles = puzzles;
            loadRandomPuzzle();
        })
        .catch(error => {
            console.error("Fetch error:", error); // Debug: Log the exact error
            document.getElementById('status').textContent = "Error loading puzzles: " + error.message;
        });

    document.getElementById('nextBtn').addEventListener('click', loadRandomPuzzle);

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
});
