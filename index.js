import { menuArray } from "./data.js";

document.addEventListener('click', function(e) {
    if (e.target.closest('.add-btn')) {
        const itemId = e.target.closest('.add-btn').dataset.id;
        if (itemId) {
            handleAddItem(Number(itemId));
        }
    }
});

let toggle = false;

function handleAddItem(itemId) {
    const targetItemObj = menuArray.filter(menuItem => menuItem.id === itemId)[0];
    console.log(targetItemObj);
    
    if (!toggle) {
        document.getElementById("checkout").classList.toggle('hidden');
    }
    toggle = true;
}


function getOrderHtml() {
    let menuHtml = ``;
    let ordersHtml = ``;

    ordersHtml += `
    <section class="hidden" id="checkout">
        <div class="checkout-title">Your order</div>
    </section>
    `;
    console.log(ordersHtml);

    menuArray.forEach(function (menuItem) {
        menuHtml += `
        <section class="item">
            <div class="item-graphic">${menuItem.emoji}</div>
            <div class="container">
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

    menuHtml += ordersHtml;
    
    return menuHtml;
}

console.log(getOrderHtml());

function render() {
    document.getElementById("main").innerHTML = getOrderHtml();
}

render();
