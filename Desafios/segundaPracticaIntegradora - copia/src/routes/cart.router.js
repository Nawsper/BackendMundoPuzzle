import { Router } from "express";
import * as controller from '../controllers/cart.controllers.js';
// import { CartsManager } from '../managers/cartManager.js'

const router = Router()

// const cartManager = new CartsManager('./src/data/carts.json')

// rutas

router.get('/', controller.getCarts)

router.post('/', controller.addCart);

router.get('/:cid', controller.getCartById);

router.put('/:cid', controller.updateCart);

router.put('/:cid/products/:pid', controller.updateQtyProductFromCart);

router.post('/add/:cid/:pid', controller.addProductToCart);

router.delete('/:cid/products/:pid', controller.deleteProductFromCart);

router.delete('/:cid', controller.deleteAllProductsFromCart);

export default router