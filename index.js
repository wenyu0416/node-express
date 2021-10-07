const fs = require('fs');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/dishes', dishRouter);

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send the details of dish ' + req.params.dishId + ' to you!');
})

app.put('/dishes/:dishId', (req, res, next) => {
    res.end('will update the dish: ' + req.body.name + ' with details ' + req.body.description);
})

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('not support add single dishe!');
})

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
})

app.use((req, res, next) => {
    console.log("Request for " + req.url + " by method " + req.method);

    if (req.method == 'GET') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.url + ' not found</h1></body></html>');
        return;
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not support</h1></body></html>');
        return;
    }
})

const server_express = http.createServer(app);

server_express.listen(port, hostname, () => {
    console.log(`sever running at http://${hostname}:${port}`)
})