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
    // const scoreA = displayScoreX.value;
    // const scoreB = displayScoreO.value;
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
                let alertShown = false;
                const winningCombo = [
                    [0, 1, 2], // Row 1
                    [3, 4, 5], // Row 2
                    [6, 7, 8], // Row 3
                    [0, 3, 6], // Column 1
                    [1, 4, 7], // Column 2
                    [2, 5, 8], // Column 3
                    [0, 4, 8], // Diagonal \
                    [2, 4, 6]  // Diagonal /
                ];

                for (let combo of winningCombo) {
                    const [a, b, c] = combo;


                    if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c] && gameboard[a] !== '') {
                        alert(`${this.name} Wins`);
                        this.score++

                        if (this.score > 0) {
                            const scoreElement = document.getElementById(this.marker === 'X' ? 'Xscore' : 'Oscore');
                            scoreElement.textContent = ` ${this.score}`;
                        }

                        // if (this.score === 5) {
                        //     gameOver();
                        // }



                    } else if ((gameboard[a] !== '' && gameboard[b] !== '' && gameboard[c] !== '') && (gameboard[a] !== gameboard[b] || gameboard[a] !== gameboard[c] || gameboard[b] !== gameboard[c]) && (!gameboard.includes('')) && (!gameboard.includes(null)) && (!alertShown)) {

                        alert('It\'s a Tie');
                        alertShown = true;

                    }
                }





            }
        }
    }

    const playerX = player(nameA.innerText, 'X', 'green', zero);
    const playerO = player(nameB.innerText,  'O', 'blue', zero);


    play.addEventListener('click', function(){
        
        if(playerA.value && playerB.value){
            nameA.innerText = playerA.value;
            nameB.innerText = playerB.value;
           

            // const playA = playerA.value;
            // const playB = playerB.value;
            // const markA = markerA.value;
            // const markB = markerB.value;

            
            setGame.classList.add('deactive');
            overlay.classList.add('deactive');

            alert('GAME START....🏁🏁');
        }

        
    })      


    
    
    function resetGame() {

        gameboard = Array(9).fill('');
        gridButtons.forEach(button => {
            button.textContent = '';
            button.style.borderColor = '';
            button.clicked = false;

        })

    }

    reset.addEventListener('click', resetGame);

    
    function checkWinner() {

        if(playerX.score > playerO.score){
            alert(`${nameA.innerText} Won`);
            resetGame();
            displayScoreX.textContent = 0;
            displayScoreO.textContent = 0;
            playerX.score = 0;
            playerO.score = 0;
            playerTurn = true;
        }else if(playerX.score < playerO.score){
            alert(`${nameB.innerText} Won`);
            resetGame();
            displayScoreX.textContent = 0;
            displayScoreO.textContent = 0;
            playerX.score = 0;
            playerO.score = 0;
            playerTurn = true;
        }else{
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


    function newGame(){
    
        location.reload();
        
    }

    newgame.addEventListener('click', newGame);

    
    function startGame(event) {
        const button = event.target;
            
        
        if (button.clicked) {
            alert('Spot Unavailable');
            return;
        }

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
        })
       

    }

    // playGame();


    return { playGame };
})()

Gameboard.playGame();



