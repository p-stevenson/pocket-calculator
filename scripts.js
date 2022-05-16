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


const numberKeys = document.querySelectorAll('.numeral');
numberKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const displayValue = document.querySelector('.screen5').textContent;
        if(displayValue.length < 9) {
            document.querySelector('.screen5').textContent += key.value;
        }
        console.log(displayValue.length);
    }, false);
});


const decimalKey = document.querySelector('.decimal');
    decimalKey.addEventListener('click', () => {
        document.querySelector('.screen5').textContent += decimalKey.value;
    }, { once: true }); 

