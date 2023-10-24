const gameButtons = document.getElementsByClassName("game__btn");
const gameComponent = document.querySelector(".game");
const resultComponent = document.querySelector(".result");
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

	document.querySelector(".result__choice--user").classList.add(`${userChoice}`);
	document.querySelector(".result__choice--user").innerHTML = userChoice === "paper" ? paperSVG
		: userChoice === "scissors" ? scissorsSVG
		: rockSVG;

	setTimeout(function() {
		document.querySelector(".loading").classList.add("hidden");
		
		document.querySelector(".result__choice--computer").classList.remove("hidden");
		document.querySelector(".result__choice--computer").classList.add(`${computerChoice}`);
		document.querySelector(".result__choice--computer").innerHTML = computerChoice === "paper" ? paperSVG
		: computerChoice === "scissors" ? scissorsSVG
		: rockSVG;
		
		document.querySelector(".outcome").classList.remove("hidden");
		document.querySelector(".outcome__description").innerText = result;			
		
		if (result === "you win") {
			const userScore = document.querySelector(".score__user-score");
			userScore.innerText = +userScore.innerText + 1;

			document.querySelector(".result__choice--user").classList.add("winner");
		} else if (result === "you lose") {
			const computerScore = document.querySelector(".score__computer-score");
			computerScore.innerText = +computerScore.innerText + 1;

			document.querySelector(".result__choice--computer").classList.add("winner");
		}
	}, 1000);

}));

playAgainButton.addEventListener("click", function() {
	gameComponent.classList.remove("hidden");
	resultComponent.classList.add("hidden");

	const regx = new RegExp(/(rock|paper|scissors)/, 'g');

	document.querySelector(".result__choice--user").className = document.querySelector(".result__choice--user").className.replace(regx, '');

	document.querySelector(".loading").classList.remove("hidden");
	document.querySelector(".result__choice--computer").classList.add("hidden");
	document.querySelector(".result__choice--computer").className = document.querySelector(".result__choice--computer").className.replace(regx, '');
	document.querySelector(".outcome").classList.add("hidden");
	
	document.querySelector(".result__choice--user").classList.remove("winner");
	document.querySelector(".result__choice--computer").classList.remove("winner");
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

const rulesButton = document.querySelector(".rules-btn");
const rulesCloseButton = document.querySelector(".rules__close-btn");
const rulesModal = document.querySelector(".rules");

rulesButton.addEventListener("click", function() {
	rulesModal.classList.remove("hidden");
});

rulesCloseButton.addEventListener("click", function() {
	rulesModal.classList.add("hidden");
});