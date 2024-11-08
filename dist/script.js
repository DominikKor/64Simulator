function getLineHeight(el) {
    var temp = document.createElement(el.nodeName), ret;
    temp.setAttribute("style", "margin:0; padding:0; "
        + "font-family:" + (el.style.fontFamily || "inherit") + "; "
        + "font-size:" + (el.style.fontSize || "inherit"));
    temp.innerHTML = "A";
    el.parentNode.appendChild(temp);
    ret = temp.clientHeight;
    temp.parentNode.removeChild(temp);
    return ret;
}
class Stack {
    items = [];
    constructor() {
        this.items = [];
    }
    push(element) {
        if (this.items.length >= 6) {
            alert("Der Stack ist voll!");
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
    render(stackContainer) {
        stackContainer.innerHTML = '';
        for (let i = 0; i < this.items.length; i++) {
            const container = document.createElement('div');
            container.classList.add('stack-element');
            container.style.backgroundColor = this.isColor(this.items[i]) ? this.items[i] : "grey";
            const label = document.createElement('span');
            label.textContent = this.items[i];
            if (this.isColorLight(this.items[i])) {
                label.style.color = 'black';
            }
            else {
                label.style.color = 'white';
            }
            container.appendChild(label);
            stackContainer.appendChild(container);
        }
    }
    isColorLight(color) {
        const tempElem = document.createElement('div');
        tempElem.style.color = color;
        document.body.appendChild(tempElem);
        const rgb = window.getComputedStyle(tempElem).color;
        document.body.removeChild(tempElem);
        const rgbValues = rgb.match(/\d+/g).map(Number);
        const brightness = Math.round(((rgbValues[0] * 299) +
            (rgbValues[1] * 587) +
            (rgbValues[2] * 114)) / 1000);
        return brightness > 155;
    }
}
let stacks = {};
let activeLine = -1;
const codeInput = document.getElementById('code-input');
const highlight = document.getElementById('code-highlight');
function highlightActiveLine() {
    const lineHeight = parseInt(window.getComputedStyle(codeInput).lineHeight);
    const paddingTop = parseInt(window.getComputedStyle(codeInput).paddingTop);
    let top = paddingTop + codeInput.offsetTop + 2;
    if (activeLine >= 0) {
        if (codeInput.offsetHeight <= (activeLine + 1.5) * lineHeight)
            highlight.style.opacity = "0";
        else
            highlight.style.opacity = "1";
        highlight.style.top = `${activeLine * lineHeight + top}px`;
        highlight.style.height = `${lineHeight}px`;
        highlight.style.width = `${codeInput.offsetWidth}px`;
    }
    else {
        highlight.style.opacity = "0";
    }
}
function renderStacks() {
    const stackContainer = document.getElementById("stack-container");
    stackContainer.innerHTML = "";
    for (const [name, stack] of Object.entries(stacks)) {
        const stackE = document.createElement("div");
        stackE.classList.add("stack");
        const stackElements = document.createElement("div");
        stackElements.classList.add("stack-elements");
        stackE.appendChild(stackElements);
        stack.render(stackElements);
        const stackLabel = document.createElement("span");
        stackLabel.classList.add("stack-label");
        stackLabel.innerHTML = name;
        stackE.appendChild(stackLabel);
        stackContainer.appendChild(stackE);
    }
}
function parseCode(codeline) {
    console.log(codeline);
    let line = codeline.trim();
    let m;
    if ((m = line.match(/([A-Za-z0-9äÄöÖüÜ_]+)\.push\("([A-Za-z0-9äÄöÖüÜ_#]+)"\);/)) != null) {
        if (m[1] in stacks) {
            stacks[m[1]].push(m[2]);
        }
        else {
            alert(`Stapel ${m[1]} existiert nicht`);
        }
    }
    else if ((m = line.match(/([A-Za-z0-9äÄöÖüÜ_]+)\.pop\(\);/)) != null) {
        if (m[1] in stacks) {
            stacks[m[1]].pop();
        }
        else {
            alert(`Stapel ${m[1]} existiert nicht`);
        }
    }
    else if ((m = line.match(/([A-Za-z0-9äÄöÖüÜ_]+)\.top\(\);/)) != null) {
        if (m[1] in stacks) {
            stacks[m[1]].top();
        }
        else {
            alert(`Stapel ${m[1]} existiert nicht`);
        }
    }
    else if ((m = line.match(/([A-Za-z0-9äÄöÖüÜ_]+)\.isEmpty\(\);/)) != null) {
        if (m[1] in stacks) {
            alert(stacks[m[1]].isEmpty() ? `Stapel ${m[1]} ist leer` : `Stapel ${m[1]} ist nicht leer`);
        }
        else {
            alert(`Stapel ${m[1]} existiert nicht`);
        }
    }
    else if ((m = line.match(/Stack(?:<(?:[A-Z][a-zA-Z0-9_]*)?>)? *([A-Za-z0-9äÄöÖüÜ_]+) *= *new *Stack(?:<(?:[A-Z][a-zA-Z0-9_]*)?>)?\(\);/)) != null) {
        if (!(m[1] in stacks)) {
            console.log(m);
            stacks[m[1]] = new Stack();
        }
        else {
            alert(`Stapel ${m[1]} existiert bereits`);
        }
    }
    renderStacks();
}
codeInput.addEventListener('input', highlightActiveLine);
new ResizeObserver(highlightActiveLine).observe(codeInput);
window.addEventListener('resize', highlightActiveLine);
window.addEventListener('DOMContentLoaded', highlightActiveLine);
document.getElementById('run-code').addEventListener('click', () => {
    stacks = {};
    activeLine = -1;
    highlightActiveLine();
    const code = codeInput.value;
    const lines = code.split('\n');
    for (let line of lines)
        parseCode(line);
});
document.getElementById('reset').addEventListener('click', () => {
    codeInput.value = "";
    stacks = {};
    renderStacks();
    activeLine = -1;
    highlightActiveLine();
});
//# sourceMappingURL=script.js.map