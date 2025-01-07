
const gameButtons = [...document.querySelectorAll('.interface img')];

let humanChoice; // not set until click
let computerChoice = Math.floor(Math.random() * gameButtons.length);

gameButtons.forEach(function (thisButton) {
    thisButton.addEventListener('click', function () {
        this.classList.toggle('selected');
        humanChoice = this.id;
        displayHumanChoice();
    });
});

function displayHumanChoice() {
    document.querySelector('#yourChoice strong').innerHTML = humanChoice;
}
function displayComputerChoice() {
    document.querySelector('#theirChoice strong').innerHTML = gameButtons[computerChoice].id;
}

document.querySelector('#continue button').addEventListener('click', displayComputerChoice);