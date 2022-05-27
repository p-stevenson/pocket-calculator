let a = 0;
let b = 0;
let c = 0;
let firstOperator;
let secondOperator;

const display = document.querySelector('.screen5');
const topDisplay = document.querySelector('.screen4');
const decimalKey = document.querySelector('.decimal');
const equals = document.querySelector('.equals');
const numberKeys = document.querySelectorAll('.numeral');
const operators = document.querySelectorAll('.operator');

const operations = {
    'add':(a, b) => a + b,
    'subtract':(a, b) => a - b,
    'multiply':(a, b) => a * b,
    'divide':(a, b) => a / b,
}

function clearButton() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false)
        key.removeEventListener('click', storeB, false)
        key.removeEventListener('click', storeNextB, false)
    });
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeFirstOperator, false);
        operator.removeEventListener('click', storeSecondOperator, false);
        operator.removeEventListener('click', storeNextOperator, false);
    });
    document.querySelector('.clear').addEventListener('click', clear, false);
}

function clear() {
    a = 0;
    b = 0;
    c = 0;
    firstOperator = '';
    secondOperator = '';
    display.textContent = '';
    topDisplay.textContent = '';
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
        operator.addEventListener('click', storeFirstOperator, false);
    });
}

function storeFirstOperator() {
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
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeB, false);
    });
    secondOperator = this.value;
    const calculate = operations[firstOperator];
    if (firstOperator === 'divide' && b === 0) {
        display.textContent = 'ERROR';
    } else {
        c = calculate(a,b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;  
    }
    firstOperator = secondOperator;
    listenForNextB();
}

//-------------------SECOND OPERATION---------------------//

function listenForNextB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeSecondOperator, false);
        operator.removeEventListener('click', storeNextOperator, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', clearScreenAndStopListening, {once:true});
        key.addEventListener('click', storeNextB, false);
    });
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
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeNextB, false);
    });
    secondOperator = this.value;
    const calculate = operations[firstOperator];
    if (firstOperator === 'divide' && b === 0) {
        display.textContent = 'ERROR';
    } else {
        c = calculate(c,b);
        display.textContent = c;
        topDisplay.textContent = `${c} ${this.textContent}`;
        listenForNextB();  
    }
    firstOperator = secondOperator;
}

function listenForEquals(){
    equals.addEventListener('click', doEquals, false);
}

function doEquals() {
    topDisplay.textContent = 'equals';
}

clearButton();
listenForA();
listenForEquals();

