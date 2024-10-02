/**
 * 
 * I need 2 Managers: 
 * - GameManager - Manages the flow of the game
 * - BoardManager - Manages any updates around the Board
 * 
 * Need a factory Function to create the Players
 */

function GameManger(){
  let player1,player2
  let activePlayer
  let draws;
  const boardManager = BoardManager()
  let gameOver = false;
  const winCons = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const startGame = () => {
    let isValid;
    let player1Mark
    let player2Mark
    let setMark

    gameOver = false
    

    do {
       setMark = prompt("Pick Player 1's Mark: X or O. Remember: X goes first").toUpperCase()
       console.log(setMark)
       setMark === 'X' || setMark === 'O' ? (isValid = true, player1Mark = setMark)  : isValid = false 
       console.log(isValid)
    } while(!isValid)
      
      player2Mark = player1Mark === 'X' ? 'O' : 'X'

      player1 = createPlayer("Player 1" , player1Mark)
      player2 = createPlayer("Player 2" , player2Mark)

      activePlayer = player1.mark === 'X' ? player1 : player2 

      takeTurn()
  }

  const takeTurn = () => {

    let cell = parseInt(prompt(`${activePlayer.name}: Choose a cell`))

    boardManager.addMark(activePlayer.mark, cell)
    console.log(boardManager.getBoard())
    checkForWin()
    if(!gameOver)
      switchActivePlayer()
  }

  const checkForWin = () => {
    const board = boardManager.getBoard()

    winCons.forEach((condition) => {
      if(board[condition[0]] !== '' && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]){
        gameOver = true;
        endWin()
      }
    }
    )

    if(!board.includes('')){
      gameOver = true
      endDraw()
    }

  }

  const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    takeTurn()
  }

  const endWin = () => {
    let isValid;
    let playAgain
    alert(`${activePlayer.name} has won`)
    activePlayer.addWin()
    do {
      let playAgainInput = prompt("Play again? Y or N?").toUpperCase()
      playAgainInput === 'Y' || playAgainInput === 'N' ? (isValid = true, playAgain = playAgainInput )  : isValid = false 
   } while(!isValid)

    playAgain === 'Y' ? restartGame() : endGame()
  }

  const restartGame = () => {
    boardManager.clearBoard()
    startGame()
  }

  const endGame = () => {
    alert("Go in Peace")
    boardManager.clearBoard()
  }

  const endDraw = () => {
    let isValid;
    let playAgain
    alert("Game has ended in a draw")
    do {
      playAgain = prompt("Play again? Y or N?").toUpperCase()
      playAgainInput === 'Y' || playAgainInput === 'N' ? (isValid = true, playAgain = playAgainInput )  : isValid = false    } while(!isValid)

    playAgain === 'Y' ? restartGame() : endGame()
  }



  return {startGame, takeTurn}  
}

function BoardManager(){
  // Hold the Cells of the board
  const board = ['','','','','','','','','']

  const addMark = (playerMark, cell) => {
    let isValid = board[cell] === '' ? (board[cell] = playerMark, true) : false
    
    while(!isValid){
      let newCell = parseInt(prompt("Cell taken, please choose another one"))
      board[newCell] === '' ? (board[newCell] = playerMark, isValid = true) : isValid = false
    }
  }

  const clearBoard = () => {
    for(let i = 0; i < board.length; i++){
      board[i] = ''
    }
  }

  const getBoard = () => board

  return{getBoard, addMark, clearBoard}
}

function createPlayer(name, mark){
  let wins = 0;

  const addWin = () => {
    wins++
  }

  const getWins = () => {
    return wins
  }

  return {name, mark,addWin,getWins}
}

const game = GameManger()

