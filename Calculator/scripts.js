
const numericKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operator');
const returnButton = document.querySelector('#return');

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

let currentInput = '0';
let currentOperation = '';

let operands = []; // input collection

let actionDisabled = false;
let isErrorThrown = false;


// PROCESS INPUT

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (isErrorThrown) {
            resetCurrentState(); isErrorThrown = false;
        }
        (!currentOperation && actionDisabled) ? resetCurrentState() : null;

        const getInput = this.innerText;

        if (this.id === 'zero' && currentInput === '0') {
            return; // prevent multiple zero input
        }
        if (this.id === 'decimal') {
            if (!currentInput) currentInput = '0'; // decimal point concatenation to initial zero
            if (currentInput.includes('.')) return; // prevent decimal point if it already exists
        }
        else if (currentInput === '0') currentInput = ''; // prevent numeric concatenation to initial zero

        currentInput += getInput;
        mainDisplay.innerText = currentInput;

        !currentOperation ? (operands[0] = +currentInput) : (operands[1] = +currentInput);

        actionDisabled = false; // return key is ON
    });
});

// PERFORM OPERATION

operationKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (isErrorThrown) {
            resetCurrentState(); isErrorThrown = false;
        }
        const getAction = this.innerText;

        if (operands.length > 1) {
            displayResult(); // proceed to calculation
            auxDisplay.innerText = operands[0] + " " + getAction; // apply result
        }
        else {
            if (currentInput && !actionDisabled) {
                auxDisplay.innerText = currentInput + " " + getAction; // apply input
            }
            else if (actionDisabled) {
                auxDisplay.innerText = operands[0] + " " + getAction; // apply output
            }
            else {
                auxDisplay.innerText = auxDisplay.innerText.slice(0, -1) + " " + getAction; // update operator
            }
        }
        currentOperation = this.id; // assign operation

        currentInput = ''; // prepare for next input
        actionDisabled = false; // return key is ON
    });
});

// CALCULATE RESULT

function calculateResult(operand1, operand2, operation) {

    !operand1 && operand2 ? (operand1 = 0) : null;

    let calculation; // expect floating point errors

    switch(operation) {

        case 'add':
            calculation = operand1 + operand2;
            break;

        case 'subtract':
            calculation = operand1 - operand2;
            break;

        case 'multiply':
            calculation = operand1 * operand2;
            break;

        case 'divide':
            operand2 !== 0 ? (calculation = operand1 / operand2) : throwError();
    }
    return parseFloat(Math.round(calculation + 'e' + 10) + 'e-' + 10); // fix floating point errors
}

function displayResult() {
    // replace previous operands with the calculation result
    operands = [calculateResult(operands[0], operands[1], currentOperation)];
    mainDisplay.innerText = operands[0];
}

// RETURN RESULT

returnButton.addEventListener('click', () => {

    if (!currentOperation || actionDisabled) return;

    if (operands.length > 1) {
        displayResult();
    }
    auxDisplay.innerText = "output";

    currentOperation = ''; // prepare for next operation
    actionDisabled = true; // return key is OFF
});

// CLEAR AND RESET

function resetCurrentState() {

    currentInput = '0';
    currentOperation = '';
    operands.length = 0;
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
    actionDisabled = false;
}
document.querySelector('#clear').onclick = resetCurrentState;

// THROW ERROR

function throwError() {
    mainDisplay.innerText = 'not allowed';
    auxDisplay.innerText = 'division by 0';
    isErrorThrown = true; // set for reset
    throw new Error('Division by zero is not allowed.');
}