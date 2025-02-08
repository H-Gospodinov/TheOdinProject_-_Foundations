
const numericKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
const actionKeys = document.querySelectorAll('.action');

const percentageKey = document.querySelector('#percent');

const returnButton = document.querySelector('#return');
const resetButton = document.querySelector('#reset');
const editButton = document.querySelector('#edit');

const keyboardKeys = /^[0-9.+\-*/%=]|Backspace|Delete$/;
const emulation = [...numericKeys, ...operatorKeys, ...actionKeys];

const mainDisplay = document.querySelector('#main_display');
const auxDisplay = document.querySelector('#aux_display');

const updateMainDisplay = (newData) => {
    mainDisplay.innerText = newData;
}
const updateAuxDisplay = (newData) => {
    auxDisplay.innerText = newData;
}
let currentInput = '0';
let currentOperation = '';
let operands = [0];

let isPercentage = false;
let errorThrown = false;


// PROCESS INPUT

numericKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (errorThrown) {
            resetCurrentState();
        }
        const getInput = this.innerText;

        if (currentInput.includes('.') && this.id === 'decimal') return;

        if (currentInput !== '0' || this.id === 'decimal') {
            // concatenate input
            currentInput += getInput;
        }
        else {
            currentInput = getInput;
        }
        if (this.id === 'inverse') {
            if (!currentInput) {
                currentInput = (operands[0] * -1).toString();
            }
            else currentInput = (+currentInput * -1).toString();
        }
        if (!currentOperation) {
            updateAuxDisplay('input');
            operands[0] = +currentInput; // push first
        }
        else {
            operands[1] = +currentInput; // push second
        }
        if (mainDisplay.innerText === currentInput) {
            mainDisplay.classList.remove('blink');
            setTimeout(() => {mainDisplay.classList.add('blink')}, 0);
        }
        updateMainDisplay(currentInput);

        this.blur(); // remove focus
    });
});

// EREASE INPUT

editButton.addEventListener('click', () => {

    if (currentInput === '0' && operands.length) {
        currentInput = operands[0].toString();
    }
    if ((currentInput[0] !== '-' && currentInput.length > 1) || (currentInput[0] === '-' && currentInput.length > 2)) {
        currentInput = currentInput.slice(0, -1);
    }
    else currentInput = '0'; // last one

    !currentOperation ? (operands[0] = +currentInput) : (operands[1] = +currentInput);
    updateMainDisplay(currentInput);
});

// ASSIGN OPERATION

operatorKeys.forEach(button => {
    button.addEventListener('click', function () {

        if (errorThrown) {
            resetCurrentState(); return;
        }
        const getAction = this.innerText;

        if (operands.length > 1) {
            requestResult(); // prev operation id
        }
        currentOperation = this.id; // new operation id

        updateAuxDisplay(operands[0] + " " + getAction);
        currentInput = '0';

        this.blur(); // remove focus
    });
});

// CALCULATE RESULT

function calculateResult(operand1, operand2, operation) {

    let calculation; // prepare for floating point errors

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

function requestResult() {

    // replace previous operands with the calculation result

    operands = [calculateResult(operands[0], operands[1], currentOperation)];
    updateMainDisplay(operands[0]);
    return operands[0];
}

// RETURN RESULT

returnButton.addEventListener('click', () => {

    if (errorThrown) {
        resetCurrentState(); return;
    }
    if (operands.length > 1) {
        requestResult(); // proceed to calculation
    }
    else {
        if (currentInput.includes('.')) {
            currentInput = currentInput.replace(/0+$/, '');
            currentInput.at(-1) === '.' ? currentInput = currentInput.slice(0, -1) : null;
        }
        updateMainDisplay(operands[0]);
    } updateAuxDisplay('output');

    currentInput = '0';
    currentOperation = '';
    isPercentage = false;
});

// CLEAR AND RESET

function resetCurrentState() {

    currentInput = '0';
    currentOperation = '';
    operands = [0];
    mainDisplay.innerText = '0';
    auxDisplay.innerText = 'input';
    errorThrown = false;
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
    }
    else if (currentInput === '0' && operands[0] === 0) {
        mainDisplay.classList.remove('blink');
        setTimeout(() => {mainDisplay.classList.add('blink')}, 0);
    }
    else {
        resetCurrentState();
        alert('Calculate "what is x% of y" like this: \n x * y %');
    }
});

// KEYBOARD SUPPORT

document.addEventListener('keydown', (event) => {

    const emulateHover = (element) => {
        element.classList.add('hover');
        setTimeout(() => {element.classList.remove('hover')}, 150);
    }
    if (event.key.match(keyboardKeys)) {

        emulation.forEach(button => {
            if (button.getAttribute('data-key') === event.key) {
                button.click();
                emulateHover(button);
            }
        }); // excluding Enter
    }
    else if (event.key === 'Enter') {
        returnButton.click();
        emulateHover(returnButton);
    }
});