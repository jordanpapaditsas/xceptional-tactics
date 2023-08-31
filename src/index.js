const gameBoard = (() => {
  const board = [['', '', ''],['', '', ''],['', '', '']];
  
  const getBoard = () => board;

  const renderBoard = boardCells => {
    board.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        const cellIndex = rowIndex * 3 + columnIndex;
        boardCells[cellIndex].textContent = cellValue;
      });
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
  // Play again Btn
  // Reset Btn
  return {
    player1,
    player2,
    boardElement,
    boardCells,
    init,
  }
})();

const stateController = (() => {
    // Player's turn
    let currentPlayer = displayController.player1;

    const switchPlayer = () => {
      if (currentPlayer === displayController.player1) {
        currentPlayer = displayController.player2;
      } else if (currentPlayer === displayController.player2) {
        currentPlayer = displayController.player1;
      }
    };

    const checkIfCellIsEmpty = (event) => {
      const clickedCell = event.target;

      if (clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer.sign;
        switchPlayer();
      }
    };

    displayController.boardCells.forEach(cell => {
      cell.addEventListener('click', checkIfCellIsEmpty);
    });

    // Score tracking - first to 3 wins -> winner
    // Outcome message - winner 

    // Winning condition
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
    }
})();

displayController.init();
