function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
};

function toTitleCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

function playRound(playerSelection, computerSelection) {
    playerSelection = toTitleCase(playerSelection);
    let result;

    if (playerSelection === computerSelection) {
        result = "Tie!"
    } else if (
        playerSelection === "Rock" && computerSelection === "Scissors" ||
        playerSelection === "Paper" && computerSelection === "Rock" ||
        playerSelection === "Scissors" && computerSelection === "Paper"
    ) {
        result = `You win! ${playerSelection} beats ${computerSelection}`
    } else if (
        playerSelection === "Rock" && computerSelection === "Paper" ||
        playerSelection === "Paper" && computerSelection === "Scissors" ||
        playerSelection === "Scissors" && computerSelection === "Rock"
    ) {
        result = `You lose! ${computerSelection} beats ${playerSelection}`
    }

    return result;
};

function game() {
    let computerScore = 0;
    let playerScore = 0;

    while (computerScore < 5 && playerScore < 5) {
        let playerChoice = prompt("Please enter your choice");
        playerChoice = toTitleCase(playerChoice);
        
        while (!(playerChoice === "Rock" || playerChoice === "Paper" || playerChoice === "Scissors")) {
            playerChoice = prompt("Please enter a valid choice");
            playerChoice = toTitleCase(playerChoice);
        }

        let result = playRound(playerChoice, getComputerChoice());
        
        if (result.includes("You win!")) {
            playerScore++
        } else if (result.includes("You lose!")) {
            computerScore++
        }

        console.log(result, `You: ${playerScore} vs. Computer: ${computerScore}`);
    }
}

game();