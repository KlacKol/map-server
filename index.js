import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from 'config';

import useControllers from './server/routes';
import cors from 'cors';

const PORT = config.get('port') || 5000;
const app = express();
app.use(passport.initialize());
require('./server/middlewares/passport')(passport);
app.use(bodyParser({extended: true}));
app.use(cors());
useControllers(app);

async function start() {
    try {
        await mongoose.connect('mongodb://map:map@localhost:27017/history-map',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
            );
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen(PORT, () => {
            console.log('START ' + PORT)
        })
    } catch (e) {
        console.log('Server error',  e.message);
        process.exit(1);
    }
}

start();
