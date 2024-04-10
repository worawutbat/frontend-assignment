let arr1 = [
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
]

let arr2

const mainList = document.getElementById('mainList')
const fruitList = document.getElementById('Fruit')
const vegetableList = document.getElementById('Vegetable')

arr1.map((list) => {
    const buttonElement = document.createElement("button");
    const buttonElementId = `${list.name}-${list.type}`
    buttonElement.innerHTML  = list.name
    buttonElement.id = buttonElementId
    buttonElement.style.width = '100%'
    buttonElement.style.height = '50px'
    buttonElement.style.margin = '4px'
    buttonElement.style.cursor = 'pointer'
    buttonElement.onclick = () => onMovedForwardItem(buttonElement)
    mainList?.appendChild(buttonElement)
})

const onItemAutoReturn = (buttonElement: HTMLButtonElement) => setTimeout(() => {
    mainList?.appendChild(buttonElement)
}, 5000);

const onMovedForwardItem = (buttonElement: HTMLButtonElement) => {
    const [, type] = buttonElement.id.split('-')

    if (!buttonElement) return

    if (type === 'Fruit') {
       fruitList?.appendChild(buttonElement)
    }
    else {
        vegetableList?.appendChild(buttonElement)
    }
    onItemAutoReturn(buttonElement)
}

fruitList.addEventListener('click', (event: MouseEvent) => {
    const buttonElement = event.target as HTMLButtonElement
    mainList?.appendChild(buttonElement)
    clearTimeout(onItemAutoReturn(buttonElement))
})

vegetableList.addEventListener('click', (event: MouseEvent) => {
    const buttonElement = event.target as HTMLButtonElement
    mainList?.appendChild(buttonElement)
    clearTimeout(onItemAutoReturn(buttonElement))
})







