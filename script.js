let display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendCharacter(character) {
    if (display.value === 'Erro' && character) {
        display.value = '';
    }
    display.value += character;
}

function handleKeyPress(event) {
    // Gets the pressed character
    let keyPressed = event.key;
    
    // Checks if the key pressed is Backspace
    if (keyPressed === 'Backspace') {
        deleteLast();
    } else if (!isNaN(keyPressed) || ['%', '/', '*', '-', '+', '.', '='].includes(keyPressed)) {
        appendCharacter(keyPressed);
    }
}

function handleEnterPress(event) {
    // Checks if the key pressed is "Enter"
    if (event.key === 'Enter') {
        calculateResult();
    }
}

// add keyboard event checking in document
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keydown', handleEnterPress);

function calculateResult() {
    try {
        // Gets the mathematical expression from the display
        let expression = display.value;

        // Handle percentage calculations
        if (expression.includes('%')) {
            expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
                return `(${number} / 100)`;
            });

            // Apply the percentage to the previous number if any
            expression = expression.replace(/(\d+(\.\d+)?)([+\-*/])\((\d+(\.\d+)?) \/ 100\)/g, (match, num1, _, operator, num2) => {
                return `(${num1} ${operator} (${num1} * ${num2} / 100))`;
            });
        }

        let result = eval(expression);

        if (isNaN(result)) {
            throw "Expressão inválida";
        }
        
        if (Number.isInteger(result)) {
            display.value = result; // Remove decimal places
        } else {
            display.value = result.toFixed(2); // Round to two decimal places
        }
    } catch (error) {
        console.error(error); // Shows the error in the console
        display.value = 'Erro';
    }
}
