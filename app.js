function appendToDisplay(value) {
    let display = document.getElementById('display');
    let currentValue = display.value;

    // Impede inserir operadores consecutivos
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
        return;
    }

    // Impede adicionar múltiplos pontos
    if (value === '.' && currentValue.includes('.')) {
        return;
    }

    display.value += value;
}

function limparDisplay() {
    document.getElementById('display').value = '';
}

function calcularResultado() {
    let display = document.getElementById('display');
    let expression = display.value;

    // Garantir que a expressão não tenha erros e evitar `eval` com entradas inválidas
    try {
        // Substitui operadores inválidos, como "++", "()", e garante que a expressão seja válida
        if (/[^0-9+\-*/().]/.test(expression)) {
            throw new Error('Expressão inválida!');
        }

        display.value = eval(expression); // Calcula a expressão
    } catch (e) {
        alert('Expressão inválida!');
        limparDisplay();
    }
}

// Permitir o uso do teclado físico
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calcularResultado();
    } else if (event.key === 'Backspace') {
        limparDisplay();
    } else if (['+', '-', '*', '/', '.'].includes(event.key)) {
        appendToDisplay(event.key);
    }
});
