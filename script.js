class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        if (this.items.length >= 6) {
            alert("Der Stack ist voll!")
            return true;
        }

        this.items.push(element);
        this.render();

        return false;
    }

    pop() {
        if (this.isEmpty()) {
            alert("Der Stack ist leer!");
            return;
        }
        this.items.pop();
        this.render();
    }

    top() {
        if (this.isEmpty()) {
            alert("Der Stack ist leer!");
            return;
        }
        alert("Top-Element: " + this.items[this.items.length - 1]);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isColor(strColor) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    }

    render() {
        const stackContainer = document.getElementById('stack-container');
        stackContainer.innerHTML = '';
        for (let i = 0; i < this.items.length; i++) {
            const container = document.createElement('div');
            container.classList.add('stack-element');
            container.style.bottom = `${i * 50}px`;
            container.style.backgroundColor = this.isColor(this.items[i]) ? this.items[i] : "grey";
            const label = document.createElement('span');
            label.textContent = this.items[i];
            container.appendChild(label);
            stackContainer.appendChild(container);
        }
    }
}

// Initialisierung
const stack = new Stack();

// Parser-Funktion
function parseCode(code) {
    const lines = code.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('stack.push')) {
            const color = line.match(/"([^"]+)"/)[1];
            let stackIsFull = stack.push(color);
            if (stackIsFull) { break; }
        } else if (line.startsWith('stack.pop')) {
            stack.pop();
        } else if (line.startsWith('stack.top')) {
            stack.top();
        } else if (line.startsWith('stack.isEmpty')) {
            alert(stack.isEmpty() ? "wahr" : "falsch")
        } else if (line.startsWith('Stack stack = new Stack()')) {
            // Neue Stack-Instanz, optional falls mehrere Stacks unterstützt werden sollen
        }
    }
}

// Event-Listener für den "Code Ausführen"-Button
document.getElementById('run-code').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;
    parseCode(code);
});
