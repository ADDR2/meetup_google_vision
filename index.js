const http = require('http');

const Router = require('./router');

http.createServer((...params) => Router.enRouteRequest(...params)).listen(3001);