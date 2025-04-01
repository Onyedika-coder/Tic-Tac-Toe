const Gameboard = (function () {
    let gameboard = Array(9).fill('');
    let playerTurn = true;
    const displayScoreX = document.getElementById('Xscore');
    const displayScoreO = document.getElementById('Oscore');
    const gridButtons = document.querySelectorAll('.grid-item');
    const reset = document.getElementById('reset');
    const setGame = document.getElementById('setGame');
    const overlay = document.getElementById('overlay');
    const play = document.getElementById('play');
    const nameA = document.getElementById('Xname');
    const nameB = document.getElementById('Oname');
    const newgame = document.getElementById('restart');
    const checkWins = document.getElementById('endgame');
    const playerA = document.getElementById('playerA');
    const playerB = document.getElementById('playerB');
    const gridSound = document.getElementById('gridSound');
    const buttonSound = document.getElementById('buttonSound');
    const winSound = document.getElementById('winSound');
    let zero = 0;

    function player(name, marker, borderColor, score) {
        return {
            name,
            marker,
            borderColor,
            score,

            playerMove(button) {
                if (!button.clicked && button.textContent === '') {
                    button.textContent = this.marker;
                    button.style.borderColor = this.borderColor;
                    button.clicked = true;
                    const position = button.dataset.target;
                    gameboard[position] = this.marker;
                }
            },

            updateScore() {
                const winningCombo = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];

                for (let combo of winningCombo) {
                    const [a, b, c] = combo;

                    if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                        alert(`${this.name} Wins`);
                        this.score++;
                        const scoreElement = document.getElementById(this.marker === 'X' ? 'Xscore' : 'Oscore');
                        scoreElement.textContent = `${this.score}`;
                        winSound.currentTime = 0; // Reset sound to start
                        winSound.play();
                        return;
                    }
                }
            }
        };
    }

    const playerX = player(nameA.innerText, 'X', 'green', zero);
    const playerO = player(nameB.innerText, 'O', 'blue', zero);

    play.addEventListener('click', () => {
        
        if (playerA.value && playerB.value) {
            nameA.innerText = playerA.value;
            nameB.innerText = playerB.value;
            setGame.classList.add('deactive');
            overlay.classList.add('deactive');
            buttonSound.currentTime = 0; // Reset sound to start
            buttonSound.play();
            alert('GAME START....🏁🏁');
        }
    });

    function resetGame() {
        buttonSound.currentTime = 0; // Reset sound to start
        buttonSound.play();
        gameboard = Array(9).fill('');
        gridButtons.forEach(button => {
            button.textContent = '';
            button.style.borderColor = '';
            button.clicked = false;
        });
    }

    reset.addEventListener('click', resetGame);

    function checkWinner() {
        

        if (playerX.score > playerO.score) {
            alert(`${nameA.innerText} Won`);
            winSound.currentTime = 0; // Reset sound to start
            winSound.play();
            resetGame();
            displayScoreX.textContent = 0;
            displayScoreO.textContent = 0;
            playerX.score = 0;
            playerO.score = 0;
            playerTurn = true;
        } else if (playerX.score < playerO.score) {
            alert(`${nameB.innerText} Won`);
            winSound.currentTime = 0; // Reset sound to start
            winSound.play();
            resetGame();
            displayScoreX.textContent = 0;
            displayScoreO.textContent = 0;
            playerX.score = 0;
            playerO.score = 0;
            playerTurn = true;
        } else {
            alert('it\'s a Tie');
            resetGame();
            displayScoreX.textContent = 0;
            displayScoreO.textContent = 0;
            playerX.score = 0;
            playerO.score = 0;
            playerTurn = true;
        }
    }

    checkWins.addEventListener('click', checkWinner);

    function newGame() {
        buttonSound.currentTime = 0; // Reset sound to start
        buttonSound.play();
        location.reload();
    }

    newgame.addEventListener('click', newGame);

    function startGame(event) {
        const button = event.target;

        if (button.clicked) {
            alert('Spot Unavailable');
            return;
        }

        // Play grid sound
        gridSound.currentTime = 0; // Reset sound to start
        gridSound.play();

        if (playerTurn === true) {
            playerX.playerMove(button);
            playerX.updateScore();
            nameA.style.color = 'black';
            nameB.style.color = 'green';
            playerTurn = false;
        } else if (playerTurn === false) {
            playerO.playerMove(button);
            playerO.updateScore();
            nameB.style.color = 'black';
            nameA.style.color = 'green';
            playerTurn = true;
        }
    }

    function playGame() {
        gridButtons.forEach(button => {
            button.removeEventListener('click', startGame);
            button.addEventListener('click', startGame);
        });
    }

    return { playGame };
})();

Gameboard.playGame();