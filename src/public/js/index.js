const socket = io();

const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = productName.value.trim();
    const price = parseFloat(productPrice.value.trim());
    if (name && price) {
        const product = {
            id: Date.now().toString(),
            name,
            price,
        };
        socket.emit('addProduct', product);
        productName.value = '';
        productPrice.value = '';
    }
});

socket.on('products', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerText = `${product.name} - $${product.price}`;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            socket.emit('deleteProduct', product.id);
        });
        productItem.appendChild(deleteButton);
        productList.appendChild(productItem);
    });
});