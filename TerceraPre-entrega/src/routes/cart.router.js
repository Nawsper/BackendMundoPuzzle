import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';
import TicketController from "../controllers/ticket.controllers.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const controller = new CartController()
const ticketcontroller = new TicketController()

const router = Router()

// rutas

router.get('/', controller.getAll)

router.post('/', controller.create);

router.get('/:cid', controller.getCartById);

router.put('/:cid', controller.updateCart);

router.put('/:cid/products/:pid', controller.updateQtyProductFromCart);

router.post('/add/:cid/:pid', controller.addProductToCart);

router.post('/:cid/purchase', verifyToken, ticketcontroller.generateTicket)

router.delete('/:cid/products/:pid', controller.deleteProductFromCart);

router.delete('/:cid', controller.deleteAllProductsFromCart);

export default router