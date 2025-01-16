
const grid = document.querySelector('#grid');
const cells = 16 * 16;

for (let i = 1; i <= cells; i++) {
    const gridCell = document.createElement('div');
    grid.appendChild(gridCell).classList.add('grid-cell');
}