import * as service from "../services/cart.services.js";


export const getCarts = async (req, res, next) => {
    try {
        const response = await service.getCarts();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const addCart = async (req, res, next) => {
    try {
        const newCart = await service.addCart(req.body);
        if (!newCart) res.status(404).json({ msg: "Validation Error!" });
        else res.json(newCart);
    } catch (error) {
        next(error.message);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getCartById(cid);
        if (!cart) res.status(404).json({ msg: "Cart not found!" });
        else res.json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const productsArray = req.body;
        const updatedCart = await service.updateCart(cid, productsArray);
        res.json(updatedCart);
    } catch (error) {
        next(error.message);
    }
}


export const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const newProdCart = await service.addProductToCart(cid, pid);
        res.json(newProdCart);
    } catch (error) {
        next(error.message);
    }
}

export const updateQtyProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedQtyCart = await service.updateQtyProductFromCart(cid, pid, Number(quantity));
        res.json(updatedQtyCart);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const deleteProduct = await service.deleteProductFromCart(cid, pid);
        res.json(deleteProduct);
    } catch (error) {
        next(error.message);
    }
}

export const deleteAllProductsFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deleteAllProducts = await service.deleteAllProductFromCart(cid);
        res.json(deleteAllProducts);
    } catch (error) {
        next(error.message);
    }
};