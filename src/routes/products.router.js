const express = require("express");
const router = express.Router();

router.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if(limit) {
            res.json(products.slice(0, limit));
        } else {
                res.json(products)
            }    
        } catch (error) {
        console.log("Ocurrió un error al obtener los productos", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const product = await productManager.getProductById(parseInt(id));
        if(!product) {
            res.json({
                error: "Producto no encontrado"
            });
        } else {
            res.json(product)
        }
    } catch (error) {
        console.log("Ocurrió un error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.put("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const actualProduct = req.body;

    try {
        await productManager.updateProduct(parseInt(id), actualProduct);
        res.json({message: "Producto actualizado"})
    } catch (error) {
        console.log("Ocurrió un error al actualizar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.post("/api/products", async (req, res) => {
    const newProduct = req.body;

    try {
        await productManager.addProduct(newProduct);
        res.status(201).json({message: "Producto agregado con éxito"})
    } catch (error) {
        console.log("Hubo un error al agregar un producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.put("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const actualProduct = req.body;

    try {
        await productManager.updateProduct(parseInt(id), actualProduct);
        res.json({message: "Producto actualizado con éxito"})
    } catch (error) {
        console.log("No se puede actualizar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }   
})

router.delete("api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({message: "Producto eliminado exitosamente"})
    } catch (error) {
        console.log("No se pudo eliminar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

module.exports = router;