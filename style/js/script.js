const screen = document.getElementById('screen');
let resetScreen = false;

function appendNumber(number) {
    if (screen.value === '0' || resetScreen) {
        screen.value = number;
        resetScreen = false;
    } else {
        screen.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = screen.value.slice(-1);
    
    // Prevent adding multiple operators consecutively
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        screen.value = screen.value.slice(0, -1) + operator;
    } else {
        screen.value += operator;
    }
    resetScreen = false;
}

function appendDecimal(dot) {
    if (resetScreen) {
        screen.value = '0';
        resetScreen = false;
    }
    
    // Find the current number segment being typed
    const parts = screen.value.split(/[\+\-\*\/%]/);
    const currentNumber = parts[parts.length - 1];
    
    // Prevent multiple decimals in a single number
    if (!currentNumber.includes(dot)) {
        screen.value += dot;
    }
}

function clearScreen() {
    screen.value = '0';
}

function calculate() {
    try {
        // Evaluate the string expression safely
        // Using Function instead of eval for slight security/performance benefit in frontend snippets
        const result = new Function(`return ${screen.value}`)();
        
        if (result === undefined || isNaN(result)) {
            screen.value = 'Error';
        } else {
            // Fix long floats
            screen.value = Number(result.toFixed(8)).toString(); 
        }
    } catch (error) {
        screen.value = 'Error';
    }
    resetScreen = true;
}
