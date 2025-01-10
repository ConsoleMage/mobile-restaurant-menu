import { menuArray } from "./data.js";

document.addEventListener('click', function (e) {
    if (e.target.closest('.add-btn')) {
        const itemId = e.target.closest('.add-btn').dataset.id;
        if (itemId) {
            handleAddItem(Number(itemId));
        }
    } else if (e.target.closest(".remove-btn")) {
        console.log("remove btn clicked");
        const targetDiv = e.target.closest(".remove-btn").dataset.remove;
        if (targetDiv) {
            targetDiv.remove();
        }
    }
});

let ordersHtml = ``;
let orders = "";

function handleAddItem(itemId) {
    let hidden = "";
    const targetItemObj = menuArray.filter(menuItem => menuItem.id === itemId)[0];

    orders += `
        <div class="orders-list">
            <div class="item-title">${targetItemObj.name}</div>
            <div class="remove-btn data-remove">remove</div> 
            <div class="order-price">$${targetItemObj.price}</div>
        </div>
    `;

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

    menuArray.forEach(function (menuItem) {
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
        `;
    });

    console.log(ordersHtml);
    menuHtml += ordersHtml;

    return menuHtml;
}

function render() {
    document.getElementById("main").innerHTML = getOrderHtml();
}

render();
