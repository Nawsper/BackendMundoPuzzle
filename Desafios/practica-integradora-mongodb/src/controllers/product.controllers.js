import * as service from "../services/product.services.js";

export const getProducts = async (req, res, next) => {
    try {
        const response = await service.getProducts();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getProductById(id);
        if (!prod) res.status(404).json({ msg: "Product not found!" });
        else res.json(prod);
    } catch (error) {
        next(error.message);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const newProd = await service.addProduct(req.body);
        if (!newProd) res.status(400).json({ msg: "Validation Error!" });
        else res.json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.updateProduct(id, req.body);
        res.json(prodUpd);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.deleteProduct(id);
        res.json(prodDel);
    } catch (error) {
        next(error.message);
    }
};