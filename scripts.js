const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

function operate(sum, a, b) {
    if (sum === add) return add(a, b);
    if (sum === subtract) return subtract(a, b);
    if (sum === multiply) return multiply(a, b);
    if (sum === divide) return divide(a, b);
}

console.log(operate(add, 2, 5));