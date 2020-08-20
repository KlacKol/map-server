import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import passport from 'passport';
import redis from 'redis';
import config from 'config';

import swaggerDocument from './swagger';
import useControllers from './server/routes';
import cors from 'cors';

const PORT = config.get('port') || 5000;
const app = express();
export const clientRedis = redis.createClient({
    port: 6379,
    host: 'redis'
});

clientRedis.on("connect", () => {
    console.error('Redis client success connected');
});
clientRedis.on("error", function(error) {
    console.error(error);
});

app.use(passport.initialize());
require('./server/middlewares/passport')(passport);
app.use(bodyParser({extended: true}));
app.use(cors());
useControllers(app);

async function start() {
    try {
        await mongoose.connect('mongodb://map:map@mongo:27017/history-map',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
            );
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen(PORT, "0.0.0.0",() => {
            console.log('START ' + PORT)
        })
    } catch (e) {
        console.log('Server error',  e.message);
        process.exit(1);
    }
}

start();
