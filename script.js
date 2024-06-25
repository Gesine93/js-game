document.addEventListener('DOMContentLoaded', function() {
    let computerScore = 0;
    let humanScore = 0;
    let scoreText, computer, human;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function wait() {
        await sleep(3000);
    }

    function getComputerChoice() {
        let number = Math.random();
        if (number <= 0.33) {
            return "scissors";
        } else if (number <= 0.66) {
            return "rock";
        } else {
            return "paper";
        }
    }

    async function playRound(event) {
        if (computerScore >= 5 || humanScore >= 5) {
            return;
        }

        let humanSelection = event.target.id;
        let computerSelection = getComputerChoice();
        let game = playGame(humanSelection, computerSelection);
        humanScore = game.humanScore;
        computerScore = game.computerScore;
        scoreText.textContent = game.result;
        human.textContent = humanScore;
        computer.textContent = computerScore;

        if (computerScore >= 5 || humanScore >= 5) {
            await wait();
            const body = document.querySelector("body");
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }

            let finalText = "";
            if (computerScore >= 5) {
                finalText = "The computer wins the game!";
            } else if (humanScore >= 5) {
                finalText = "You win the game!";
            }

            openMenu(finalText);
        }
    }

    function playGame(humanSelection, computerSelection) {
        if (humanSelection === computerSelection) {
            let result = `Tie! You both chose ${humanSelection}!`;
            return { humanScore, computerScore, result };
        } else if ((humanSelection === "rock" && computerSelection === "scissors") || 
                (humanSelection === "paper" && computerSelection === "rock") ||
                (humanSelection === "scissors" && computerSelection === "paper")) {
            let result = `You win! ${humanSelection} beats ${computerSelection}!`;
            humanScore += 1;
            return { humanScore, computerScore, result };
        } else {
            let result = `You lose! ${computerSelection} beats ${humanSelection}!`;
            computerScore += 1;
            return { humanScore, computerScore, result };
        }
    }

    function openMenu(text) {
        let menuDiv = document.createElement("div");
        let finalText = document.createElement("p");
        let menuButton = document.createElement("button");
        let body = document.querySelector("body");
        finalText.textContent = text;
        menuDiv.setAttribute("id", "menu");
        finalText.setAttribute("id", "menuText");
        menuButton.setAttribute("id", "menuButton");
        menuButton.textContent = "START NEW GAME";
        menuDiv.appendChild(finalText);
        menuDiv.appendChild(menuButton);
        body.appendChild(menuDiv);
        menuButton.addEventListener("click", newGame);
    }

    function newGame() {
        const body = document.querySelector("body");
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
        computerScore = 0;
        humanScore = 0;

        // Create game container
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game';

        // Create displayScores div
        const displayScoresDiv = document.createElement('div');
        displayScoresDiv.className = 'displayScores';

        // Create player score elements
        const playerP = document.createElement('p');
        playerP.className = 'player';

        const playerScoreText = document.createElement('span');
        playerScoreText.className = 'scoresText';
        playerScoreText.textContent = 'PLAYER';

        const playerScore = document.createElement('span');
        playerScore.className = 'scoresText';
        playerScore.id = 'humanScore';
        playerScore.textContent = '0';

        playerP.appendChild(playerScoreText);
        playerP.appendChild(playerScore);

        // Create computer score elements
        const computerP = document.createElement('p');
        computerP.className = 'computer';

        const computerScoreText = document.createElement('span');
        computerScoreText.className = 'scoresText';
        computerScoreText.textContent = 'COMPUTER';

        const compScore = document.createElement('span');
        compScore.className = 'scoresText';
        compScore.id = 'computerScore';
        compScore.textContent = '0';

        computerP.appendChild(computerScoreText);
        computerP.appendChild(compScore);

        // Append player and computer scores to displayScores div
        displayScoresDiv.appendChild(playerP);
        displayScoresDiv.appendChild(computerP);

        // Create buttons div
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        // Create rock button
        const rockButton = document.createElement('button');
        rockButton.id = 'rock';
        rockButton.textContent = 'ROCK';
        rockButton.addEventListener('click', playRound);

        // Create paper button
        const paperButton = document.createElement('button');
        paperButton.id = 'paper';
        paperButton.textContent = 'PAPER';
        paperButton.addEventListener('click', playRound);

        // Create scissors button
        const scissorsButton = document.createElement('button');
        scissorsButton.id = 'scissors';
        scissorsButton.textContent = 'SCISSORS';
        scissorsButton.addEventListener('click', playRound);

        // Append buttons to buttons div
        buttonsDiv.appendChild(rockButton);
        buttonsDiv.appendChild(paperButton);
        buttonsDiv.appendChild(scissorsButton);

        // Create text div
        const textDiv = document.createElement('div');
        textDiv.className = 'text';

        // Create scoreText paragraph
        const scoreTextP = document.createElement('p');
        scoreTextP.className = 'scoreText';
        scoreTextP.textContent = "Start playing!";

        textDiv.appendChild(scoreTextP);

        // Append all elements to game div
        gameDiv.appendChild(displayScoresDiv);
        gameDiv.appendChild(buttonsDiv);
        gameDiv.appendChild(textDiv);

        // Append game div to body
        document.body.appendChild(gameDiv);

        // Variables and event listeners already provided
        scoreText = document.querySelector(".scoreText");
        computer = document.querySelector("#computerScore");
        human = document.querySelector("#humanScore");

        rockButton.addEventListener("click", playRound);
        paperButton.addEventListener("click", playRound);
        scissorsButton.addEventListener("click", playRound);
    }

    // Call the newGame function to set up the initial game
    newGame();
});
