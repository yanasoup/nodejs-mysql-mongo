const express = require('express');
const app = express();
const denormalRouter = require('./routes/denormal');
const PORT = 9433;
const path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => { // seperti function yg di execte di __construct
    //console.log('request size ',req.body)
    console.info(`incoming request ${new Date().toString()} => ${req.originalUrl}`);
    next();
});


app.use(denormalRouter);
app.use(express.static('public'));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('<h1>we think you are lost</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'))
});

app.listen(PORT, () => console.info(`server has started at port ${PORT}`));

