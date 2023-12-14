import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

    async getProducts() {
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(pid) {
        try {
            const response = await ProductModel.findById(pid);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(pid, updatedProduct) {
        try {
            const response = await ProductModel.findByIdAndUpdate(pid, updatedProduct, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(pid) {
        try {
            const response = await ProductModel.findByIdAndDelete(pid);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}        