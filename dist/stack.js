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
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stack.prototype.push = function (element) {
        if (this.items.length >= 6) {
            alert("Der Stapel ist voll!");
            return true;
        }
        this.items.push(element);
        return false;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            alert("Der Stapel ist leer!");
            return;
        }
        this.items.pop();
    };
    Stack.prototype.top = function () {
        if (this.isEmpty()) {
            alert("Der Stapel ist leer!");
            return;
        }
        alert("Top-Element: " + this.items[this.items.length - 1]);
    };
    Stack.prototype.render = function () {
        var stackContainer = document.getElementById('stack-container');
        stackContainer.innerHTML = '';
        for (var i = 0; i < this.items.length; i++) {
            var container = document.createElement('div');
            var height = ((stackContainer.offsetHeight - 1) / 6) - 4;
            var color = this.getColor(this.items[i]);
            container.classList.add('stack-element');
            container.style.height = height + 'px';
            container.style.bottom = "".concat(i * (height + 3), "px");
            container.style.backgroundColor = color;
            container.style.opacity = "0.9";
            var label = document.createElement('span');
            label.style.lineHeight = height + 'px';
            label.textContent = this.items[i];
            label.style.color = this.isColorLight(color) ? 'black' : 'white';
            container.appendChild(label);
            stackContainer.appendChild(container);
        }
    };
    return Stack;
}(DataStructure));
export default Stack;
