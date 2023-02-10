const statusDisplay = document.querySelector('.status');
//Displays players score
let personScore = document.querySelector('#perScore')
//Displays computer's score
let compScore = document.querySelector('#compScore')
//Tracks the wins of the computer and updates the scoreboard
let compWins = 0;
//Tracks the wins of the computer and updates the scoreboard
let playerWins = 0;
let currentPlayer = "X"
//Chooses what symbol the current player gets
/*let playerSymbol = Math.random();
console.log(playerSymbol);
let currentPlayer;
if (playerSymbol >= .2){ currentPlayer = "X";}
if (playerSymbol < .2){ currentPlayer = "O"}*/

//Have a place holder so the human player can always go first
let humanPlayer = currentPlayer;

//If human player has an X symbol then computer has O symbol vice versa
//Always makes sure computer's symbol is opposites of human player
let computer = humanPlayer === "X" ? "O" : "X";

let gameActive = true;
console.log(currentPlayer)
let gameState = ["", "", "", "", "", "", "", "", ""];

//Shows what cells are open that haven't been chosen by a player
var openCell=new Set();
for(let i=0;i<9;i++){
    openCell.add(i)
}

console.log(openCell);

/*let computerTurn=()=>{
    var arr =  

}*/

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//This handles the updating of the board of who just played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}



function handleResultValidation() {
    let roundWon = false;
    //Checks every winning combo to see if it was filled
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        // Checks each row to see whether the same a,b,c is empty or filled with the same symbol
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return; //roundWon (this is because its a boolean true variable);
        
    }

    //Checks if there is any empty spaces 
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return; //false;
    }

    //CheckWin();
    handlePlayerChange();
    
    //ComputerMove();
    
}

/*function ComputerMove(){
    
    //First has to pick the best move
    pickComputerMove()
    //Check if the the computer made a winning combo
    CheckWin()
    //Goes to the next player (human)
    handlePlayerChange()


}
*/

/*function pickComputerMove(){
    //Will loop through gameState array until and find a random available spot
    while(true){
        //Finds a random number between 1 and 9
        m = Math.floor(Math.random()*8))
        if(gameState[m] == '') //Checks if its empty
        //Check through gameState and an available spot 

    }
    //Will set the computer move
    //
    gameState[m] = currentPlayer
    document.getElementById(m).innerhtml = currentPlayer

}

function checkWin(){

}


*/
 

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //checks if the cell index is not empty 
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
//Adds event listener to each cell id
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);