const socket = io();

const productList = document.getElementById('productList');
const addProductForm = document.getElementById('addProductForm');

socket.on('products', (products) => {
    productList.innerHTML = '';
    products.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} - $${p.price}`;
        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';
        btn.onclick = () => socket.emit('deleteProduct', p.id);
        li.appendChild(btn);
        productList.appendChild(li);
    });
});

addProductForm.onsubmit = e => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const product = {
        name: formData.get('name'),
        price: Number(formData.get('price'))
    };
    socket.emit('addProduct', product);
    addProductForm.reset();
};