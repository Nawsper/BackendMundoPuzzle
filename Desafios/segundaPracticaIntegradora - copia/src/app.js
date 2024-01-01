import './daos/mongodb/connection.js'
import express from 'express'
import { __dirname, mongoStoreOptions } from './utils.js'
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import session from 'express-session';
import passport from 'passport';
import cookieParser from "cookie-parser";
import router from '../src/routes/index.router.js'
import './passport/strategies.js'
import './passport/github-strategy.js'
import './passport/google-strategy.js'
import './passport/jwt.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(errorHandler);
app.use(express.static(__dirname + '/public'))
app.use(session(mongoStoreOptions))

app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('', router)

const httpServer = app.listen(8080, () => console.log("Server OK en puerto 8080"))

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('New connection', socket.id)

    socket.on('disconnect', () => {
        console.log('¡User disconnect!', socket.id);
    })
})