const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const bodyParser = require('body-parser');
import useControllers from './server/routes';

const PORT = config.get('port') || 5000;

const app = express();

app.use(bodyParser({extended: true}));
useControllers(app);

async function start() {
    try {
        await mongoose.connect('mongodb://map:map@localhost:27017/history-map',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
            );
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen(PORT, () => {
            console.log('START ' + PORT)
        })
    } catch (e) {
        console.log('Server error',  e.message)
        process.exit(1);
    }
}

start();
