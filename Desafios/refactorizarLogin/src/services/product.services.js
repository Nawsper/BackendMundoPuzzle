// MongoDB

import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

//FileSystem

// import ProductDaoFS from '../daos/filesystem/product.dao.js'
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(__dirname + "/daos/filesystem/data/products.json");

export const getProducts = async (queryParams) => {
    try {
        const response = await prodDao.getProducts(queryParams);
        if (!response) return false;
        else return response
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (pid) => {
    try {
        const item = await prodDao.getProductById(pid);
        if (!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (obj) => {
    try {
        const newProd = await prodDao.addProduct(obj);
        if (!newProd) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (pid, updatedProduct) => {
    try {
        const item = await prodDao.updateProduct(pid, updatedProduct);
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (pid) => {
    try {
        const item = await prodDao.deleteProduct(pid);
        return item;
    } catch (error) {
        console.log(error);
    }
}