
const gameButtons = [...document.querySelectorAll('.interface img')];
const gameTrigger = document.querySelector('#gameTrigger');
const modalDialog = document.querySelector('.modal-box');

let humanChoice; // not set until click
let computerChoice = Math.floor(Math.random() * gameButtons.length);

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

    computerChoice = gameButtons[computerChoice].id;
    displayChoice('#theirChoice strong', computerChoice);

    this.hidden = true;
    toggleHidden('#theirChoice', false);
    toggleHidden('.outcome', false);
});