import './daos/mongodb/connection.js'
import express from 'express'
import { __dirname } from './utils.js'
import { errorHandler } from './middlewares/errorHandler.js';
import productRouter from '../src/routes/product.router.js'
import cartRouter from '../src/routes/cart.router.js'
import userRouter from '../src/routes/user.router.js'
import handlebars from 'express-handlebars'
import viewsRouter from '../src/routes/views.router.js'
import { Server } from 'socket.io'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectionString } from './daos/mongodb/connection.js'

const app = express()

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false,
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler);
app.use(express.static(__dirname + '/public'))
app.use(session(mongoStoreOptions))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)
app.use('/users', userRouter)


const httpServer = app.listen(8080, () => console.log("Server OK en puerto 8080"))

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('New connection', socket.id)

    socket.on('disconnect', () => {
        console.log('¡User disconnect!', socket.id);
    })
})