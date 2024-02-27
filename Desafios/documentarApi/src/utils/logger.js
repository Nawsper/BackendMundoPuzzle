import winston, { transport } from "winston";

const loggerConfig = {
    transports: [
        new winston.transports.Console({ level: 'debug' }), //desarrollo
        new winston.transports.File({
            filename: __dirname + '/logs/errors.log',
            level: 'info'
        })]
}

const logger = winston.createLogger(loggerConfig)

