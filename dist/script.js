var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Stack from './stack.js';
import Queue from './queue.js';
var isStackMode = true;
var stack = new Stack();
var queue = new Queue();
function parseCode(code, doReset) {
    return __awaiter(this, void 0, void 0, function () {
        var lines, _i, lines_1, line, color, stackIsFull, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!doReset) return [3 /*break*/, 2];
                    stack.items = [];
                    queue.items = [];
                    // Make stack/queue disappear for a moment so that it looks like a reset
                    (isStackMode ? stack : queue).render();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    lines = code.split('\n');
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        line = line.trim();
                        if (isStackMode) {
                            // Stack Mode
                            if (line.startsWith('s.push')) {
                                color = line.match(/"([^"]+)"/)[1];
                                stackIsFull = stack.push(color);
                                if (stackIsFull) {
                                    break;
                                }
                            }
                            else if (line.startsWith('s.pop')) {
                                stack.pop();
                            }
                            else if (line.startsWith('s.top')) {
                                stack.top();
                            }
                            else if (line.startsWith('s.isEmpty')) {
                                alert(stack.isEmpty() ? "wahr" : "falsch");
                            }
                            else if (line.startsWith('Stack stack = new Stack()')) {
                                // New stack instance, do later
                            }
                            stack.render();
                        }
                        else {
                            // Queue mode
                            if (line.startsWith('q.enqueue')) {
                                color = line.match(/"([^"]+)"/)[1];
                                queue.enqueue(color);
                            }
                            else if (line.startsWith('q.dequeue')) {
                                queue.dequeue();
                            }
                            else if (line.startsWith('q.isEmpty')) {
                                alert(queue.isEmpty() ? "wahr" : "falsch");
                            }
                            else if (line.startsWith('q.head')) {
                                queue.head();
                            }
                            queue.render();
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var modeTitle = document.getElementById('mode-title');
    var switcher = document.querySelector('.mode-switcher');
    var stackDisplay = document.getElementById('stack-display');
    var queueDisplay = document.getElementById('queue-display');
    var readOnlyCodeLine = document.getElementById('read-only-code-line');
    // event listener for "Run Code" button
    document.getElementById('reset-run-code').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = document.getElementById('code-input').value;
                    return [4 /*yield*/, parseCode(code, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.getElementById('run-code').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = document.getElementById('code-input').value;
                    return [4 /*yield*/, parseCode(code, false)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.getElementById("clear-all").addEventListener('click', function () {
        document.getElementById('code-input').value = '';
        stack.items = [];
        stack.render();
        queue.items = [];
        queue.render();
    });
    document.getElementById("clear-stack").addEventListener('click', function () {
        stack.items = [];
        stack.render();
    });
    document.getElementById("clear-queue").addEventListener('click', function () {
        queue.items = [];
        queue.render();
    });
    // event listeners for mode switcher buttons
    document.querySelectorAll('.btn-mode').forEach(function (button) {
        button.addEventListener('click', function () {
            // Remove "active" class from all buttons
            document.querySelectorAll('.btn-mode').forEach(function (btn) { return btn.classList.remove('active'); });
            button.classList.add('active');
            if (button.dataset.mode === 'stack') {
                switcher.style.setProperty('--switcher-position', '5px'); // Move to left
                switcher.style.setProperty('--switcher-width', '43%');
                isStackMode = true;
                modeTitle.textContent = 'STACK24 – Hier stack ich alles.';
                modeTitle.classList.add('stack');
                readOnlyCodeLine.innerHTML = 'Stack&lt;String&gt; s = new Stack&lt;String&gt;();';
                queueDisplay.classList.add('display-none');
                stackDisplay.classList.remove('display-none');
                stack.render();
            }
            else {
                switcher.style.setProperty('--switcher-position', '47%'); // Move to right
                switcher.style.setProperty('--switcher-width', '50%');
                isStackMode = false;
                modeTitle.textContent = 'Queue24';
                modeTitle.classList.remove('stack');
                readOnlyCodeLine.innerHTML = 'Queue&lt;String&gt; q = new Queue&lt;String&gt;();';
                stackDisplay.classList.add('display-none');
                queueDisplay.classList.remove('display-none');
                queue.render();
            }
        });
    });
});
