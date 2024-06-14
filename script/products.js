function CreateItem(id,name,category,image,description,price,quantity) {
    this.id = id
    this.name =  name
    this.category = category
    this.image = image
    this.description = description
    this.price = price
    this.quantity = quantity
}

let item1 = new CreateItem(1,'Bear plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/brwon_bear-removebg-preview.png?raw=true','The cutest bear plushie on the market',199.99,1)

let item2 = new CreateItem(2,'Froggy plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/frog-removebg-preview.png?raw=true','The cutest frog plushie on the market',349.99,1)

let item3 = new CreateItem(3,'Axolotl plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/blue-removebg-preview.png?raw=true','The cutest axolotl plushie on the market',349.99,1)

let item4 = new CreateItem(4,'Bear w/ jacket plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/bear2-removebg-preview.png?raw=true','The cutest teddy plush on the market',299.99,1)

let item5 = new CreateItem(5,'Denim dunguree','Clothes','https://github.com/nazabrahams/hostedimages2/blob/main/denim-removebg-preview.png?raw=true','The cutest denimn dungree on the market',149.99,1)

let item6 = new CreateItem(6,'Pajama set','Clothes','https://github.com/nazabrahams/hostedimages2/blob/main/pjs-removebg-preview.png?raw=true','The cutest pj set on the market',299.99,1)


let items = [item1, item2, item3, item4, item5, item6]

localStorage.setItem('items',JSON.stringify(items))

let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) ||[];

function displayItems(items) {
    let productgrid = document.querySelector('.productgrid');
    productgrid.innerHTML ='';
    items.forEach(item=> {
        productgrid.innerHTML += `
        <div class ="product-card">
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>R ${item.price}</p>
        <button class="add-to-cart" value="${item.id}" id="purchased"> Add To Cart </button>
        
        
        
        
<button type="button" class="btn btn-primary" id="modBtn" data-bs-toggle="modal" data-bs-target="#exampleModal${item.id}">
  description
</button>


<div class="modal fade" id="exampleModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Description</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ${item.description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
</div>
        `
    })
}



displayItems(items);

let productSearch = document.querySelector('[data-search-product]');
productSearch.addEventListener('input', () => {
    try {
        let searchItem = items.filter(item => {
            return item.name.toLowerCase().includes(productSearch.value.toLowerCase());
        });
        displayItems(searchItem);
    } catch (e) {
       alert('Function is under maintenance');
     }
});

displayItems(items);

        document.getElementById('sortByPrice').addEventListener('change', function() {
            let sortedItems;
            if (this.value === 'asc') {
                sortedItems = items.slice().sort((a, b) => a.price - b.price);
            } else {
                sortedItems = items.slice().sort((a, b) => b.price - a.price);
            }
            displayItems(sortedItems);
        });
 
        
let purchasedButton = document.querySelectorAll('.add-to-cart')
function addToCart(id) {
   let [item] = items.filter(object=> object.id === +id)
   purchasedItems.push(item)
   console.log(item);
  
   }
   
   purchasedButton.forEach(button=>{
       button.addEventListener('click',(event)=>{
           addToCart(event.target.value);
           localStorage.setItem("purchasedItems",JSON.stringify(purchasedItems))
        
    })
})



let addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        let itemId = button.value;

        addToCart(itemId);
        alert('Item added to your cart!');
    });
});



