
const numericKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operator');
const returnButton = document.querySelector('#return');

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

let currentInput = '';
let currentOperation = '';

let operands = []; // input collection

let actionDisabled = false;


// PROCESS INPUT

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        (!currentOperation && actionDisabled) ? resetCurrentState() : null;

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

        !currentOperation ? (operands[0] = +currentInput) : (operands[1] = +currentInput);

        actionDisabled = false; // return key is ON
    });
});

// PERFORM OPERATION

operationKeys.forEach(button => {
    button.addEventListener('click', function () {

        const getAction = this.innerText;

        if (operands.length > 1) {
            displayResult(); // proceed to calculation
            auxDisplay.innerText = operands[0] + " " + getAction;
        }
        else {
            if (currentInput && !actionDisabled) {
                auxDisplay.innerText = currentInput + " " + getAction;
            }
            else if (actionDisabled) {
                auxDisplay.innerText = operands[0] + " " + getAction; // continue after return
            }
            else {
                auxDisplay.innerText = auxDisplay.innerText.slice(0, -1) + " " + getAction; // update operator
            }
        }
        currentOperation = this.id;
        currentInput = ''; // prepare for next input
        actionDisabled = false; // return key is ON
    });
});

// CALCULATE RESULT

function calculateResult(operand1, operand2, operation) {

    switch(operation) {

        case 'add':
            return operand1 + operand2;

        case 'subtract':
            return operand1 - operand2;

        case 'multiply':
            return operand1 * operand2;

        case 'divide':
            return operand1 / operand2;
    }
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

    currentInput = '';
    currentOperation = '';
    operands.length = 0;
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
    actionDisabled = false;
}
document.querySelector('#clear').onclick = resetCurrentState;