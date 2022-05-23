let a;
let b;
let result;
let operatorType;

const display = document.querySelector('.screen5');
const numberKeys = document.querySelectorAll('.numeral');
const decimalKey = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


function clearButton() {
    document.querySelector('.clear').addEventListener('click', clear, false);
}

function clear() {
    a = '';
    b = '';
    result = 0;
    operatorType = '';
    display.textContent = '';
}

function clearScreen() {
    display.textContent = '';
}


function listenForA() {
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeA, false);
    });
}

function listenForB() {
    operators.forEach((operator) => {
        operator.removeEventListener('click', storeOperatorType, false);
    });
    numberKeys.forEach((key) => {
        key.addEventListener('click', storeB, false);
    });
}

function storeA() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        a = Number(display.textContent);
    }
    listenForOperator();
    listenForEquals();
}

function storeB() {
    if(display.textContent.length < 9) {
        display.textContent += this.value;
        b = Number(display.textContent);
    }
    listenForOperator();
    listenForEquals();
}

function listenForOperator() {
    operators.forEach((operator) => {
        operator.addEventListener('click', storeOperatorType, false);
    });
}

function storeOperatorType() {
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeA, false)
    });
    numberKeys.forEach((key) => {
        key.removeEventListener('click', storeB, false)
    });
    operatorType = this.value;
    clearScreen();
    if (b === "" || b ==='0'){
        listenForB();
    } else {
        operate();
    }
}

function operate() {
    if (operatorType === 'add') {
        result = add(a,b);
        a = result;
        b = '';
        display.textContent = result;
        listenForOperator();
    }
    if (operatorType === 'subtract') {
        result = subtract(a, b);
        a = result;
        b = '';
        display.textContent = result;
        listenForOperator();
    }
    if (operatorType === multiply) return multiply(a, b);
    if (operatorType === divide) return divide(a, b);
}

function listenForEquals() {
    equals.addEventListener('click', equalsOperation, false);
}

function equalsOperation() {
    if (b === '' || b === '0') {
        display.textContent = 'empty';
    } else if (operatorType === 'add') {
        result = add(a, b);
        a = result;
        display.textContent = result;
        listenForOperator();
    } else if (operatorType === 'subtract') {
        result = subtract(a, b);
        a = result;
        display.textContent = result;
        listenForOperator();
    }
}


/* 
Notes: 
*/

clear();
clearButton();
listenForA();

