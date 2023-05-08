const socket = io();

const addProductForm = document.getElementById('add-product-form');
const deleteProductForm = document.getElementById('delete-product-form');

addProductForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value
    const status = document.getElementById('status').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnails').value;
    socket.emit('addProduct', { title, price , description, thumbnail , code , status ,stock , category });
    addProductForm.reset();
});

deleteProductForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    socket.emit('deleteProduct', id);
    deleteProductForm.reset();
});