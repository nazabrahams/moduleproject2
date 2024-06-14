
function CreateItem(id, name, category, image, description, price, quantity) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

let item1 = new CreateItem(1,'Bear plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/brwon_bear-removebg-preview.png?raw=true','The cutest bear plushie on the market',199.99,1)

let item2 = new CreateItem(2,'Froggy plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/frog-removebg-preview.png?raw=true','The cutest frog plushie on the market',349.99,1)

let item3 = new CreateItem(3,'Axolotl plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/blue-removebg-preview.png?raw=true','The cutest axolotl plushie on the market',349.99,1)

let item4 = new CreateItem(4,'Bear w/ jacket plush','Plushes','https://github.com/nazabrahams/hostedimages2/blob/main/bear2-removebg-preview.png?raw=true','The cutest teddy plush on the market',299.99,1)

let item5 = new CreateItem(5,'Denim dunguree','Clothes','https://github.com/nazabrahams/hostedimages2/blob/main/denim-removebg-preview.png?raw=true','The cutest denimn dungree on the market',149.99,1)

let item6 = new CreateItem(6,'Pajama set','Clothes','https://github.com/nazabrahams/hostedimages2/blob/main/pjs-removebg-preview.png?raw=true','The cutest pj set on the market',299.99,1)


let items = [item1, item2, item3, item4, item5, item6];

function displayProducts() {
    const adminTable = document.getElementById('adminTable');
    adminTable.innerHTML = '';
    items.forEach((product, index) => {
        const row = `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 100px; height: 100px;"></td>
                <td>${product.name}</td>
                <td>R ${product.price.toFixed(2)}</td> <!-- Displaying price in Rands -->
                <td>
                    <button class="btn btn-info btn-sm" onclick="editProduct(${index})" id="edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
        adminTable.innerHTML += row;
    });
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayProducts();
    }
}

function editProduct(index) {
    const product = items[index];
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
   
    document.getElementById('editProductForm').onsubmit = function (e) {
        e.preventDefault();
        product.name = document.getElementById('editProductName').value;
        product.price = parseFloat(document.getElementById('editProductPrice').value);
        product.image = document.getElementById('editProductImage').value;
        localStorage.setItem('items', JSON.stringify(items));
        displayProducts();
        const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
        editProductModal.hide();
    };
    
    const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editProductModal.show();
    
    editProductModal.addEventListener('hidden.bs.modal', function () {
        
        document.getElementById('editProductForm').reset();
        document.getElementById('editProductForm').onsubmit = null;
    });
}

document.getElementById('sortProductsBtn').addEventListener('click', function () {
    items.sort((a, b) => a.price - b.price);
    localStorage.setItem('items', JSON.stringify(items));
    displayProducts();
});

displayProducts();

document.getElementById('addProductBtn').addEventListener('click', function () {
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.show();
   
    document.getElementById('addProductForm').onsubmit = function (e) {
        e.preventDefault();
        
        const newProductId = items.length + 1;
        
        const newProduct = new CreateItem(
            newProductId,
            document.getElementById('productName').value,
            'Uncategorized',  
            document.getElementById('productImage').value,
            '', 
            parseFloat(document.getElementById('productPrice').value),
            1  
        );
        
        items.push(newProduct);
        
        localStorage.setItem('items', JSON.stringify(items));
       
        displayProducts();
       
        addProductModal.hide();
        
        document.getElementById('addProductForm').reset();
    };
});