import {menuArray} from '/data.js'

const menuDiv = document.getElementById('menu-div')
const paymentForm = document.getElementById('payment-form')
let orderArray = []
let orderDivIsVisible = false

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        buildOrder(menuArray.filter(item => item.id == e.target.dataset.add)[0])
        renderOrderHtml()
        if (!orderDivIsVisible) {
            changeOrderDivVisibility()
        }
    }
})

document.addEventListener('click', e => {
    if (e.target.dataset.remove) {
        removeOrderItem(e.target.dataset.remove)
        renderOrderHtml()
        if (orderArray.length === 0) {
            changeOrderDivVisibility()
        }
    }
})

document.addEventListener('click', e => {
    if (e.target.dataset.toggleVisibility) {
        changePaymentDivVisibility(e.target.id)
        
    }
})

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    changePaymentDivVisibility()
    document.getElementById('rate-div').classList.toggle('hidden')
    changeOrderDivVisibility()
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

const getTotalPriceHtml = arr => {
    if (orderArray.length === 0) {
        return 0
    } else {
        return arr.map(item => item[1] * item[2]).reduce((total, currentItem) => total + currentItem)
    }
}
    
const removeOrderItem = menuItem => {
    let removedItem = orderArray.filter(item => item[0] == menuItem)[0]
    removedItem[2]--
    orderArray = orderArray.filter(item => item[2] > 0)
}

const renderOrderHtml = () => {
    document.getElementById('order-item-list').innerHTML = getOrderListHtml(orderArray)
    document.getElementById('total-price-span').innerHTML = `\$${getTotalPriceHtml(orderArray)}`
}

const changeOrderDivVisibility = () => {
    document.getElementById('order-div').classList.toggle('hidden')
    orderDivIsVisible = !orderDivIsVisible
}

const changePaymentDivVisibility = buttonClicked => {
    const paymentDiv = document.getElementById('payment-div')
    if (buttonClicked === 'submit-order-btn') {
        if (paymentDiv.classList.contains('hidden'))
        paymentDiv.classList.toggle('hidden')
    } else {
        paymentDiv.classList.toggle('hidden')
    }
} 

menuDiv.innerHTML = renderMenu(menuArray)
