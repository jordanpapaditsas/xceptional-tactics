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

  const init = () => {
    gameBoard.renderBoard(boardCells);
  }

  return {
    player1,
    player2,
    boardElement,
    boardCells,
    init,
  }
})();

const stateController = (() => {
    let currentPlayer = displayController.player1;
    let movesCount = 0;
    let gameOver = false;

    const switchPlayer = () => {
      if (currentPlayer === displayController.player1) {
        currentPlayer = displayController.player2;
      } else if (currentPlayer === displayController.player2) {
        currentPlayer = displayController.player1;
      }
    };

    const checkIfCellIsEmpty = (event) => {
      if (gameOver) return;

      const clickedCell = event.target;

      if (clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer.sign;
        movesCount++;
        if (checkForWinner(currentPlayer.sign)) {
          console.log(`${currentPlayer.name} test`);   // Need to change it into div text content with the winning message
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
        console.log(`test`);  // working, remove it after 
        gameOver = true;
      }
    };

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

    return {
      switchPlayer,
      gameIsOver,
    }
})();

displayController.init();

    // Score tracking div
    // Players name turn div
    // Winning message Div
    // Try Again btn
    // Reset Btn