
const gameButtons = [...document.querySelectorAll('.interface img')];
const gameTrigger = document.querySelector('#gameTrigger');
const restartGame = document.querySelector('#restartGame');
const modalDialog = document.querySelector('.modal-box');

let humanChoice; // not set until click
let computerChoice; // not set until click
let gameScore = [0, 0]; // yours, theirs

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
            button.classList.remove('selected');
        });
        this.classList.add('selected');
        modalDialog.classList.add('active');

        humanChoice = this.id;
        displayChoice('#yourChoice strong', humanChoice);

        toggleHidden('#gameTrigger', false);
        toggleHidden('#yourChoice label', false);
        toggleHidden('#theirChoice', true);
    });
});

gameTrigger.addEventListener('click', function () {

    computerChoice = gameButtons[Math.floor(Math.random() * gameButtons.length)].id;
    displayChoice('#theirChoice strong', computerChoice);

    this.hidden = true;
    toggleHidden('#yourChoice label', true);
    toggleHidden('#theirChoice', false);
    toggleHidden('.outcome', false);

    gameWinner(); // determine winner

    gameButtons.forEach(button => {
        button.classList.add('disabled');
    });
});

function gameWinner() {

    let victory; // not set until click
    let defeat; // not set until click

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
    if(victory) {
        declareWinner('You win!');
        ++gameScore[0]; // update yours
        updateScore('#yourScore', gameScore[0]);
    }
    if(defeat) {
        declareWinner('You lost!');
        ++gameScore[1]; // update theirs
        updateScore('#theirScore', gameScore[1]);
    }
}

function updateScore(selector, score) {
    const targetElement = document.querySelector(selector);
    targetElement ? (targetElement.innerHTML = score) : null;
}

restartGame.addEventListener('click', function () {

    gameButtons.forEach(button => {
        button.classList.remove('disabled','selected');
    });
    modalDialog.classList.remove('active');
    toggleHidden('.outcome', true);
});