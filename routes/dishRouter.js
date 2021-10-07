const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you!');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('not support update all dishes in one go!');
    })
    .post((req, res, next) => {
        res.end('will add the dish: ' + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('will delete all the dishes for you!');
    });

module.exports = dishRouter;