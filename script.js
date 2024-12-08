const playerSelections = document.querySelectorAll(".selection-button"); //variable to select all buttons
const computerTally = document.querySelector("#computerscore"); //variable to store the computer tally based on the p 
const humanTally = document.querySelector("#playerscore"); //variable to store the human tally based on the p 
const announcement = document.querySelector("#announcement"); //variable to store the announcement messages
const restart = document.querySelector("#restart-button"); //variable to store the restart button


let humanScore = 0; //variable to store the human score, initialized at 0
let computerScore = 0; //variable to store the computer score, initialized at 0
let roundCount = 0; //variable to store the number of rounds that have been played

playerSelections.forEach((button) => {
    button.addEventListener("click", () => {
        const humanChoice = button.querySelector(".button-text").textContent.toLowerCase();
        const computerChoice = getComputerChoice();
        const result = playRound(humanChoice, computerChoice);
        
        //Scoring logic for a single game
            if (result === "computer") {
            computerScore++;
        } else if (result === "human") {
            humanScore++;
        }
        //Store the results in the paragraph
        computerTally.textContent = computerScore;
        humanTally.textContent = humanScore;

        roundCount++; // Increment the round count

        const table = document.querySelector("table");
        const row = table.querySelector(`tr:nth-child(${roundCount})`);
        const resultCell = row.querySelector("td:nth-child(2)");
        resultCell.textContent = `${result === "draw" ? "It's a draw" : `${result} wins`}!`;

        if (roundCount === 5) { // If 5 rounds have been played end the game and declare winner
            declareWinner();
        }
    
    });
});

function getComputerChoice(){ //create a function called getComputerChoice
    let computerChoices = ["rock" , "paper" , "scissors"] //create a variable to store the different choices as string values
    let random = Math.floor(Math.random() * computerChoices.length); //generates a random integer between 0 and the length of the array choice minus 1. This random integer represents an index to access a random element from the array
    return computerChoices[random]; // accesses the element at the random index within the computerChoices array
}


function playRound(humanChoice, computerChoice) { //create a function called playRound which takes the human and computer player choices as arguments
    announcement.textContent = ""; 

    if   //create a condition for when the computer wins which generates a losing message and assigns the computer one point
        ((humanChoice === "rock" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "rock")) {
        announcement.textContent = `You lose this round! ${computerChoice} beats ${humanChoice}`; 
        return "computer"; // Computer wins
} else if //create a condition for when the human wins which generates a winning message and assigns the human one point
        ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        announcement.textContent = `You win this round! ${humanChoice} beats ${computerChoice}`;  
        return "human"; // Human wins
} else if //create a condition for when both choices are the same and generates a draw message
        ((humanChoice === computerChoice)) {
        announcement.textContent = `It's a draw this round! ${humanChoice} is the same as ${computerChoice}`;
        return "draw"; // Draw
}
    
}

function declareWinner() {
    if (humanScore > computerScore) {
        announcement.textContent = `You won the game with ${humanScore} points!`;
    } else if (computerScore > humanScore) {
        announcement.textContent = `You lose the game with ${humanScore} points!`;   
    } else {
        announcement.textContent = `It's a draw!`;
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    roundCount = 0;

    humanTally.textContent = 0;
    computerTally.textContent = 0;

    const table = document.querySelector("table");
    table.querySelectorAll("td:nth-child(2)").forEach((cell) => {
        cell.textContent = "";
    });

    announcement.textContent = "Let's play! Select an option to start the game.";
}

restart.addEventListener('click',() => {
    resetGame();
});