const express = require('express');
const sellData = require('./data.json');

const app = express();

app.use((function(){
    let router = express.Router();

    router.get('/', (req, res, next) => {
        req.url = '/index.html';
        next();
    });

    return router;
})());

app.use('/api', (function(){
    let router = express.Router();

    router.get('/seller', (req, res) => {
        res.json({
        errno:0,
        data:sellData.seller
            });
        });
    router.get('/goods', (req, res) => {
        res.json({
        errno:0,
        data:sellData.goods
        });
    });
    router.get('/ratings', (req, res) => {
        res.json({
        errno:0,
        data:sellData.ratings
        });
    });

    return router;
})());


app.use(express.static('./dist'));

app.listen(9999);
