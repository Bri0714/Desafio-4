const socket = io();

socket.on('productsUpdated', (products) => {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - $${product.price}`;
        productsList.appendChild(listItem);
    });
});

const newProductForm = document.getElementById('newProductForm');
newProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    socket.emit('newProduct', { title, description, code, price, stock, category });
});