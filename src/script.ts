import Stack from './stack.js';
import Queue from './queue.js';

let isStackMode = true;
let editorLineMode = false;

const stack = new Stack();
const queue = new Queue();

const runButtontitles: string[] = [ // 0: mode 1: editor mode 2: button
    "Setze den Stapel zurück und führe den Code aus",
    "Setze die Sschlange zurück und führe den Code aus",
    "Setze den Stapel zurück und beginne mit der ersten Zeile",
    "Setze die Schlange zurück und beginne mit der ersten Zeile",
    "Führe den Code mit dem existierenden Inhalt des Stapels aus",
    "Führe den Code mit dem existierenden Inhalt der Schlange aus",
    "Führe die nächste Zeile mit dem Stapel aus",
    "Führe die nächste Zeile mit der Schlange aus"
]

async function parseCode(code: string, doReset: boolean) {
    if (doReset) {
        stack.items = [];
        queue.items = [];

        // Make stack/queue disappear for a moment so that it looks like a reset
        (isStackMode ? stack : queue).render();
        await new Promise(r => setTimeout(r, 100));
    }

    const lines = code.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (isStackMode) {
            // Stack Mode
            if (line.startsWith('s.push')) {
                const color = line.match(/"([^"]+)"/)![1];
                let stackIsFull = stack.push(color);
                if (stackIsFull) {
                    break;
                }
            } else if (line.startsWith('s.pop')) {
                stack.pop();
            } else if (line.startsWith('s.top')) {
                stack.top();
            } else if (line.startsWith('s.isEmpty')) {
                alert(stack.isEmpty() ? "wahr" : "falsch")
            } else if (line.startsWith('Stack stack = new Stack()')) {
                // New stack instance, do later
            }
            stack.render();
        } else {
            // Queue mode
            if (line.startsWith('q.enqueue')) {
                const color = line.match(/"([^"]+)"/)![1];
                queue.enqueue(color);
            } else if (line.startsWith('q.dequeue')) {
                queue.dequeue();
            } else if (line.startsWith('q.isEmpty')) {
                alert(queue.isEmpty() ? "wahr" : "falsch");
            } else if (line.startsWith('q.head')) {
                queue.head();
            }
            queue.render();
        }
    }
}

function clearAll() {
    (document.getElementById('code-input') as HTMLTextAreaElement).value = '';
    if (isStackMode) {
        stack.items = [];
        stack.render();
    } else {
        queue.items = [];
        queue.render();
    }

    (document.getElementById('line-input') as HTMLTextAreaElement).value = '';
    (document.getElementById('last-line') as HTMLSpanElement).textContent = '';
    (document.getElementById('ran-code') as HTMLSpanElement).textContent = '';
}

function updateEditorMode(lineMode: boolean) {
    editorLineMode = lineMode;
    const allEditor = document.getElementById("all-editor")! as HTMLDivElement;
    const lineEditor = document.getElementById("line-editor")! as HTMLDivElement;
    if (lineMode) {
        allEditor.classList.add('visually-hidden');
        lineEditor.classList.remove('visually-hidden');
    } else {
        allEditor.classList.remove('visually-hidden');
        lineEditor.classList.add('visually-hidden');
    }
    setTitles();
}

function runNextLine(reset: boolean = false) {
    if (editorLineMode) {
        const lineInput = document.getElementById('line-input') as HTMLTextAreaElement;
        const lastLine = document.getElementById('last-line') as HTMLSpanElement;
        const ranCode = document.getElementById('ran-code') as HTMLSpanElement;

        const lines = lineInput.value.split('\n');
        if (lines.length > 0 && lines[0].trim() !== '') {
            const line = lines[0];
            parseCode(line, reset);
            lineInput.value = lines.slice(1).join('\n');
            ranCode.innerHTML += lastLine.textContent;
            if (ranCode.innerHTML!.length > 0 && lastLine.textContent!.length > 0) {
                ranCode.innerHTML += '<br>';
            }
            lastLine.textContent = line;
        }
    }
}

function setReadOnlyCodeLine(code: string) {
    (document.querySelectorAll('.read-only-code-line') as NodeListOf<HTMLDivElement>).forEach(el => {
        el.innerHTML = code;
    });
}

function resetLineEditor() {
    const lineInput = document.getElementById('line-input') as HTMLTextAreaElement;
    const lastLine = document.getElementById('last-line') as HTMLSpanElement;
    const ranCode = document.getElementById('ran-code') as HTMLSpanElement;

    if (lastLine.textContent?.trim() ?? "" !== '') {
        lineInput.value = ranCode.innerHTML!.replace(/\<br\>/g, '\n').trim() + '\n' + lastLine.textContent + '\n' + lineInput.value;
        ranCode.textContent = '';
        lastLine.textContent = '';
        lineInput.value = lineInput.value.trim();
    }
}

function setTitles() {
    const resetRunCode = document.getElementById('reset-run-code')! as HTMLButtonElement;
    const runCode = document.getElementById('run-code')! as HTMLButtonElement;
    const clearAll = document.getElementById('clear-all')! as HTMLButtonElement;
    const clearStack = document.getElementById('clear-stack')! as HTMLButtonElement;
    const clearQueue = document.getElementById('clear-queue')! as HTMLButtonElement;

    const id = (!isStackMode ? 1 : 0) + (editorLineMode ? 2 : 0)
    resetRunCode.title = runButtontitles[id];
    runCode.title = runButtontitles[id + 4]

    clearAll.title = isStackMode ? "Setze den Stapel und den Code zurück" : "Setze die Schlange und den Code zurück";
    clearStack.title = "Setze den Stapel zurück";
    clearQueue.title = "Setze die Schlange zurück";
}

document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.querySelector('.mode-switcher')! as HTMLDivElement;
    const stackDisplay = document.getElementById('stack-display')! as HTMLDivElement;
    const queueDisplay = document.getElementById('queue-display')! as HTMLDivElement;

    const resetRunCode = document.getElementById('reset-run-code')! as HTMLButtonElement;
    const runCode = document.getElementById('run-code')! as HTMLButtonElement;

    clearAll();

    // event listener for "Run Code" button
    resetRunCode.addEventListener('click', async () => {
        if (editorLineMode) {
            resetLineEditor();
            runNextLine(true);
            
        } else {
            const code = (document.getElementById('code-input') as HTMLTextAreaElement).value;
            await parseCode(code, true);
        }
    });

    runCode.addEventListener('click', async () => {
        if (editorLineMode) {
            runNextLine();
        } else {
            const code = (document.getElementById('code-input') as HTMLTextAreaElement).value;
            await parseCode(code, false);
        }
    });

    document.getElementById('editor-mode-all')!.addEventListener('click', () => updateEditorMode(false));
    document.getElementById('editor-mode-line')!.addEventListener('click', () => updateEditorMode(true));

    updateEditorMode((document.getElementById('editor-mode-line')! as HTMLInputElement).checked)

    document.getElementById("clear-all")!.addEventListener('click', clearAll);

    document.getElementById("clear-stack")!.addEventListener('click', () => {
        stack.items = [];
        stack.render();
        if (editorLineMode) {
            resetLineEditor();
        }
    });

    document.getElementById("clear-queue")!.addEventListener('click', () => {
        queue.items = [];
        queue.render();
        if (editorLineMode) {
            resetLineEditor();
        }
    });

    // event listeners for mode switcher buttons
    document.querySelectorAll('.btn-mode').forEach(button => {
        button.addEventListener('click', () => {
            // Remove "active" class from all buttons
            document.querySelectorAll('.btn-mode').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if ((button as HTMLButtonElement).dataset.mode === 'stack') {
                switcher.style.setProperty('--switcher-position', '5px'); // Move to left
                switcher.style.setProperty('--switcher-width', '43%');
                isStackMode = true;

                setReadOnlyCodeLine('Stack&lt;String&gt; s = new Stack&lt;String&gt;();');
                queueDisplay.classList.add('display-none');
                stackDisplay.classList.remove('display-none');
                stack.render();
            } else {
                switcher.style.setProperty('--switcher-position', '47%'); // Move to right
                switcher.style.setProperty('--switcher-width', '50%');
                isStackMode = false;

                setReadOnlyCodeLine('Queue&lt;String&gt; q = new Queue&lt;String&gt;();');
                stackDisplay.classList.add('display-none');
                queueDisplay.classList.remove('display-none');
                queue.render();
            }
            setTitles();
        });
    });

    setTitles();
});
