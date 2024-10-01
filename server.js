const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
let { info, highlight } = require('./textColors');


app.use((req, res, next) => {
    let message = info(req?.method, " request to route");
    let route = highlight(req?.path);
    console.log(message, route, '');
    next();
})

app.use(bodyParser.json());
app.use('/', routes);

const PORT = 1717;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});