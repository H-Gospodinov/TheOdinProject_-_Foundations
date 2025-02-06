
const numericKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
const percentageKey = document.querySelector('#percent');
const returnButton = document.querySelector('#return');
const resetButton = document.querySelector('#reset');
const editButton = document.querySelector('#edit');

const keyboardKeys = /^[0-9.+\-*/]$/;
const emulatorKeys = [...numericKeys, ...operatorKeys];

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

let currentInput = '0';
let currentOperation = '';
let currentOutput = false;

let operands = [0]; // input collection
let isPercentage = false;
let errorThrown = false;


// PROCESS INPUT

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (errorThrown) {
            resetCurrentState(); errorThrown = false;
        }
        else if (this.id !== 'inverse' && currentOutput && !currentOperation) {
            resetCurrentState(); // start over
        }
        const getInput = this.innerText;

        if (this.id === 'decimal') {

            if (currentInput.includes('.')) return; // prevent decimal point if it already exists
            if (currentInput === '') currentInput = '0'; // decimal concatenation to initial zero
        }
        else if (currentInput === '0') currentInput = ''; // numeric concatenation to initial zero

        if (this.id === 'inverse') {

            if (!currentInput && currentOutput) {
                operands[0] = -operands[0]; // invert output
                mainDisplay.innerText = operands[0];
                return; // preserve output
            }
            else if (!currentInput && currentOperation) {
                currentInput = (operands[0] * -1).toString(); // invert current
            }
            else currentInput = (+currentInput * -1).toString() // invert input
        }
        else currentInput += getInput; // concatenate input

        if (mainDisplay.innerText === currentInput) {
            mainDisplay.classList.remove('blink');
            setTimeout(() => {mainDisplay.classList.add('blink')}, 0); // blink once
        }
        mainDisplay.innerText = currentInput;

        !currentOperation ? (operands[0] = +currentInput) : (operands[1] = +currentInput);

        currentOutput = false; // prepare for next output
        this.blur(); // remove focus
    });
});

// DELETE INPUT

editButton.addEventListener('click', () => {

    currentOutput ? currentInput = operands[0].toString() : null;

    if (currentOperation) {
        operands.length === 1 ? currentInput = operands[0].toString() : null;
        operands.length === 2 ? currentInput = operands[1].toString() : null;
    }
    if ((currentInput[0] !== '-' && currentInput.length > 1) || (currentInput[0] === '-' && currentInput.length > 2)) {
        currentInput = currentInput.slice(0, -1);
    }
    else currentInput = '0'; // last one

    mainDisplay.innerText = currentInput;
    !currentOperation ? (operands[0] = +currentInput) : (operands[1] = +currentInput);
});

// PERFORM OPERATION

operatorKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (errorThrown) {
            resetCurrentState(); errorThrown = false;
        }
        const getAction = this.innerText;

        if (operands.length > 1) {
            displayResult(); // proceed to calculation
            auxDisplay.innerText = operands[0] + " " + getAction; // apply result
        }
        else {
            if (currentInput && !currentOutput) {
                auxDisplay.innerText = currentInput + " " + getAction; // apply input
            }
            else if (currentOutput) {
                auxDisplay.innerText = operands[0] + " " + getAction; // apply output
            }
            else {
                auxDisplay.innerText = auxDisplay.innerText.slice(0, -1) + " " + getAction; // update operator
            }
        }
        currentOperation = this.id; // assign operation

        currentInput = ''; // prepare for next input
        currentOutput = false; // prepare for next output
        this.blur(); // remove focus
    });
});

// CALCULATE RESULT

function calculateResult(operand1, operand2, operation) {

    !operand1 && operand2 ? (operand1 = 0) : null;

    let calculation; // expect floating point errors

    switch (operation) {

        case 'add':
            calculation = operand1 + operand2;
            break;

        case 'subtract':
            calculation = operand1 - operand2;
            break;

        case 'multiply':
            isPercentage ? calculation = (operand1 * operand2) / 100 : calculation = operand1 * operand2;
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

    if (currentOutput) return; // prevent multiple returns

    if (operands.length > 1) {
        displayResult(); // proceed to calculation
    }
    else {
        currentInput.includes('.') ? currentInput = currentInput.replace(/0+$/, '') : null; // prevent decimal zero ending
        currentInput.at(-1) === '.' ? currentInput = currentInput.slice(0, -1) : null; // prevent dot ending
        !currentOperation ? mainDisplay.innerText = currentInput : null;
    }
    auxDisplay.innerText = "output";

    currentInput = ''; // prepare for next input
    currentOperation = ''; // prepare for next operation
    currentOutput = true; // prepare for next action (any)
    isPercentage = false; // preprare for next percentage
});

// CLEAR AND RESET

function resetCurrentState() {

    currentInput = '0';
    currentOperation = '';
    currentOutput = false;
    operands = [0]; //
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
    resetButton.blur();
}
resetButton.onclick = resetCurrentState;

// THROW ERROR

function throwError() {

    mainDisplay.innerText = 'not allowed';
    auxDisplay.innerText = 'division by 0';
    errorThrown = true; // prepare for reset
    throw new Error('Division by zero is not allowed.');
}

// PERCENTAGES

percentageKey.addEventListener('click', () => {

    if (operands.length > 1 && currentOperation === 'multiply') {
        isPercentage = true;
        returnButton.click();
    } else {
        resetCurrentState();
        alert('Calculate percentages like this: \n x * y %');
    }
});

// KEYBOARD SUPPORT

document.addEventListener('keydown', (event) => {

    const emulateHover = (element) => {
        element.classList.add('hover');
        setTimeout(() => {element.classList.remove('hover')}, 150);
    }
    if (event.key.match(keyboardKeys)) {

        emulatorKeys.forEach(button => {
            if (button.getAttribute('data-key') === event.key) {
                button.click();
                emulateHover(button);
            }
        }); // numeric & operator
    }
    switch (event.key) {
        case '%':
            percentageKey.click();
            emulateHover(percentageKey);
            break;

        case 'Enter': case '=':
            returnButton.click();
            emulateHover(returnButton);
            break;

        case 'Delete':
            resetButton.click();
            emulateHover(resetButton);
            break;

        case 'Backspace':
            editButton.click();
            emulateHover(editButton);
    }
});