import * as service from "../services/product.services.js";
import * as cartservice from "../services/cart.services.js";

export const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort, query, status } = req.query;

        const queryParams = {
            page,
            limit,
            sort,
            query,
            status
        };

        const response = await service.getProducts(queryParams);
        const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        const nextLink = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        res.render('home', {
            products: response.docs.map(item => item.toJSON()),
            status: 'success',
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        next(error.message);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await cartservice.getCartById(cid);
        res.render('cart', response);
    }
    catch (error) {
        next(error.message);
    }
}

export const register = (req, res) => {
    res.render('register')
}
export const errorRegister = (req, res) => {
    res.render('errorRegister')
}
export const login = (req, res) => {
    res.render('login')
}
export const errorLogin = (req, res) => {
    res.render('errorLogin')
}
export const profile = (req, res) => {
    res.render('profile')
    console.log(req.session);
}