
const statusDisplay = document.querySelector('.status');
//Displays players score
let personScore = document.querySelector('#perScore')
//Displays computer's score
let compScore = document.querySelector('#compScore')
//Tracks the wins of the computer and updates the scoreboard
let compWins = 0;
//Tracks the wins of the computer and updates the scoreboard
let playerWins = 0;
let currentPlayer = "X";
/*let currentPlayer;
let human;
let computer;*/

let gameActive = true;
console.log(currentPlayer)
//Empty array of array to play the X's and O's
let gameState = ["", "", "", "", "", "", "", "", ""];

console.log(gameState)

//Status Bar
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

//Positions of of where the winning combos are 
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
    //will display the symbol in the clicked cell on screen
    clickedCell.innerHTML = currentPlayer;
}

/*//Create a random choice for who goes first - human or computer
//Pick a random number between 0 and 1 
let first = Math.random()
    if(first <= .5){
        currentPlayer = "X";
        
    }
    else if(first > .5){
        currentPlayer = "O";
         
    }
    console.log(first)
    human = currentPlayer;
    computer = human === "X" ? "O" : "X"
*/

function handlePlayerChange() {
    
    //currentPlayer = currentPlayer === human ? computer : human
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}



function handleResultValidation() {
   
    //Checks if currentPlayer won the game
    handleWinCondition();
    //If the the game is active then call the next player
    //And execute the computer move
    if(gameActive){
        
        handlePlayerChange();
        handleComputerMove();

    }//If human player wins display and update point on scoreboard
    else if(gameActive == false && handleWinCondition() == true){
        playerWins++
        perScore.innerHTML = `Player Score: ${playerWins} `;
        statusDisplay.innerHTML = 'Human Player Wins This Round!!!';
        statusDisplay.style.color = "rgb(251,100,204)";
    //So player can change turns if didn't win
    }

    
    
}

function handleWinCondition(){//checkWin()
    let roundWon = false;
    //Checks every winning combo to see if it was filled
    for (let i = 0; i <= 7; i++) {
        //creates an array of the winning conditions and
        //and loops through each index to check if each box has been fill
        //and if there is a winning combos
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
            //Highlights the winning 3 cells
           document.getElementById(winCondition[0]).style.backgroundColor = "pink"
           document.getElementById(winCondition[1]).style.backgroundColor = "pink"
           document.getElementById(winCondition[2]).style.backgroundColor = "pink"
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return true; //(this is because its a boolean true variable);

    }
    //Checks if there is any empty spaces 
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return false;
    }


}

//let first = Math.random()
/*if(first >= .5)
{setTimeout(function handleComputerMove(){
    
    //First has to pick the best move
    pickComputerMove();
    if(!handleWinCondition()){
        //Check if the the computer made a winning combo
        handlePlayerChange()
    }
    //If computer wins display and update point on scoreboard
    if(gameActive == false && handleWinCondition() == true){
        compWins++
        compScore.innerHTML = `Computer Score: ${compWins}`;
        statusDisplay.innerHTML = `Computer Wins This Round :(`;
        statusDisplay.style.color = "rgb(251,100,204)";
    //So player can change turns if didn't win
    }
    ;
    

}, 3000) 

}*/

setTimeout(function handleComputerMove(){
    
    //First has to pick the best move
    pickComputerMove();
    if(!handleWinCondition()){
        //Check if the the computer made a winning combo
        handlePlayerChange()
    }
    //If computer wins display and update point on scoreboard
    if(gameActive == false && handleWinCondition() == true){
        compWins++
        compScore.innerHTML = `Computer Score: ${compWins}`;
        statusDisplay.innerHTML = `Computer Wins This Round :(`;
        statusDisplay.style.color = "rgb(251,100,204)";
    //So player can change turns if didn't win
    }
    ;
    

}, 3000)


function pickComputerMove(){
    //Will loop through gameState array until and find a random available spot
    while(true){
        //Finds a random number between 0 and 8
        var ranMove = Math.floor(Math.random() * 8)
        if(gameState[ranMove] == ''){
            break;
        } //Checks if its empty
        //Check through gameState and an available spot 

    }
    //Will pick a random cell and set the computer move and updates the currentPlayer
    gameState[ranMove] = currentPlayer
    document.getElementById(ranMove).innerhtml = currentPlayer

};
 
//Clicks the the current cell and registers the event 
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    //Looks for what index the cell holds
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //checks if the current cell index is not empty and if the game is still active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    //currentPlayer = human;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    //Resets the board back to white for the new game
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white");
}
//Adds event listener to each cell id
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);