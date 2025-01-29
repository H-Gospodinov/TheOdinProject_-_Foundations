
const numericKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operator');
const returnButton = document.querySelector('#return');

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

let currentInput = '';
let currentOperation = '';
let currentOutput = '';

let operands = []; // input collection
let operationDisabled = false;
let returnDisabled = false;

// PROCESS INPUT

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        (currentOutput && !currentOperation) ? resetCurrentState() : null;

        const getInput = this.innerText;

        if (this.id === 'zero') {
            if (!currentInput && !currentOperation) return;
        } // prevent initial zero input

        if (this.id === 'decimal') {
            if (!currentInput) currentInput = '0'; // decimal point concatenation to initial zero
            if (currentInput.includes('.')) return; // prevent decimal point if it already exists
        }
        else if (currentInput === '0') currentInput = ''; // prevent numeric concatenation to initial zero

        currentInput += getInput;
        mainDisplay.innerText = currentInput;

        operationDisabled = false; // re-enable operation keys
    });
});

// PERFORM OPERATION

operationKeys.forEach(button => {
    button.addEventListener('click', function () {

        (!operationDisabled && !currentOutput) ? operands.push(+currentInput) : null;

        currentInput = ''; // prepare for next input

        currentOperation = this.id;
        const getAction = this.innerText;

        if (currentOutput) {
            auxDisplay.innerText = currentOutput + " " + getAction;
        }
        else {
            mainDisplay.innerText = calculateResult();
            auxDisplay.innerText = calculateResult() + " " + getAction;
        }
        currentOutput = ''; // prepare for next operation

        operationDisabled = true; // disable opertion keys
        returnDisabled = false; // re-enable return key
    });
});

// CALCULATE RESULT

function calculateResult() {
    return operands.reduce((operand1, operand2) => {

        switch(true) {
            default:
                return operand1;

            case currentOperation === 'add':
                return operand1 + operand2;

            case currentOperation === 'subtract':
                return operand1 - operand2;

            case currentOperation === 'multiply':
                return operand1 * operand2;

            case currentOperation === 'divide':
                return operand1 / operand2;
        }
    });
}

// RETURN RESULT

returnButton.addEventListener('click', () => {

    if (!currentOperation) return;

    if (!returnDisabled) {
        if (currentInput) {
            auxDisplay.innerText += " " + currentInput + " " + '=' ;
            operands.push(+currentInput);
        }
        else {
            auxDisplay.innerText = 'output';
        }
        currentOutput = calculateResult();
        mainDisplay.innerText = currentOutput;
    }
    returnDisabled = true; // disable return key
    currentOperation = '';  // prepare for next operation
});

// CLEAR AND RESET

function resetCurrentState() {

    currentInput = '';
    currentOperation = '';
    currentOutput = '';
    operands.length = 0;
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
    operationDisabled = false;
    returnDisabled = false;
}
document.querySelector('#clear').onclick = resetCurrentState;