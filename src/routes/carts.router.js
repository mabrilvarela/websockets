const express = require("express");
const router = express.Router();

router.post("/api/carts", async (req, res) => {
    const newCarts = req.body;
    const newCart = {
        id: ++cartManager,
        products: [
        title,
        description,
        price,
        img,
        code,
        stock,
        category
        ]
    }

    this.carts.push(newCarts);

    await this.saveFile(this.carts)

    try {
        await cartManager.addCart(newCart);
        res.status(201).json({message: "Carrito agregado con éxito"})
    } catch (error) {
        console.log("Hubo un error al agregar el carrito", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.get("/api/carts/:cid", async (req, res) => {
    let id = req.params.cid;

    try {
        const cart = await cartManager.getProductById(parseInt(id));
        if(!cart) {
            res.json({
                error: "Producto no encontrado"
            });
        } else {
            res.json(cart)
        }
    } catch (error) {
        console.log("Ocurrió un error al obtener el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})


module.exports = router;