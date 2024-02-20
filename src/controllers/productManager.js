const fs = require("fs").promises;

class ProductManager {

    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, img, code, stock) {

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if(this.products.some(word => word.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
        }

        this.products.push(newProduct);

        await this.saveFile(this.products)

    }

    async getProducts() {
        try {
            const arrayProducts = await this.readProducts;
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readProducts();
            const product = arrayProducts.find (item => item.id === id);
            console.log(product);
        } catch (error) {
            console.error("No existe ese producto");
        }
    }

    async readProducts() {
        try {
            const answer = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(answer);
            return arrayProducts;
        } catch (error) {
            console.log("No se puede leer el archivo", error);
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("No se pudo guardar el archivo", error);
        }
    }

    async updateProduct(id, actualProduct) {
        const answer = await fs.readFile(id, "utf-8");
        console.log(answer);
    }

    async deleteProduct(id) {
       try {
         const arrayProducts = await this.readProducts();

         const index = arrayProducts.findIndex(item.id === id);

         if (index !== -1) {
            arrayProducts.splice(index, 1);
            await this.saveFile(arrayProducts);
            console.log("Producto eliminado");
         } else {
            console.log("No se encontró el producto");
         }
       } catch (error) {
        console.log("Error al eliminar el producto", error);
        throw error;
       }
    }
}

module.exports = ProductManager;