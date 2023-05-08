const express = require('express');
const productsRoutes = require('./routes/products.routes.js');
const cartsRouter = require('./routes/carts.routes.js');
const routerViews = require('./routes/views.router.js');
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const { addProduct, deleteProduct } = require('./models/products.model.js');


const app = express();

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
const io = new Server(httpServer)
app.use(express.json());

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', routerViews)
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRouter);


// Configuramos el servidor de WebSockets
io.on('connection', (socket) => {
    console.log('New user connected');

    // Emitimos el evento de actualización de productos a todos los clientes conectados
    const updateProducts = () => {
        io.emit('updateProducts');
    };

    // Escuchamos el evento de creación de un nuevo producto
    socket.on('addProduct', (product) => {
        addProduct(product);
        updateProducts();
    });

    // Escuchamos el evento de eliminación de un producto
    socket.on('deleteProduct', (productId) => {
        deleteProduct(productId);
        updateProducts();
    });
});

module.exports = app;

