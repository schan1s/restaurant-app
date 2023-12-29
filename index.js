import { menuArray } from "./data.js";

const order = [];

function getMenuHtml() {
  let menuHtml = ``;

  menuArray.map(function (menu) {
    menuHtml += `
        <section class="menu-item">
            <div class="left-items">
                <p class="emoji">${menu.emoji}</p>
                <div class="card-right">
                    <h1 class="menu-name">${menu.name}</h1>
                    <h2 class="menu-ingredients">${menu.ingredients}</h2>
                    <h3 class="menu-price">$${menu.price}</h3>
                </div>
            </div>
            <img class="add-button" src="/images/add-btn.svg" data-menu-id="${menu.id}"/>
        </section>
        <div class='divider'></div> 
        `;
  });
  return menuHtml;
}

function addToOrder(menuId) {
  // Find the selected menu item based on the ID
  const selectedItem = menuArray.find((e) => e.id == menuId);

  // Add the selected item to the order
  order.push({
    name: selectedItem.name,
    price: selectedItem.price,
  });

  // Log the updated order (you may replace this with your actual logic)
  console.log("Updated Order:", order);

  updateOrderHtml();
}

function updateOrderHtml() {
  const orderContainer = document.getElementById("order-container");

  orderContainer.innerHTML = getOrderHtml();

  // orderContainer.innerHTML.display = "block";

  updateTotalHtml();
}

function getOrderHtml() {
  let orderHtml = '<h2 class="order">Your Order</h2><ul class="cart">';

  order.forEach((item) => {
    orderHtml += `<li><span class="item-name">${item.name}</span><span class="item-price">$${item.price}</span></li>`;
  });

  orderHtml +=
    '<li><span class="line"></span></li><li><span>Total Price:</span><span id="total-container"></span></li></ul>';

  return orderHtml;
}

function updateTotalHtml() {
  const totalContainer = document.getElementById("total-container");
  totalContainer.textContent = `$${calculateTotal()}`;
}

function calculateTotal() {
  return order.reduce((total, item) => total + item.price, 0);
}

document.getElementById("container").innerHTML = getMenuHtml();
document.getElementById("order-container").innerHTML = getOrderHtml();

const addButtons = document.querySelectorAll(".add-button");
addButtons.forEach((button) => {
  button.addEventListener("click", function () {
    document.getElementById("order-container").style.display = "block";
    document.getElementById("complete-order-button").style.display = "block";

    const menuId = button.getAttribute("data-menu-id");

    addToOrder(menuId);
  });
});

const completeOrderBtn = document.getElementById("complete-order-button");

completeOrderBtn.addEventListener("click", function () {
  document.getElementById("credit-card-modal").style.display = "block";
});

const closeModalBtn = document.getElementById("closeButton");

closeModalBtn.addEventListener("click", function () {
  document.getElementById("credit-card-modal").style.display = "none";
});

document.getElementById("thankyou-modal").style.display = "none";

const payBtn = document.getElementById("pay-btn");

payBtn.addEventListener("click", function () {
  document.getElementById("credit-card-modal").style.display = "none";
  document.getElementById("order-container").style.display = "none";
  document.getElementById("complete-order-button").style.display = "none";
  const thankYouEl = document.getElementById("thankyou-modal");
  const name = document.getElementById("name-input").value;

  thankYouEl.style.display = "block";
  thankYouEl.innerHTML = `Thank you ${name}! Your order is on it's way`;
});

// const modalOverlay = document.createElement("div");
// modalOverlay.id = "modal-overlay";
// modalOverlay.style.display = "none";

// const modal = document.createElement("div");
// modal.id = "myModal";
// modal.className = "modal";
// modal.innerHTML = `
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <h2>Enter Credit Card Information</h2>
//     <form id="credit-card-form">
//       <label for="card-number">Card Number:</label>
//       <input type="text" id="card-number" name="card-number" required>

//       <label for="expiration-date">Expiration Date:</label>
//       <input type="text" id="expiration-date" name="expiration-date" required>

//       <label for="cvv">CVV:</label>
//       <input type="text" id="cvv" name="cvv" required>

//       <button type="submit">Submit</button>
//     </form>
//   </div>
// `;

// document.body.appendChild(modalOverlay);
// document.body.appendChild(modal);

// // Event listeners for showing/hiding modal
// const completeOrderButton = document.getElementById("complete-order-button");
// const modalCloseButton = modal.querySelector(".close");
// const creditCardForm = document.getElementById("credit-card-form");

// completeOrderButton.addEventListener("click", () => {
//   console.log("hello");
//   modalOverlay.style.display = "block";
//   modal.style.display = "block";
// });

// modalCloseButton.addEventListener("click", () => {
//   modalOverlay.style.display = "none";
//   modal.style.display = "none";
// });

// window.addEventListener("click", (event) => {
//   if (event.target === modalOverlay) {
//     modalOverlay.style.display = "none";
//     modal.style.display = "none";
//   }
// });

// creditCardForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   // Add your logic to handle credit card submission here
//   // Close the modal after processing the credit card information
//   modalOverlay.style.display = "none";
//   modal.style.display = "none";
// });

// const completeOrderBtn = document.querySelector('complete-order-btn')

// completeOrderBtn.addEventListener('click', function() {
//     console.log("hello")

// })

// const addButton = document.getElementById("add-button")

// addButton.addEventListener("click", function() {
//     console.log("hi")

// this is how you sum in js
// <h3>${property.roomsM2.reduce((sum, element) => sum + element, 0)} m&sup2;</h3>
