import DataStructure from "./dataStructure.js";

class Stack extends DataStructure {
    push(element) {
        if (this.items.length >= 6) {
            alert("Der Stapel ist voll!")
            return true;
        }

        this.items.push(element);

        return false;
    }

    pop() {
        if (this.isEmpty()) {
            alert("Der Stapel ist leer!");
            return;
        }
        this.items.pop();
    }

    top() {
        if (this.isEmpty()) {
            alert("Der Stapel ist leer!");
            return;
        }
        alert("Top-Element: " + this.items[this.items.length - 1]);
    }

    render() {
        const stackContainer = document.getElementById('stack-container');
        stackContainer.innerHTML = '';
        for (let i = 0; i < this.items.length; i++) {
            const container = document.createElement('div');
            let height = ((stackContainer.offsetHeight - 1) / 6) - 4;
            let color = this.getColor(this.items[i]);

            container.classList.add('stack-element');
            container.style.height = height + 'px';
            container.style.bottom = `${i * (height + 3)}px`;
            container.style.backgroundColor = color;
            container.style.opacity = "0.9";

            const label = document.createElement('span');
            label.style.lineHeight = height + 'px';
            label.textContent = this.items[i];
            label.style.color = this.isColorLight(color) ? 'black' : 'white';

            container.appendChild(label);
            stackContainer.appendChild(container);
        }
    }
}

export default Stack;
