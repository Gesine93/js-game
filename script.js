document.addEventListener('DOMContentLoaded', function() {
    const rock = document.querySelector("#rock");
    const paper = document.querySelector("#paper");
    const scissors = document.querySelector("#scissors");
    const scoreText = document.querySelector(".scoreText");
    const computer = document.querySelector("#computerScore");
    const human = document.querySelector("#humanScore");
    let computerScore = 0;
    let humanScore = 0;

    rock.addEventListener("click", playRound);
    paper.addEventListener("click", playRound);
    scissors.addEventListener("click", playRound);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function wait() {
        await sleep(3000)
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
            /* wait than display a replay button and text */
            if (computerScore >= 5) {
                finalText.textContent = "The computer wins the game!";
            } else if (humanScore >= 5) {
                finalText.textContent = "You win the game!";
            };
        };
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
})