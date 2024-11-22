var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DataStructure from "./dataStructure.js";
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Queue.prototype.enqueue = function (element) {
        if (this.items.length >= 6) {
            alert("Die Schlange ist voll!");
            return true;
        }
        this.items.push(element);
        this.render();
    };
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            alert("Die Schlange ist leer!");
            return;
        }
        this.items.shift();
        this.render();
    };
    Queue.prototype.head = function () {
        if (this.isEmpty()) {
            alert("Die Schlange ist leer!");
            return;
        }
        alert("Head-Element: " + this.items[0]);
    };
    Queue.prototype.render = function () {
        var queueContainer = document.getElementById('queue-container');
        queueContainer.innerHTML = '';
        for (var i = 0; i < this.items.length; i++) {
            var container = document.createElement('div');
            var width = ((queueContainer.offsetWidth - 1) / 6) - 4;
            var color = this.getColor(this.items[i]);
            container.classList.add('queue-element');
            container.style.width = width + 'px';
            container.style.left = "".concat(i * (width + 3), "px");
            container.style.backgroundColor = color;
            container.style.opacity = "0.9";
            var label = document.createElement('span');
            label.style.lineHeight = "".concat(queueContainer.offsetHeight - 12, "px");
            label.textContent = this.items[i];
            label.style.color = this.isColorLight(color) ? 'black' : 'white';
            container.appendChild(label);
            queueContainer.appendChild(container);
        }
    };
    return Queue;
}(DataStructure));
export default Queue;
