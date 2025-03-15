document.addEventListener('DOMContentLoaded', () => {
    // Initialize chessboard
    const board = ChessBoard('board', {
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png',
        draggable: true
    });

    // Load puzzles
    fetch('puzzles.json')
        .then(response => {
            console.log('HTTP Status:', response.status); // Should log "200"
            return response.json();
        })
        .then(puzzles => {
            console.log('Puzzles:', puzzles); // Verify JSON data
            alert('Puzzles loaded successfully!'); // Temporary success alert
        })
        .catch(error => {
            console.error('Error:', error);
            alert('FAILED to load puzzles. Check console!');
        });
});
