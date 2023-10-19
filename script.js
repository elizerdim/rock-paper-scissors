const gameButtons = document.getElementsByClassName("game-btn");
const gameComponent = document.querySelector(".container-game");
const resultComponent = document.querySelector(".container-result");
const paperSVG = document.querySelector(".paper-img").outerHTML;
const scissorsSVG = document.querySelector(".scissors-img").outerHTML;
const rockSVG = document.querySelector(".rock-img").outerHTML;
const playAgainButton = document.querySelector(".play-again-btn");

Array.from(gameButtons).forEach(button => button.addEventListener("click", function() {
	const userChoice = button.id;
	const computerChoice = getComputerChoice();
	const result = playRound(userChoice, computerChoice);
	
	gameComponent.classList.add("hidden");
	resultComponent.classList.remove("hidden");

	document.querySelector(".user-choice").classList.add(`${userChoice}-btn`);
	document.querySelector(".user-choice").innerHTML = userChoice === "paper" ? paperSVG
		: userChoice === "scissors" ? scissorsSVG
		: rockSVG;

	setTimeout(function() {
		document.querySelector(".loading").classList.add("hidden");
		
		document.querySelector(".computer-choice").classList.remove("hidden");
		document.querySelector(".computer-choice").classList.add(`${computerChoice}-btn`);
		document.querySelector(".computer-choice").innerHTML = computerChoice === "paper" ? paperSVG
		: computerChoice === "scissors" ? scissorsSVG
		: rockSVG;
		
		document.querySelector(".container-play-again").classList.remove("hidden");
		document.querySelector(".result-description").innerText = result;			
		
		if (result === "you win") {
			document.querySelector(".user-choice").classList.add("winner");
		} else if (result === "you lose") {
			document.querySelector(".computer-choice").classList.add("winner");
		}
	}, 1000);

}));

playAgainButton.addEventListener("click", function() {
	gameComponent.classList.remove("hidden");
	resultComponent.classList.add("hidden");

	const regx = new RegExp(/[a-z]+\-btn/, 'g');

	document.querySelector(".user-choice").className = document.querySelector(".user-choice").className.replace(regx, '');

	document.querySelector(".loading").classList.remove("hidden");
	document.querySelector(".computer-choice").classList.add("hidden");
	document.querySelector(".computer-choice").className = document.querySelector(".computer-choice").className.replace(regx, '');
	document.querySelector(".container-play-again").classList.add("hidden");
	
	document.querySelector(".user-choice").classList.remove("winner");
	document.querySelector(".computer-choice").classList.remove("winner");
});

function getComputerChoice() {
	let randomNumber = Math.floor(Math.random() * 3);

	switch (randomNumber) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
	}
};

function playRound(playerSelection, computerSelection) {
	let result;

	if (playerSelection === computerSelection) {
		result = "it's a tie"
	} else if (
		playerSelection === "rock" && computerSelection === "scissors" ||
		playerSelection === "paper" && computerSelection === "rock" ||
		playerSelection === "scissors" && computerSelection === "paper"
	) {
		result = "you win"
	} else if (
		playerSelection === "rock" && computerSelection === "paper" ||
		playerSelection === "paper" && computerSelection === "scissors" ||
		playerSelection === "scissors" && computerSelection === "rock"
	) {
		result = "you lose"
	}

	return result;
};