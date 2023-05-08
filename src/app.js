const express = require('express');
const productsRoutes = require('./routes/products.routes.js');
const cartsRouter = require('./routes/carts.routes.js');
const routerViews = require('./routes/views.router.js');
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')


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

