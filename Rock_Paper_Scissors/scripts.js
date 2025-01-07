
const gameButtons = [...document.querySelectorAll('.interface img')];
const gameTrigger = document.querySelector('#gameTrigger');

let humanChoice; // not set until click
let computerChoice = Math.floor(Math.random() * gameButtons.length);

function displayHumanChoice() {
    document.querySelector('#yourChoice strong').innerHTML = humanChoice;
}
function displayComputerChoice() {
    document.querySelector('#theirChoice strong').innerHTML = gameButtons[computerChoice].id;
}
function toggleHidden(element, state) {
    document.querySelector(element).hidden = state;
}

gameButtons.forEach(function (thisButton) {
    thisButton.addEventListener('click', function () {
        this.classList.toggle('selected');
        humanChoice = this.id;
        displayHumanChoice();
        toggleHidden('#gameTrigger', false);
        toggleHidden('#theirChoice', true);
    });
});

gameTrigger.addEventListener('click', function () {
    displayComputerChoice();
    this.hidden = true;
    toggleHidden('#theirChoice', false);
});
