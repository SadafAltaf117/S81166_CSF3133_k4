// Global variables to track game state
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Start the game after validating player name
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Generate random computer choice using array and Math functions
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play one round and update UI, score, and history table
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    let resultElement = document.getElementById("result");

    // Determine round winner
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw!";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultElement.innerHTML = "You Win!";
        resultElement.style.color = "green";
    } else {
        outcome = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose!";
        resultElement.style.color = "red";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array and append row to history table
    results.push(outcome);
    let historyTable = document.getElementById("history");
    historyTable.innerHTML +=
        "<tr><td>" + roundCount + "</td><td>" + playerChoice +
        "</td><td>" + computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// Calculate win percentage using a for loop and Math.round()
function showSummary() {
    if (results.length === 0) {
        alert("Play at least one round first!");
        return;
    }

    let totalWins = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let percentage = Math.round((totalWins / results.length) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + results.length + " rounds and won " + percentage + "%";
}

// Reset all scores, array, history table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";
}