document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 === '' || player2 === '') {
        alert('Please enter names for both players');
        return;
    }

    const gameSection = document.querySelector('.game-section');
    gameSection.style.display = 'block';
    document.querySelector('.input-section').style.display = 'none';

    let currentPlayer = player1;
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    message.textContent = `${currentPlayer}, you're up!`;

    let board = Array(9).fill(null);
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (!gameActive || this.textContent !== '') return;

            const cellIndex = parseInt(this.id) - 1;
            board[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
            this.textContent = board[cellIndex];

            if (checkWinner()) {
                message.textContent = `${currentPlayer} congratulations you won!`;
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            message.textContent = `${currentPlayer}, you're up!`;
        });
    });

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }
});
