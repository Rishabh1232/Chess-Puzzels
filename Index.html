<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Puzzles</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f0f0f0;
        }

        #board {
            width: 80%;
            max-width: 600px;
            margin: 20px auto;
        }

        .controls {
            text-align: center;
            margin: 20px 0;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin: 0 10px;
        }

        button:hover {
            background-color: #45a049;
        }

        #status {
            text-align: center;
            font-size: 1.2em;
            margin: 20px 0;
            min-height: 24px;
        }

        @media (max-width: 600px) {
            #board {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div id="board"></div>
    <div id="status"></div>
    <div class="controls">
        <button id="nextPuzzle">Next Puzzle</button>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.13.4/chess.min.js"></script>

    <script>
        let currentPuzzle = null;
        let expectedMoves = [];
        let moveIndex = 0;
        let game = null;
        let board = null;

        // Fetch puzzles from JSON file
        async function loadPuzzles() {
            const response = await fetch('puzzles.json');
            return await response.json();
        }

        function initializeBoard() {
            board = Chessboard('board', {
                draggable: true,
                position: 'start',
                onDrop: handleMove,
                pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png'
            });
        }

        function newGame(puzzle) {
            game = new Chess(puzzle.fen);
            expectedMoves = puzzle.solution;
            moveIndex = 0;
            board.position(game.fen());
            document.getElementById('status').textContent = 'Find the best move!';
        }

        function handleMove(source, target) {
            const move = game.move({
                from: source,
                to: target,
                promotion: 'q'
            });

            if (move === null) return 'snapback';

            if (move.san === expectedMoves[moveIndex]) {
                moveIndex++;
                if (moveIndex === expectedMoves.length) {
                    document.getElementById('status').textContent = 'Puzzle solved! 🎉';
                    board.draggable = false;
                } else {
                    document.getElementById('status').textContent = 'Correct! Keep going...';
                }
            } else {
                document.getElementById('status').textContent = 'Incorrect. Try again!';
                game.undo();
                board.position(game.fen());
            }
        }

        async function loadNewPuzzle() {
            const puzzles = await loadPuzzles();
            currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
            newGame(currentPuzzle);
            board.draggable = true;
        }

        document.getElementById('nextPuzzle').addEventListener('click', loadNewPuzzle);

        // Initialize
        initializeBoard();
        loadNewPuzzle();
    </script>
</body>
</html>
