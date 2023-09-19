import {menuArray} from '/data.js'

const menuDiv = document.getElementById('menu-div')
const orderItemList = document.getElementById('order-item-list')
const orderDiv = document.getElementById('order-div')
const totalPriceSpan = document.getElementById('total-price-span')
const orderArray = []
let orderDivIsVisible = false;

document.addEventListener('click', e => {
    e.target.dataset.add && buildOrder(menuArray.filter(item => item.id == e.target.id)[0])
    orderItemList.innerHTML = getOrderListHtml(orderArray)
    totalPriceSpan.innerHTML = `\$${getTotalPriceHtml(orderArray)}`
    if (!orderDivIsVisible) {
        orderDiv.classList.toggle('hidden')
        orderDivIsVisible = true
    }
})

const renderMenu = arr => arr.map(item => {
    const {name, ingredients, id, price, emoji} = item
    return `
        <div class="menu-item-div">
            <p class="menu-item-emoji">${emoji}</p>
            <div class="menu-item-text-div">
                <h3 class="menu-item-name">${name}</h3>
                <p class="ingredient-list">${ingredients.join(',')}</p>
                <p class="menu-item-price">\$${price}</p>
            </div>
            <button class="add-to-cart-btn" id="${id}" data-add="${id}">+</button>
        </div>`
    }).join('')
    
const buildOrder = item => {
    const newOrder = [item.name, item.price]
    let newOrderIsInOrderArray = false
    let indexOfNewOrderinOrderArray = null
    orderArray.forEach(order => {
        if (order[0] === newOrder[0]) {
            newOrderIsInOrderArray = true
            indexOfNewOrderinOrderArray = orderArray.indexOf(order)
        }
    })
    if (!newOrderIsInOrderArray) {
        newOrder.push(1)
        orderArray.push(newOrder)
    } else {
        orderArray[indexOfNewOrderinOrderArray][2]++
    }
}

const getOrderListHtml = arr => arr.map(subArr => `
    <li>
        <p>${subArr[0]} <span class="quantity-span">(x${subArr[2]})</span> <span class="remove-btn" data-remove="${subArr[0]}">remove</span><span class="price-span">\$${subArr[1] * subArr[2]}</span></p>
    </li>`
).join('')

const getTotalPriceHtml = arr => arr.map(item => item[1] * item[2])
    .reduce((total, currentItem) => total + currentItem)

menuDiv.innerHTML = renderMenu(menuArray)