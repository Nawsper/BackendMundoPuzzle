import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register'), controller.registerResponse);
// router.post('/login', passport.authenticate('login'), controller.loginResponse);
router.get("/logout", controller.logoutUser);

//google
// router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), controller.googlebResponse)
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//github
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
// router.get("/profile-github", passport.authenticate("github", { scope: ["user:email"] }), controller.githubResponse);
router.get("/profile-github", passport.authenticate("github", {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//jwt
// router.get('/private', passport.authenticate('jwt'), (req, res) => res.send(req.user));
router.get('/private-cookies', passport.authenticate('jwtCookies'), (req, res) => res.send(req.user));
router.post('/login', passport.authenticate('login'), controller.login);

export default router;


