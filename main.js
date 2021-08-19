const topDisplay = document.querySelector('.display-top');
const currentDisplay = document.querySelector('.display-current');
const tempDisplay = document.querySelector('.display-temp');
const numbersElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operation');
const equalElement = document.querySelector('.equal');
const clearAll = document.querySelector('.all-clear');
const clearElement = document.querySelector('.element-clear');

let displayTopNum = '';
let displayCurrentNum = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersElement.forEach(number => {
    number.addEventListener('click', (event) => {
        //checking for dot in calculator
        if(event.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (event.target.innerText === '.' && haveDot) {
            return;
        }
        //don't click 0 first!
        if (event.target.innerText !== '0' || displayCurrentNum !== ''){
            displayCurrentNum += event.target.innerText;
            currentDisplay.innerText = displayCurrentNum;
        } else return;
    })
});

operationElement.forEach(operation => {
    operation.addEventListener('click', (event) => {
        //checking for some number to operate
        if(!displayCurrentNum) return;
        haveDot = false;
        const operationName = event.target.innerText;
        if(displayTopNum && displayCurrentNum && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(displayCurrentNum);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
});

//
function clearVar(name = '') {
    displayTopNum += displayCurrentNum + ' ' + name + ' ';
    topDisplay.innerText = displayTopNum;
    currentDisplay.innerText = '';
    displayCurrentNum = '';
    tempDisplay.innerText = result;
};

function mathOperation() {
    if(lastOperation === '×') {
        result = parseFloat(result) * parseFloat(displayCurrentNum);
    } else if(lastOperation === '+') {
        result = parseFloat(result) + parseFloat(displayCurrentNum);
    } else if(lastOperation === '-') {
        result = parseFloat(result) - parseFloat(displayCurrentNum);
    } else if(lastOperation === '/') {
        result = parseFloat(result) / parseFloat(displayCurrentNum);
    } else if(lastOperation === '%') {
        result = parseFloat(result) % parseFloat(displayCurrentNum);
    } 
};

equalElement.addEventListener('click', (event) => {
    if(!displayCurrentNum || !displayTopNum) return;
    haveDot = false;
    mathOperation();
    clearVar();
    currentDisplay.innerText = result;
    tempDisplay.innerText = '';
    displayCurrentNum = result;
    displayTopNum = '';
})
//  

clearAll.addEventListener('click', (event) => {
    topDisplay.innerText = '';
    currentDisplay.innerText = '0';
    displayTopNum = '';
    displayCurrentNum = '';
    result = '';
    tempDisplay.innerText = '';
});

clearElement.addEventListener('click', (event) => {
    currentDisplay.innerText = '';
    displayCurrentNum = '';
});

window.addEventListener('keydown', (event) => {
    if (
        event.key === '0' || 
        event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5' ||
        event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' ||
        event.key === ','
        ) {
            clickButtonElement(event.key);
        } else if(
            event.key === '-' ||
            event.key === '+' ||
            event.key === '/' ||
            event.key === '%'
        ) {
            clickOperationElement(event.key)
        } else if(event.key === '=' || event.key === 'Enter') {
            clickEqual(event.key)
        } else if(event.key === '*'){
            clickOperationElement('×')
        } else if(event.key === 'Backspace') {
            clickOperationElement('⌫')
        }
});

function clickButtonElement(key) {
    numbersElement.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
};

function clickOperationElement(key) {
    operationElement.forEach(button => {
        if(button.innerText === key) {
            button.click();
        } 
    })
};

function clickEqual() {
    equalElement.click();
};