import http from 'http';
import express from 'express';
import metaRouter from './routes/metaRoute';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const NAMESPACE = 'Server';
const router = express();


/** Logging the request */

router.use((req, res, next) => {

    /** Log the Req */

    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {

        /***Log the res */

        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});

/** Parse the request */

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Rules of API */

router.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */

router.use('/api/metadata', metaRouter);

/** Error Handling */

router.use((req, res, next) => {
    const error = new Error('Not Found');

    res.status(404).json({
        message: error.message
    });
});

/** Connect to Mongo */

mongoose.connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to mangoDB!');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Create the Server */

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE,
    `Server is running on ${config.server.hostname}:${config.server.port}`));