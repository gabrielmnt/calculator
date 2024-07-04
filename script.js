let display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendCharacter(character) {
    if (display.value === 'Erro' && character){
        display.value = '';
    }
    display.value += character;
}

function handleKeyPress(event) {
    // Gets the pressed character
    let keyPressed = event.key;
    
    // Checks if the key pressed is Backspace
    if (keyPressed === 'Backspace') {
        clearDisplay();
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

        if (expression.includes('-')) {
            // subtract a percentage from a number
            let parts = expression.split('-');
            let number1 = parseFloat(parts[0]);
            let number2 = parseFloat(parts[1]);

            if (Number.isInteger(number2)) {
                // If the second number is an integer, convert it to an integer
                number2 = parseInt(parts[1]);
            }

            let result = number1 - number2;

            if (Number.isInteger(result)) {
                display.value = result; // Remove decimal places
            } else {
                display.value = result.toFixed(2); // Round to two decimal places
            }
        } else {
            // calculate a percentage of a number
            let result = eval(expression);
            if (isNaN(result)) {
                throw "Expressão inválida";
            }
            
            if (Number.isInteger(result)) {
                display.value = result; // Remove decimal places
            } else {
                display.value = result.toFixed(2); // Round to two decimal places
            }
        }
    } catch (error) {
        console.error(error); // Shows the error in the console
        display.value = 'Erro';
    }
}