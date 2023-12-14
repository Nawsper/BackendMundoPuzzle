import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.post('/register', passport.authenticate('register'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);
router.get("/logout", controller.logoutUser);
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", { scope: ["user:email"] }), controller.githubResponse);
router.get('/private', isAuth, (req, res) => res.send('route private'));

export default router;


