import { promises as fs } from 'fs';

export default class ProductManager {
    constructor(path) {
    this.path = path;
}

async getProducts() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
}

async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id == id);
}

async addProduct(product) {
    const products = await this.getProducts();
    const id = Date.now().toString();
    const newProduct = { id, ...product };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
}

async updateProduct(id, updatedData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedData, id };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
}

async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter(p => p.id != id);
    if (newProducts.length === products.length) return false;
    await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
    return true;
}
}
