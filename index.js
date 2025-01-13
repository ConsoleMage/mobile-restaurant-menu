import { menuArray } from "./data.js";

let ordersArray = [];
let hidden = "hidden";

document.addEventListener('click', function (e) {
    if (e.target.closest('.add-btn')) {
        const itemId = e.target.closest('.add-btn').dataset.id;
        if (itemId) {
            handleAddItem(Number(itemId));
        }
        if (ordersArray.length === 0) {
            document.querySelector(".order-details").classList.add("hidden");
        }
    } else if (e.target.closest('.remove-btn')) {
        const index = e.target.closest('.remove-btn').dataset.index;
        if (index) {
            handleRemoveItem(Number(index));
        }
    }
});

// To handle any interaction with the UI

function handleRemoveItem(index) {
    const targetItemObj = ordersArray.filter(order => order.id === index)[0];
    ordersArray.shift(targetItemObj);
    render();
}

function handleAddItem(itemId) {
    hidden = "";
    const targetItemObj = menuArray.filter(menuItem => menuItem.id === itemId)[0];
    ordersArray.unshift(targetItemObj);
    render();
}

// getOrderHtml has 3 parts, the base menu, the orders list, the orders

function getOrderHtml() {
    let menuHtml = "";
    let orders = "";
    let totalPrice = 0;

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

    ordersArray.forEach((order, index) => {
        orders += `
            <div class="orders-list">
                <div class="item-title">${order.name}</div>
                <div class="remove-btn" data-index="${index}">remove</div>
                <div class="order-price">$${order.price}</div>
            </div>
        `;
        totalPrice += order.price;
    });

    let ordersHtml = `
    <section class="${hidden} checkout">
        <div class="checkout-title">Your order</div>
            ${orders}
        <hr class="orders-divider">
        <div class="orders-container">
            <div class="total-price">Total price:</div>
            <div class="total-order-price">$${totalPrice}</div>
        </div>
        <button class="order-button" type="button">Complete order</button>
    </section>
    `;

    if (ordersArray.length === 0) {
        ordersHtml = "";
    }

    menuHtml += ordersHtml;
    return menuHtml;
}

// Render handles the HTML for Orders as well as the modal, payment details, order details

function render() {
    document.getElementById("main").innerHTML = getOrderHtml();

    document.querySelector(".order-button").addEventListener("click", function () {
        document.querySelector(".modal-container").classList.remove("hidden");
    });

    document.querySelector(".pay-button").addEventListener("click", function () {
        document.querySelector(".modal-container").classList.add("hidden");
        document.querySelector(".orders-container").classList.add("hidden");
        document.querySelector(".order-details").classList.remove("hidden");

        ordersArray = [];
        render();
    });
}

render();