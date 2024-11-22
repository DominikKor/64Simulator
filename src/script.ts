import Stack from './stack.js';
import Queue from './queue.js';

let isStackMode = true;
const stack = new Stack();
const queue = new Queue();

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

document.addEventListener('DOMContentLoaded', () => {
    const modeTitle = document.getElementById('mode-title')! as HTMLHeadingElement;
    const switcher = document.querySelector('.mode-switcher')! as HTMLDivElement;
    const stackDisplay = document.getElementById('stack-display')! as HTMLDivElement;
    const queueDisplay = document.getElementById('queue-display')! as HTMLDivElement;
    const readOnlyCodeLine = document.getElementById('read-only-code-line')! as HTMLDivElement;

    const stack = new Stack();
    const queue = new Queue();

    // event listener for "Run Code" button
    document.getElementById('reset-run-code')!.addEventListener('click', async () => {
        const code = (document.getElementById('code-input') as HTMLTextAreaElement).value;
        await parseCode(code, true);
    });

    document.getElementById('run-code')!.addEventListener('click', async () => {
        const code = (document.getElementById('code-input') as HTMLTextAreaElement).value;
        await parseCode(code, false);
    });

    document.getElementById('clear-code')!.addEventListener('click', () => {
        (document.getElementById('code-input') as HTMLTextAreaElement).value = '';
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

                modeTitle.textContent = 'STACK24 – Hier stack ich alles.';
                modeTitle.classList.add('stack')
                readOnlyCodeLine.innerHTML = 'Stack&lt;String&gt; s = new Stack&lt;String&gt;();';
                queueDisplay.classList.add('display-none');
                stackDisplay.classList.remove('display-none');
                stack.render();
            } else {
                switcher.style.setProperty('--switcher-position', '47%'); // Move to right
                switcher.style.setProperty('--switcher-width', '50%');
                isStackMode = false;

                modeTitle.textContent = 'Queue24';
                modeTitle.classList.remove('stack')
                readOnlyCodeLine.innerHTML = 'Queue&lt;String&gt; q = new Queue&lt;String&gt;();';
                stackDisplay.classList.add('display-none');
                queueDisplay.classList.remove('display-none');
                queue.render();
            }
        });
    });
});
