import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserDao from '../daos/mongodb/user.dao.js'
import { PRIVATE_KEY } from "../jwt/auth.js";

const userDao = new UserDao()

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATE_KEY
}

const verifyToken = async (jwt_payload, done) => {
    console.log('payload', jwt_payload);
    const user = await userDao.getById(jwt_payload.userId);
    if (!user) return done(null, false)
    return done(null, jwt_payload)
}

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user)
})