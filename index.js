const http = require('http');
const Router = require('./router');
const ColoredString = require('./helpers/ColoredString');

const PORT = process.env.PORT || 3001;
const INFO_TEXT = new ColoredString(`Server up and running on port `).green;
const PORT_TEXT = new ColoredString(PORT).yellow;

http.createServer(
    (...params) => Router.enRouteRequest(...params)
).listen(
    PORT,
    '127.0.0.1',
    console.log.bind(this, INFO_TEXT + PORT_TEXT)
);