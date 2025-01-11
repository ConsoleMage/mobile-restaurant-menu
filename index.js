import { menuArray } from "./data.js";

let ordersHtml = ``;
let ordersArray = [];


document.addEventListener('click', function (e) {
    if (e.target.closest('.add-btn')) {
        const itemId = e.target.closest('.add-btn').dataset.id;
        if (itemId) {
            handleAddItem(Number(itemId));
        }
    } else if (e.target.closest('.remove-btn')) {
        const index = e.target.closest('.remove-btn').dataset.index;
        if (index) {
            handleRemoveItem(Number(index));
        }
    }
});

// Remove items here, remove items based on their index in ordersArray

function handleRemoveItem(index) {

    let orders = "";
    let hidden = "";

    const targetItemObj = ordersArray.filter(order => order.id === index)[0];
    ordersArray.shift(targetItemObj);
    
    ordersArray.forEach((order, index) => {
        orders += `
            <div class="orders-list">
                <div class="item-title">${order.name}</div>
                <div class="remove-btn" data-index="${index}">remove</div>
                <div class="order-price">$${order.price}</div>
            </div>
        `;
    });
    
    ordersHtml = `
    <section class="${hidden} checkout">
        <div class="checkout-title">Your order</div>
            ${orders}
        <hr class="orders-divider">
    </section>
    `;

    render();

}

// Add items to order here, render() is called last

function handleAddItem(itemId) {
    let orders = "";
    let hidden = "";

    const targetItemObj = menuArray.filter(menuItem => menuItem.id === itemId)[0];

    ordersArray.unshift(targetItemObj);
    ordersArray.forEach((order, index) => {
        orders += `
            <div class="orders-list">
                <div class="item-title">${order.name}</div>
                <div class="remove-btn" data-index="${index}">remove</div>
                <div class="order-price">$${order.price}</div>
            </div>
        `;
    });

    ordersHtml = `
    <section class="${hidden} checkout">
        <div class="checkout-title">Your order</div>
            ${orders}
        <hr class="orders-divider">
    </section>
    `;

    render();
}

// Render the menu here, call orders before finally rendering

function getOrderHtml() {
    let menuHtml = ``;

    menuArray.forEach(menuItem => 
        menuHtml += `
        <section class="item">
            <div class="item-graphic">${menuItem.emoji}</div>
            <div class="item-container">
                <div class="item-title">${menuItem.name}</div>
                <div class="item-description">${menuItem.ingredients}</div>
                <div class="item-price">$${menuItem.price}</div>
            </div>
            <div class="add-btn" data-id="${menuItem.id}">
                <div class="plus">+</div>
            </div>
        </section>
        <hr>
        `
    );

    console.log(ordersHtml);
    menuHtml += ordersHtml;

    return menuHtml;
}

function render() {
    document.getElementById("main").innerHTML = getOrderHtml();
}

render();
