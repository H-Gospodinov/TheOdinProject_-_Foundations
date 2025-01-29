
const numericKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operator');
const returnButton = document.querySelector('#return');

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

let currentInput = '';
let currentOperation = '';

// display numeric input

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        const getInput = this.innerText;

        if (this.id === 'zero') {
            if (!currentInput && !currentOperation) return;
        } // prevent initial zero input

        if (this.id === 'decimal') {
            if (!currentInput) currentInput = '0'; // prepare decimal point concatenation
            if (currentInput.includes('.')) return; // prevent decimal point if it already exists
        }
        else if (currentInput === '0') currentInput = ''; // prevent numeric concatenation to initial zero

        currentInput += getInput;
        mainDisplay.innerText = currentInput;
        currentOperation = ''; // prepare for next operation
    });
});

// display selected operation

operationKeys.forEach(button => {
    button.addEventListener('click', function () {

        const getAction = this.innerText;
        if (!currentOperation) { // no current operation pending
            currentOperation = this.id;
            auxDisplay.innerText = currentInput + " " + getAction;
        }
        currentInput = ''; // prepare for next input
    });
});

// clear input and operation

document.querySelector('#clear').addEventListener('click', () => {
    currentInput = '';
    currentOperation = ''
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
});