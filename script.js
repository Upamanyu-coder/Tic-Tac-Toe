const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Track moves for each player
const playerMoves = {
    X: [],
    O: []
};

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleClick);
        board.appendChild(cellElement);
    });
}

function handleClick(event) {
    const index = Number(event.target.dataset.index);
    if (gameBoard[index] !== "" || !gameActive) return;

    // Handle rolling removal if player already has 3 moves
    if (playerMoves[currentPlayer].length === 3) {
        const oldestMoveIndex = playerMoves[currentPlayer].shift(); // Remove oldest
        gameBoard[oldestMoveIndex] = ""; // Clear that cell
    }

    // Add new move
    gameBoard[index] = currentPlayer;
    playerMoves[currentPlayer].push(index);

    createBoard();
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.innerText = `${gameBoard[a]} Wins!`;
            highlightWin(pattern);
            gameActive = false;
            triggerConfetti();
            return;
        }
    }

    if (!gameBoard.includes("")) {
        message.innerText = "It's a Draw!";
        gameActive = false;
    }
}

function highlightWin(pattern) {
    pattern.forEach(index => {
        document.querySelector(`[data-index='${index}']`).classList.add("win");
    });
}

function triggerConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    message.innerText = "";
    playerMoves.X = [];
    playerMoves.O = [];
    createBoard();
}

createBoard();
