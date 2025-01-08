
const gameButtons = [...document.querySelectorAll('.interface img')];
const gameTrigger = document.querySelector('#gameTrigger');
const restartGame = document.querySelector('#restartGame');
const modalDialog = document.querySelector('.modal-box');

let humanChoice; // not set until click
let computerChoice; // not set until click

function displayChoice(selector, choice) {
    const targetElement = document.querySelector(selector);
    targetElement ? (targetElement.innerHTML = choice) : null;
}

function toggleHidden(element, state) {
    const thisElement = document.querySelector(element);
    thisElement ? (thisElement.hidden = state) : null;
}

gameButtons.forEach(button => {

    button.addEventListener('click', function () {

        gameButtons.forEach(button => {
            button.classList.add('disabled');
        });
        this.classList.add('selected');
        modalDialog.classList.add('active');

        humanChoice = this.id;
        displayChoice('#yourChoice strong', humanChoice);

        toggleHidden('#gameTrigger', false);
        toggleHidden('#theirChoice', true);
    });
});

gameTrigger.addEventListener('click', function () {

    computerChoice = gameButtons[Math.floor(Math.random() * gameButtons.length)].id;
    displayChoice('#theirChoice strong', computerChoice);

    this.hidden = true;
    toggleHidden('#theirChoice', false);
    toggleHidden('.outcome', false);

    gameWinner();
});

function gameWinner() {

    let victory; // not set until game is triggered
    let defeat; // not set until game is triggered

    switch (true) {
        case humanChoice == computerChoice:
             declareWinner('Draw!');
             break;
        case humanChoice == 'Rock' && computerChoice == 'Paper':
             defeat = true;
             break;
        case humanChoice == 'Rock' && computerChoice == 'Scissors':
             victory = true;
             break;
        case humanChoice == 'Paper' && computerChoice == 'Rock':
            victory = true;
             break;
        case humanChoice == 'Paper' && computerChoice == 'Scissors':
             defeat = true;
             break;
        case humanChoice == 'Scissors' && computerChoice == 'Rock':
             defeat = true;
             break;
        case humanChoice == 'Scissors' && computerChoice == 'Paper':
             victory = true;
             break;
    }
    function declareWinner(message) {
        const targetElement = document.querySelector('#winner');
        targetElement ? targetElement.innerHTML = message : null;
    }
    victory ? declareWinner('You win!') : null;
    defeat ? declareWinner('You lost!') : null;
}

restartGame.addEventListener('click', function () {

    gameButtons.forEach(button => {
        button.classList.remove('disabled','selected');
    });
    modalDialog.classList.remove('active');
    toggleHidden('.outcome', true);
});