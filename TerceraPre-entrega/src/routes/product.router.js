import { Router } from "express";
import * as controller from '../controllers/product.controllers.js';
import { productValidator } from "../middlewares/productValidator.js";

// import { uploader } from "../middlewares/multer.js";

const router = Router()

// rutas

router.get('/', controller.getProducts);

router.post('/', productValidator, controller.addProduct)

router.get('/:id', controller.getProductById)

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.deleteProduct)

// router image

// router.post('/img', uploader.single('image'), async (req, res) => {
//     try {
//         const { image, ...productData } = req.body;
//         console.log(req.file);

//         const newProduct = {
//             ...productData,
//             profile: req.file.path
//         };

//         const addedProduct = await productManager.addProduct(newProduct);
//         res.status(200).json(addedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

export default router