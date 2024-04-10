var arr1 = [
    {
        type: 'Fruit',
        name: 'Apple',
    },
    {
        type: 'Vegetable',
        name: 'Broccoli',
    },
    {
        type: 'Vegetable',
        name: 'Mushroom',
    },
    {
        type: 'Fruit',
        name: 'Banana',
    },
    {
        type: 'Vegetable',
        name: 'Tomato',
    },
    {
        type: 'Fruit',
        name: 'Orange',
    },
    {
        type: 'Fruit',
        name: 'Mango',
    },
    {
        type: 'Fruit',
        name: 'Pineapple',
    },
    {
        type: 'Vegetable',
        name: 'Cucumber',
    },
    {
        type: 'Fruit',
        name: 'Watermelon',
    },
    {
        type: 'Vegetable',
        name: 'Carrot',
    },
];
var arr2;
var mainList = document.getElementById('mainList');
var fruitList = document.getElementById('Fruit');
var vegetableList = document.getElementById('Vegetable');
arr1.map(function (list) {
    var buttonElement = document.createElement("button");
    var buttonElementId = "".concat(list.name, "-").concat(list.type);
    buttonElement.innerHTML = list.name;
    buttonElement.id = buttonElementId;
    buttonElement.style.width = '100%';
    buttonElement.style.height = '50px';
    buttonElement.style.margin = '4px';
    buttonElement.style.cursor = 'pointer';
    buttonElement.onclick = function () { return onMovedForwardItem(buttonElement); };
    mainList === null || mainList === void 0 ? void 0 : mainList.appendChild(buttonElement);
});
var timeoutID = function (buttonElement) { return setTimeout(function () {
    mainList === null || mainList === void 0 ? void 0 : mainList.appendChild(buttonElement);
}, 5000); };
var onMovedForwardItem = function (buttonElement) {
    var _a = buttonElement.id.split('-'), type = _a[1];
    if (!buttonElement)
        return;
    if (type === 'Fruit') {
        fruitList === null || fruitList === void 0 ? void 0 : fruitList.appendChild(buttonElement);
    }
    else {
        vegetableList === null || vegetableList === void 0 ? void 0 : vegetableList.appendChild(buttonElement);
    }
    timeoutID(buttonElement);
};
fruitList.addEventListener('click', function (event) {
    var buttonElement = event.target;
    mainList === null || mainList === void 0 ? void 0 : mainList.appendChild(buttonElement);
    clearTimeout(timeoutID(buttonElement));
});
vegetableList.addEventListener('click', function (event) {
    var buttonElement = event.target;
    mainList === null || mainList === void 0 ? void 0 : mainList.appendChild(buttonElement);
    clearTimeout(timeoutID(buttonElement));
});
