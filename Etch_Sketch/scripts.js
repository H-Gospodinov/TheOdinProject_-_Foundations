
const grid = document.querySelector('#grid');
const resizeGrid = document.querySelector('#resetSize');
const setGridTxt = 'Set the number of either horizontal or vertical cells. \nMaximum allowed is 64.';
const randomColor = () => Math.floor(Math.random()*16777215).toString(16); // HEX
const resetColor = document.querySelector('#resetColor');

let gridSize = 16; // default grid size is 16 x 16 cells

function createCells(number, size) {

    for (let i = 1; i <= number; i++) {

        const gridCell = document.createElement('div');

        gridCell.classList.add('grid-cell');
        grid.appendChild(gridCell);
    }
    grid.style.setProperty('--cell-size', size +'%');
}
createCells(gridSize ** 2, 100 / gridSize);

function reCreateCells(newSize) {

    grid.replaceChildren(); // remove existing cells
    gridSize = newSize; // set new size
    createCells(gridSize ** 2, 100 / gridSize);
}

function userInput(input) {
    if (input == null) {
        return; // prompt cancelled
    }
    else if (!+input || input < 2 || input > 64) {
        alert('Please enter a number between 2 and 64');
        userInput(prompt(setGridTxt));
    }
    else {
        reCreateCells(parseInt(input));
    }
}
resizeGrid.addEventListener('click', () => {

    userInput(prompt(setGridTxt));
});

grid.addEventListener('mouseover', (event) => {

    event.target.style.setProperty('background-color', '#'+randomColor());
});

grid.addEventListener('touchmove', (event) => {

    const touch = event.touches[0]; // get the touch object
    const touchCell = document.elementFromPoint(touch.clientX, touch.clientY); // get the DOM element

    if (touchCell && touchCell.className == 'grid-cell') {
        touchCell.style.setProperty('background-color', '#'+randomColor());
    }
});

resetColor.addEventListener('click', () => {
    [...grid.children].forEach(element => {
        element.removeAttribute('style');
    });
});