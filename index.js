import { menuArray } from "./data.js";

let ordersArray = [];
let hidden = "hidden";

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


// Add / Remove only handles shifting, unshifting elements to ordersArray

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

// getOrderHtml has 3 parts, the base menu, the order list, then the orders themselves

function getOrderHtml() {
    let menuHtml = "";
    let orders = "";

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
    });

    const ordersHtml = `
    <section class="${hidden} checkout">
        <div class="checkout-title">Your order</div>
            ${orders}
        <hr class="orders-divider">
        <div class="orders-container">
            <div class="total-price">Total price:</div>
            <div class="total-order-price">$12</div>
        </div>
        <button class="order-button">Complete order</button>
    </section>
    `;

    menuHtml += ordersHtml;
    return menuHtml;
}

// Render function is called here

function render() {
    document.getElementById("main").innerHTML = getOrderHtml();
    document.querySelector(".order-button").addEventListener("click", function(e) {
        // Your event handler code here
        console.log("Order button clicked!");
      });
}

render();