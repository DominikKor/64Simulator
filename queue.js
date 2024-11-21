import DataStructure from "./dataStructure.js";

class Queue extends DataStructure {
    enqueue(element) {
        if (this.items.length >= 6) {
            alert("Der Stack ist voll!")
            return true;
        }

        this.items.push(element);
        this.render();
    }

    dequeue() {
        if (this.isEmpty()) {
            alert("Die Queue ist leer!");
            return;
        }
        this.items.shift();
        this.render();
    }

    head() {
        if (this.isEmpty()) {
            alert("Die Queue ist leer!");
            return;
        }
        alert("Front-Element: " + this.items[0]);
    }

    render() {
        const queueContainer = document.getElementById('queue-container');
        queueContainer.innerHTML = '';
        for (let i = 0; i < this.items.length; i++) {
            const container = document.createElement('div');
            let width = ((queueContainer.offsetWidth - 1) / 6) - 4;
            let color = this.getColor(this.items[i]);

            container.classList.add('queue-element');
            container.style.width = width + 'px';
            container.style.left = `${i * (width + 3)}px`;
            container.style.backgroundColor = color;
            container.style.opacity = "0.9";

            const label = document.createElement('span');
            label.style.lineHeight = `${queueContainer.offsetHeight - 12}px`;
            label.textContent = this.items[i];
            label.style.color = this.isColorLight(color) ? 'black' : 'white';

            container.appendChild(label);
            queueContainer.appendChild(container);
        }
    }
}

export default Queue;
