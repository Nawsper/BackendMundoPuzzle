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
        const cart = await service.getCartById(cid);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
        } else {
            try {
                const { pid } = req.params;
                const prodUpd = await service.updateCart(cid, pid, req.body);
                res.json(prodUpd);
            } catch (error) {
                next(error.message);
            }
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};