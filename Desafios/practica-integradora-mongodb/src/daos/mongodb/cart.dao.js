import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {

    async getCarts() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addCart(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(cid) {
        try {
            const response = await CartModel.findById(cid);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(cid, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(cid, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}