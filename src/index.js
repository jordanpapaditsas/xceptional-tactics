const gameBoard = (() => {
  const board = [];
  
  const getBoard = () => board;

  const renderBoard = () => {
    displayController.boardCells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };
 
  return {
     getBoard,
     renderBoard,
  };
})();

const createPlayer = (name, sign) => {
  return { 
    name, 
    sign 
  };
};

const displayController = (() => {
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');
  const boardElement = document.querySelector('.board');
  const boardCells = document.querySelectorAll('.board-cell');
  const scoreBoard = document.querySelector('.display-player-turn');
  const outcomeMessage = document.querySelector('.outcome-message');
  const buttonContainer = document.querySelector('.buttons');
  const resetBtn = document.querySelector('.reset');
  const tryAgainBtn = document.querySelector('.try-again');

  const init = () => {
    gameBoard.renderBoard(boardCells);
  }

  return {
    player1,
    player2,
    boardElement,
    boardCells,
    scoreBoard,
    buttonContainer,
    resetBtn,
    tryAgainBtn,
    outcomeMessage,
    init,
  }
})();

const stateController = (() => {
    let currentPlayer = displayController.player1;
    let movesCount = 0;
    let gameOver = false;
    displayController.scoreBoard.textContent = `Player ${currentPlayer.sign}'s turn`;
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const displayPlayer = () => {
      if (currentPlayer.sign && movesCount !== displayController.boardCells.length) {
        displayController.scoreBoard.textContent = `Player ${currentPlayer.sign}'s turn`;
      } 
    };

    const switchPlayer = () => {
      if (currentPlayer === displayController.player1) {
        currentPlayer = displayController.player2;
        displayPlayer();
      } else if (currentPlayer === displayController.player2) {
        currentPlayer = displayController.player1;
        displayPlayer();
      }
    };

    const checkIfCellIsEmpty = (event) => {
      if (gameOver) return;

      const clickedCell = event.target;

      if (clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer.sign;
        movesCount++;
        if (checkForWinner(currentPlayer.sign)) {
          displayController.scoreBoard.textContent = '';
          displayController.outcomeMessage.textContent = `${currentPlayer.name + "(" + currentPlayer.sign + ")"} wins!`;
          gameOver = true;
        } else {
          switchPlayer();
        }
      }
    };

    displayController.boardCells.forEach(cell => {
      cell.addEventListener('click', checkIfCellIsEmpty);
    });

    const checkForWinner = (sign) =>  {
      for (let i = 0; i < winningCondition.length; i++) {
        let playerWins = true;
        const cellsToCheck = winningCondition[i].map(index => {
          return displayController.boardCells[index].textContent;
        });

        for (const cell of cellsToCheck) {
          if (cell !== sign) {
            playerWins = false;
            break;
          }
        }

        if (playerWins) {
          return true;
        } else {
          gameIsOver();
        }
      }

      return false; 
    };

    const gameIsOver = () => {
      if (movesCount === displayController.boardCells.length) {
        displayController.scoreBoard.textContent = '';
        displayController.outcomeMessage.textContent = 'It\'s a draw!';
        gameOver = true;
      }
    };

    

    const resetAll = () => {
      displayController.boardCells.forEach(cell => {
        cell.textContent = '';
        movesCount = 0;
        currentPlayer = displayController.player1;
        displayController.scoreBoard.textContent = `Player ${currentPlayer.sign}'s turn`;
        displayController.outcomeMessage.textContent = '';
        gameOver = false;
      });
    };

    displayController.resetBtn.addEventListener('click', resetAll);

    return {
      switchPlayer,
      gameIsOver,
    }
})();

displayController.init();

    // Winning message Div + Player display -- >  need style
    // Try Again btn
    // Reset Btn