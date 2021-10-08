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
        res.end('PUT operatin not support on /dishes');
    })
    .post((req, res, next) => {
        res.end('will add the dish: ' + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('will delete all the dishes for you!');
    });
dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end('Will send the details of dish ' + req.params.dishId + ' to you!');
    })
    .put((req, res, next) => {
        res.write('Updating dish: ' + req.params.dishId + '\n');
        res.end('will update the dish: ' + req.body.name + ' with details ' + req.body.description);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operatin not support on /dishes/:dishId');
    })
    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.dishId);
    });

module.exports = dishRouter;