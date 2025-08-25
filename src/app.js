import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import ProductManager from './managers/ProductManager.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager('./src/data/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views'));

import viewsRouter from './routes/views.router.js';
app.use('/', viewsRouter);

import productsRouter from './routes/products.router.js';
app.use('/api/products', productsRouter);

app.use(express.static(path.resolve('src/public')));

io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    socket.emit('products', await productManager.getProducts());

    socket.on('addProduct', async (product) => {
        await productManager.addProduct(product);
        io.emit('products', await productManager.getProducts());
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        io.emit('products', await productManager.getProducts());
    });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export { io };