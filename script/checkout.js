
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

let main = document.querySelector('tbody');
let cartDis = localStorage.getItem('purchasedItems');
let items = JSON.parse(localStorage.getItem('purchasedItems'));
let totalSpan = document.getElementById('total-price')
let total = 0;

items.forEach(item => {
    main.innerHTML += `
        <tr>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>
                <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
            </td>
        </tr>
    `;
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        let itemId = event.target.getAttribute('data-id');
        removeFromCart(itemId);
        event.target.closest('tr').remove(); 
    }
});

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('purchasedItems', JSON.stringify(cart));
    displayCartItems();
}

function displayCartItems() {
}

document.getElementById("checkoutBtn").addEventListener("click", function() {
    alert("Thank you for shopping at Naz's Plush Palace!");
});

let cartItems = [];

  function addToCart(id) {
    let itemToAdd = items.find(item => item.id === id);
    if (itemToAdd) {
      cartItems.push(itemToAdd);
      renderCart();
    }
  }

  function renderCart() {
    let cartHTML = '';
    cartItems.forEach(item => {
      cartHTML += `
        <tr>
          <td>${item.name}</td>
          <td>R ${item.price.toFixed(2)}</td>
          <td>1</td>
          <td>R ${item.price.toFixed(2)}</td>
        </tr>
      `;
    });
    document.getElementById('cart-items').innerHTML = cartHTML;
    calculateTotal();
  }

 
 const purchasedItems= [
    { name: 'Item 1', price: 199.99 },
    { name: 'Item 2', price: 349.99},
    { name: 'Item 3', price: 349.99},
    { name: 'Item 4', price: 299.99},
    { name: 'Item 5', price: 149.99},
    { name: 'Item 6', price: 299.99},
   
  ];

  function calculateTotal() {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price;
    });
    document.getElementById('total-price').innerHTML = `R ${totalPrice.toFixed(2)}`;
  }

  calculateTotal();








