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

        return false;
    }

    pop() {
        if (this.isEmpty()) {
            alert("Der Stack ist leer!");
            return;
        }
        this.items.pop();
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

            // Neue Zeilen zum Anpassen der Textfarbe
            if (this.isColorLight(this.items[i])) {
              label.style.color = 'black';
            } else {
              label.style.color = 'white';
            }
            container.appendChild(label);
            stackContainer.appendChild(container);
        }
    }

    isColorLight(color) {
        // Erstellen eines temporären Elements, um die RGB-Werte zu erhalten
        const tempElem = document.createElement('div');
        tempElem.style.color = color;
        document.body.appendChild(tempElem);

        // Extrahieren der RGB-Werte
        const rgb = window.getComputedStyle(tempElem).color;
        document.body.removeChild(tempElem);

        const rgbValues = rgb.match(/\d+/g).map(Number);
        // Berechnung der Helligkeit anhand der RGB-Werte
        const brightness = Math.round(((parseInt(rgbValues[0]) * 299) +
            (parseInt(rgbValues[1]) * 587) +
            (parseInt(rgbValues[2]) * 114)) / 1000);
        // Rückgabe true, wenn die Farbe hell ist
        return brightness > 155;
    }
}

// Parser-Funktion
function parseCode(code) {
    const stack = new Stack();

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
    stack.render();
}

// Event-Listener für den "Code Ausführen"-Button
document.getElementById('run-code').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;
    parseCode(code);
});
