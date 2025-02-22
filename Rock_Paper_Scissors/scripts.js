
const gameButtons = document.querySelectorAll('.interface img');
const gameTrigger = document.querySelector('#gameTrigger');
const restartGame = document.querySelector('#restartGame');
const modalDialog = document.querySelector('.modal-box');

let humanChoice; // not set until click
let computerChoice; // not set until click
let gameScore = [0, 0]; // yours, theirs

function displayChoice(selector, choice) {
    const targetElement = document.querySelector(selector);
    targetElement ? (targetElement.innerText = choice) : null;
}

function toggleHidden(elements, state) {
    elements.forEach(element => {
        const thisElement = document.querySelector(element);
        thisElement ? (thisElement.hidden = state) : null;
    });
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

        toggleHidden(['#gameTrigger','#yourChoice label'], false);
        toggleHidden(['#theirChoice','.outcome'], true);
    });
});

gameTrigger.addEventListener('click', function () {

    computerChoice = gameButtons[Math.floor(Math.random() * gameButtons.length)].id;
    displayChoice('#theirChoice strong', computerChoice);

    toggleHidden(['#gameTrigger','#yourChoice label'], true);
    toggleHidden(['#theirChoice','.outcome'], false);

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
        targetElement ? targetElement.innerText = message : null;
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
    targetElement ? (targetElement.innerText = score) : null;
}

restartGame.addEventListener('click', function () {

    modalDialog.classList.remove('active');
    gameButtons.forEach(button => {
        button.classList.remove('disabled','selected');
        button.classList.toggle('retrigger');
    });
});