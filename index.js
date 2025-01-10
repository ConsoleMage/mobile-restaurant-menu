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
            ordersArray.splice(index, 1);
        }
        render();
    }
});

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
