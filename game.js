// Module for the creation and resetting of the game field >>> in the empty div .game-field
const gameModule = (function() {
    function createGamefield() { 
        const content = document.querySelector(".game-field");
        for (let i = 0; i < 9; i++) {
            const choiceField = document.createElement("div");
            choiceField.id = "choice" + (i + 1);
            choiceField.classList.add("choice");
            content.appendChild(choiceField);
        };
    };

    function resetGamefield() {
        const choiceFields = document.querySelectorAll(".choice");
        choiceFields.forEach(choiceField => {
            choiceField.innerHTML = "";
        });
    }

    return {
        createGamefield,
        resetGamefield
    }
})();

gameModule.createGamefield();

// Factory functions to create Players and Computers
// Automatically creates Player 1 and Player 2
function createPlayer(color, turn) {
    return {
        color: color,
        turn: turn,
        playerChoice: function(btnId) {
            const choice = document.querySelector(`#${btnId}`);
            if (choice.innerHTML === "") {
                choice.innerHTML = `<p><span id="${color.toLowerCase()}-span">${color}</span></p>`;
            }
        }
    };
}

function createComputer(color, turn) {
    return {
        color: color,
        turn: turn,
        computerChoice: () => {
            // Needs to be build out
            // Logic so computer chooses perfect choice
        } 
    };
}

let playerOne = createPlayer("X", 1);
let playerTwo = createPlayer("O", 0);

// Game Logic
const gameLogicModule = (function() {
    function playTurn(playerOne, playerTwo) {
        // Checks who has the turn
        let player = {};
        let notPlayer = {};

        if (playerOne.turn === 1) {
            player = playerOne;
            notPlayer = playerTwo;
        } else if (playerTwo.turn === 1) {
            player = playerTwo;
            notPlayer = playerOne;
        } else {
            console.log("Turn ERROR");
        }

        function checkWin() {
            // Implementation of win checking logic
            // !!! needs to be build out
        }

        // Player can set choices
        function handleEvent(event) {
            player.playerChoice(event.target.id); //Sets X or O 
            player.turn = 0; 
            notPlayer.turn = 1; // Changes turns
            playTurn(playerOne, playerTwo); //Intiates new turn
            deleteEvents();//deletes all event listeners so there is no collision
        }
        const choiceFields = document.querySelectorAll(".choice");
        choiceFields.forEach(choiceField => {
            choiceField.addEventListener("click", handleEvent);
        });      

        // Deletes old event listeners
        function deleteEvents() {
            choiceFields.forEach(choiceField => {
                choiceField.removeEventListener("click", handleEvent);
            });            
        }
    }

    return {
        playTurn
    }
})();

gameLogicModule.playTurn(playerOne, playerTwo);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    gameModule.resetGamefield();
})