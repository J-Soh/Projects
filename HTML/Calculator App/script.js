let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false; // True: reset display to 0 (=). False: Keep appending numbers. 

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && value !== '.') { 
        currentInput = value; // replace `0` with 1 - 9 and Arithmetic operators
    } else {
        currentInput += value; // Allow you to type `0.` instead of `.`
    }

    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function calculate() {
    try {
        let result = eval(currentInput);

        // return Error if result = non-normal numbers like Infinity, -Infinity, or NaN.
        if (!isFinite(result)) { 
            display.textContent = 'Error';
            currentInput = '0';
            shouldResetDisplay = true;
            return;
        }

        // fixes floating-point precision display issues (e.g. 0.1 + 0.2 ≈ 0.3000004)
        result = Math.round(result * 1000000) / 1000000;

        currentInput = result.toString();
        display.textContent = currentInput;
        shouldResetDisplay = true;

    } catch (error) {
        display.textContent = 'Error';
        currentInput = '0';
        shouldResetDisplay = true;
    }
}

// Allow keyboard input support
// keydown = runs every time a key is pressed
document.addEventListener('keydown', function(event) {
    const key = event.key; // event.key tells you which key was pressed

    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === '(') {
        appendToDisplay('(');
    } else if (key === ')') {
        appendToDisplay(')');
    } else if (key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }
});