document.addEventListener('DOMContentLoaded', () => {
    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDrop: handleMove
    });

    // DEBUG: Test if script loads
    console.log("Script loaded!");

    fetch('puzzles.json')
        .then(response => {
            console.log("HTTP status:", response.status); // Should be 200
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(puzzles => {
            console.log("Loaded puzzles:", puzzles);
            window.puzzles = puzzles;
            loadRandomPuzzle();
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById('status').textContent = "Error loading puzzles";
        });

    document.getElementById('nextBtn').addEventListener('click', loadRandomPuzzle);

    function handleMove(source, target) {
        // ... keep the original handleMove function code ... 
    }

    // ... keep other functions (loadRandomPuzzle, isPuzzleSolved, setStatus) ...
});
