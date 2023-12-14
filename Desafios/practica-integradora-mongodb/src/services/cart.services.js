// MongoDB

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

//FileSystem

// import CartDaosFS from '../daos/filesystem/cart.dao.js'
// import { __dirname } from "../utils.js";
// const cartDao = new CartDaosFS(__dirname + "/daos/filesystem/data/carts.json");


export const getCarts = async () => {
    try {
        const response = await cartDao.getCarts();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCartById = async (cid) => {
    try {
        const item = await cartDao.getCartById(cid);
        if (!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}

export const addCart = async (obj) => {
    try {
        const newCart = await cartDao.addCart(obj);
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (cid, pid, updatedProduct) => {
    try {
        const cart = await cartDao.getCartById(cid);
        if (!cart) return false;

        const productIndex = cart.products.findIndex((item) => item.product.toString() === pid);

        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        //guardado filesystem
        await cartDao.updateCartFile(cid, cart);
        return cart;

        //guardado mongo
        // const updatedCart = await cart.save();
        // return updatedCart;


    } catch (error) {
        console.log(error);
    }
};
