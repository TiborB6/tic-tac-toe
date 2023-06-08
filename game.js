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
        winArr: [],
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
        winArr: [],
        computerChoice: () => {
            // Needs to be build out
            // Logic so computer chooses perfect choice
        } 
    };
}

//Create first to player
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

        // Checks for win by getting all elements that have a choice inside them and adds them to the player
        // Then checks this arrays if there is a winning condition 
        // If there is a highlight is added to the winning team
        function checkWin(playerOne, playerTwo) {
            const checked = document.querySelectorAll(".choice > p")
            checked.forEach(check => {
                if (check.textContent == "X") {
                    playerOne.winArr.push(check.parentNode.id);
                }
                if (check.textContent == "O") {
                    playerTwo.winArr.push(check.parentNode.id);
                } 
            })

            function winEvent(player){
                player.winArr.forEach(choice => {
                    const winChoice = document.querySelector(`#${choice}`);
                    winChoice.classList.add("highlight-winner");
                })
            }

            if (
                playerOne.winArr.includes("choice1") && playerOne.winArr.includes("choice2") && playerOne.winArr.includes("choice3") ||
                playerOne.winArr.includes("choice4") && playerOne.winArr.includes("choice5") && playerOne.winArr.includes("choice6") ||
                playerOne.winArr.includes("choice7") && playerOne.winArr.includes("choice8") && playerOne.winArr.includes("choice9") ||
                playerOne.winArr.includes("choice1") && playerOne.winArr.includes("choice4") && playerOne.winArr.includes("choice7") ||
                playerOne.winArr.includes("choice2") && playerOne.winArr.includes("choice5") && playerOne.winArr.includes("choice8") ||
                playerOne.winArr.includes("choice3") && playerOne.winArr.includes("choice6") && playerOne.winArr.includes("choice9") ||
                playerOne.winArr.includes("choice1") && playerOne.winArr.includes("choice5") && playerOne.winArr.includes("choice9") ||
                playerOne.winArr.includes("choice3") && playerOne.winArr.includes("choice5") && playerOne.winArr.includes("choice7") 
            ){
                winEvent(playerOne);
            } else if (
                playerTwo.winArr.includes("choice1") && playerTwo.winArr.includes("choice2") && playerTwo.winArr.includes("choice3") ||
                playerTwo.winArr.includes("choice4") && playerTwo.winArr.includes("choice5") && playerTwo.winArr.includes("choice6") ||
                playerTwo.winArr.includes("choice7") && playerTwo.winArr.includes("choice8") && playerTwo.winArr.includes("choice9") ||
                playerTwo.winArr.includes("choice1") && playerTwo.winArr.includes("choice4") && playerTwo.winArr.includes("choice7") ||
                playerTwo.winArr.includes("choice2") && playerTwo.winArr.includes("choice5") && playerTwo.winArr.includes("choice8") ||
                playerTwo.winArr.includes("choice3") && playerTwo.winArr.includes("choice6") && playerTwo.winArr.includes("choice9") ||
                playerTwo.winArr.includes("choice1") && playerTwo.winArr.includes("choice5") && playerTwo.winArr.includes("choice9") ||
                playerTwo.winArr.includes("choice3") && playerTwo.winArr.includes("choice5") && playerTwo.winArr.includes("choice7") 
            ) {
                winEvent(playerTwo)
            } else {
                playTurn(playerOne, playerTwo); //Intiates new turn
            };

            playerOne.winArr = [];
            playerTwo.winArr = [];
        }   
        // Player can set choices
        function handleEvent(event) {
            player.playerChoice(event.target.id); //Sets X or O 
            player.turn = 0; 
            notPlayer.turn = 1; // Changes turns
            deleteEvents();//deletes all event listeners so there is no collision
            checkWin(playerOne, playerTwo);
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

// Handels the reset
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    gameModule.resetGamefield();
    gameLogicModule.playTurn(playerOne, playerTwo);

    const highlights = document.querySelectorAll(".highlight-winner");
    highlights.forEach(highlight => {
        highlight.classList.remove("highlight-winner");
    });    
});
