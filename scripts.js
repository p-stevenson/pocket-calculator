let a = null;
let b = null;
let c = null;
let firstOperator;
let secondOperator;

const display = document.querySelector('.screen5');
const topDisplay = document.querySelector('.screen4');
const errorDisplay = document.querySelector('.screen4');
const decimalKey = document.querySelector('.decimal');
const equals = document.querySelector('.equals');
const numberKeys = document.querySelectorAll('.numeral');
const operators = document.querySelectorAll('.operator');

const operations = {
    'add':(a, b) => a + b,
    'subtract':(a, b) => a - b,
    'multiply':(a, b) => a * b,
    'divide':(a, b) => a / b,
    // 'TAX-':(c) => c / 100 * 80,
    // 'TAX+':(c) => c / 100 * 120,
}

function clearButton() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false);
        key.removeEventListener('click', storeB, false);
        key.removeEventListener('click', storeNextB, false);
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeOperatorAfterEquals, false);
        operator.removeEventListener('click', storeFirstOperator, false);
        operator.removeEventListener('click', storeSecondOperator, false);
        operator.removeEventListener('click', storeNextOperator, false);
    });
    document.querySelector('.clear').addEventListener('click', clear, false);
}

function clear() {
    a = null;
    b = null;
    c = null;
    firstOperator = '';
    secondOperator = '';
    display.textContent = '';
    topDisplay.textContent = '';
    errorDisplay.textContent = '';
    document.querySelector('.clear').removeEventListener('click', clear, false);
    clearButton();
    listenForDecimal();
    listenForA();
}

function clearScreen() {
    display.textContent = '';
}

//-------------------FIRST OPERATION---------------------//
function listenForA() {
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeA, false);
    });
}

function storeA() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        a = Number(display.textContent);
    }
    listenForFirstOperator();
}

function listenForFirstOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeFirstOperator, false);
    });
}

function storeFirstOperator() {
    decimalKey.removeEventListener('click', displayDecimal, false);
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false)
    });
    clearScreen();
    topDisplay.textContent = `${a} ${this.textContent}`;
    firstOperator = this.value;
    listenForB();
}

function listenForB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFirstOperator, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeB, false);
    });
    listenForDecimal();
}

function storeB() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        b = Number(display.textContent);
    }
    listenForSecondOperator();
}

function listenForSecondOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeSecondOperator, false);
    });
}

function storeSecondOperator() {
    decimalKey.removeEventListener('click', displayDecimal, false);
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeB, false);
    });
    if (firstOperator === 'divide' && b === 0) {
        display.textContent = 'ERROR';
    } else {
        secondOperator = this.value;
        const calculate = operations[firstOperator];
        c = calculate(a,b);
        topDisplay.textContent = `${parseFloat(c.toFixed(4))} ${this.textContent}`;  
        displayResult();
        firstOperator = secondOperator;
    }
    listenForNextB();
}

//-------------------SECOND OPERATION---------------------//

function listenForNextB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeSecondOperator, false);
        operator.removeEventListener('click', storeNextOperator, false);
        operator.removeEventListener('click', storeOperatorAfterEquals, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', clearScreenAndStopListening, {once:true});
        key.addEventListener('click', storeNextB, false);
    });
    listenForDecimal();
}

function storeNextB() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        b = Number(display.textContent);
    }
    listenForNextOperator();
}

function clearScreenAndStopListening() {
    clearScreen();
    numberKeys.forEach((key) => {
        key.removeEventListener('click', clearScreenAndStopListening, {once:true});
    });
}

function listenForNextOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeNextOperator, false);
    });
}

function storeNextOperator() {
    decimalKey.removeEventListener('click', displayDecimal, false);
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeNextB, false);
    });
    if (firstOperator === 'divide' && b === 0) {
        display.textContent = 'ERROR';
    }
    else {
        secondOperator = this.value;
        const calculate = operations[firstOperator];
        c = calculate(c,b);
        topDisplay.textContent = `${parseFloat(c.toFixed(4))} ${this.textContent}`;
        displayResult();
        firstOperator = secondOperator;
        listenForNextB();  
    }
}

//------------------- EQUALS ---------------------//
// the listenForOperator and storeOperator functions 
// below are a temporary fix to avoid calling the previous 
// storeOperation functions, without it attempting 
// a new calculation after calling doEquals for the 
// second time results in a double calculation.

function listenForOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeOperatorAfterEquals, false);
    });
}

function storeOperatorAfterEquals() {
    firstOperator = this.value;
    topDisplay.textContent = `${parseFloat(c.toFixed(4))} ${this.textContent}`;
    decimalKey.removeEventListener('click', displayDecimal, false);
    listenForNextB();
}

function listenForEquals(){
    equals.addEventListener('click', doEquals, false);
}

function doEquals() {
    if(b === null) {
        errorDisplay.textContent = 'ERROR';
        numberKeys.forEach((key) => {
            key.removeEventListener('click', storeA, false);
            key.removeEventListener('click', storeB, false);
        });
        operators.forEach((operator) => {
            operator.removeEventListener('click', storeFirstOperator, false);
        });
        decimalKey.removeEventListener('click', displayDecimal, false);
    } else if (c === null) {
        const calculate = operations[firstOperator];
        c = calculate(a,b);
        topDisplay.textContent = `${parseFloat(c.toFixed(4))} ${this.textContent}`;
        displayResult();
        numberKeys.forEach((key) => {
            key.removeEventListener('click', storeA, false);
            key.removeEventListener('click', storeB, false);
        });
        decimalKey.removeEventListener('click', displayDecimal, false);
    } else {
        const calculate = operations[firstOperator];
        c = calculate(c,b);
        a = c;
        b = 0;
        topDisplay.textContent = `${parseFloat(c.toFixed(4))} ${this.textContent}`;
        displayResult();
        operators.forEach((operator) => {
            operator.removeEventListener('click', storeNextOperator, false);
        });
        numberKeys.forEach((key) => {
            key.removeEventListener('click', storeA, false);
            key.removeEventListener('click', storeB, false);
            key.removeEventListener('click', storeNextB, false);
        });
        decimalKey.removeEventListener('click', displayDecimal, false);
        listenForOperator();
    }
}

//------------------- DECIMALS ---------------------//
function listenForDecimal() {
    decimalKey.addEventListener('click', displayDecimal, {once:true});
}

function displayDecimal() {
    if(display.textContent.length < 9){
        display.textContent += this.value;
    }
}

function displayResult() {
    display.textContent = parseFloat(c.toFixed(4));
    if(display.textContent.length > 10) {
        clearScreen();
        errorDisplay.textContent = 'ERROR';
    }
}

//------------------- KEYBOARD INPUT ---------------------//
window.addEventListener('keydown', onKeyPress, false);

function onKeyPress(e) {
    e.preventDefault();
    document.querySelector(`button[data-key="${e.keyCode}"]`).click();
}

clearButton();
listenForA();
listenForEquals();
listenForDecimal();