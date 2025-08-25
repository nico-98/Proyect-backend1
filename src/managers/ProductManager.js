import { promises as fs } from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error leyendo productos:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            if (!id) throw new Error('ID requerido');
            const products = await this.getProducts();
            return products.find(p => p.id == id) || null;
        } catch (error) {
            console.error('Error buscando producto:', error);
            return null;
        }
    }

    async addProduct(product) {
        try {
            // Validación básica
            if (!product || !product.name || !product.price) {
                throw new Error('Faltan campos requeridos');
            }
            const products = await this.getProducts();
            const id = Date.now().toString();
            const newProduct = { id, ...product };
            products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error agregando producto:', error);
            return null;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            if (!id) throw new Error('ID requerido');
            const products = await this.getProducts();
            const index = products.findIndex(p => p.id == id);
            if (index === -1) return null;
            products[index] = { ...products[index], ...updatedData, id };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } catch (error) {
            console.error('Error actualizando producto:', error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            if (!id) throw new Error('ID requerido');
            const products = await this.getProducts();
            const newProducts = products.filter(p => p.id != id);
            if (newProducts.length === products.length) return false;
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
            return true;
        } catch (error) {
            console.error('Error eliminando producto:', error);
            return false;
        }
    }
}