const calculatorScreen = document.getElementById('calculator-screen');
const keys = document.querySelector('.calculator-keys');
let currentInput = '0';
let previousInput = '';
let operator = null;

function updateScreen(){
    calculatorScreen.value = currentInput;
}

keys.addEventListener('click', event =>{
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value){
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'all-clear':
            clearAll();
            break;
        case '.':
            inputDecimal();
            break;
        default:
            inputNumber(value);
    }

    updateScreen();
});

function handleOperator(nextOperator){
    const inputValue = parseFloat(currentInput);
    if (operator && previousInput !== '') {
        calculate();
    } else {
        previousInput = inputValue;
    }

    operator = nextOperator;
    currentInput = '0';
}

function calculate(){
    let result = 0;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === '+'){
        result = previous + current;
    } else if (operator === '-') {
        result = previous - current;
    } else if (operator === '*') {
        result = previous * current;
    } else if (operator === '/') {
        result = previous / current;
    }

    currentInput = result;
    operator = null;
    previousInput = '';
}

function clearAll(){
    currentInput = '0';
    previousInput = '';
    operator = null;
}

function inputNumber(number){
    if (currentInput === '0'){
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function inputDecimal(){
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}