let a;
let b;
let c;
let firstOperatorType;
let secondOperatorType;

const display = document.querySelector('.screen5');
const topDisplay = document.querySelector('.screen4');
const errorDisplay = document.querySelector('.screen1');
const numberKeys = document.querySelectorAll('.numeral');
const decimalKey = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');



const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


function clearButton() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false)
    });
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeB, false)
    });
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeNewB, false)
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFirstOperatorType, false);
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeSecondOperatorType, false);
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFinalOperatorType, false);
    });
    document.querySelector('.clear').addEventListener('click', clear, false);
}

function clear() {
    a = 0;
    b = 0;
    c = 0;
    firstOperatorType = '';
    secondOperatorType = '';
    display.textContent = '';
    topDisplay.textContent = '';
    errorDisplay.textContent = '';
    document.querySelector('.clear').removeEventListener('click', clear, false);
    clearButton();
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
        operator.addEventListener('click', storeFirstOperatorType, false);
    });
}

function storeFirstOperatorType() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false)
    });
    clearScreen();
    topDisplay.textContent = `${a} ${this.textContent}`;
    firstOperatorType = this.value;
    listenForB();
}

function listenForB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFirstOperatorType, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeB, false);
    });
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
        operator.addEventListener('click', storeSecondOperatorType, false);
    });
}

function storeSecondOperatorType() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeB, false);
    });
    secondOperatorType = this.value;
    if(firstOperatorType === 'add') {
        c = add(a, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
    }
    if(firstOperatorType === 'subtract') {
        c = subtract(a, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
    }
    if(firstOperatorType === 'multiply') {
        c = multiply(a, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
    }
    if(firstOperatorType === 'divide') {
        if(b !== 0) {
            c = divide(a, b);
            display.textContent = c;
            topDisplay.textContent = `${c} ${this.textContent}`;  
        } else {
            errorDisplay.textContent = 'ERROR';
        }

    }
    firstOperatorType = secondOperatorType;
    listenForNewB();
}

//-------------------SECOND OPERATION---------------------//

function listenForNewB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeSecondOperatorType, false);
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFinalOperatorType, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', clearScreenAndStopListening, {once:true});
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeNewB, false);
    });
}

function storeNewB() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        b = Number(display.textContent);
    }
    listenForFinalOperator();
}

function clearScreenAndStopListening() {
    clearScreen();
    numberKeys.forEach((key) => {
        key.removeEventListener('click', clearScreenAndStopListening, {once:true});
    });
}

function listenForFinalOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeFinalOperatorType, false);
    });
}

function storeFinalOperatorType() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeNewB, false);
    });
    topDisplay.textContent = this.value;
    secondOperatorType = this.value;
    if(firstOperatorType === 'add') {
        c = add(c, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
        listenForNewB();
    }
    if(firstOperatorType === 'subtract') {
        c = subtract(c, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
        listenForNewB();
    }
    if(firstOperatorType === 'multiply') {
        c = multiply(c, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
        listenForNewB();
    }
    if(firstOperatorType === 'divide') {
        c = divide(c, b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
        listenForNewB();
    }
    firstOperatorType = secondOperatorType;
}

clearButton();
listenForA();

