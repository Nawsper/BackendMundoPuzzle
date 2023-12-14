import { Router } from "express";
import * as controller from '../controllers/cart.controllers.js';
// import { CartsManager } from '../managers/cartManager.js'

const router = Router()

// const cartManager = new CartsManager('./src/data/carts.json')

// rutas

router.get('/', controller.getCarts)

router.post('/', controller.addCart);

router.get('/:cid', controller.getCartById);

router.post('/:cid/products/:pid', controller.updateCart)

export default router