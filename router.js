const DetectionController = require('./controllers/DetectionController');

class Router {
    constructor() {
        this.defaultResponseHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me'
        };
    }

    enRouteRequest(request, response) {
        const { url, method } = request;
        
        switch(`${method} - ${url}`) {
            case 'POST - /analyze-image': {
                DetectionController.postAnalyzeImage(request, response)
                    .then(body => {
                        this.setHeaders(response);
                        response.write(JSON.stringify(body));
                        response.end();
                    })
                    .catch(error => {
                        console.error(error);

                        this.setHeaders(response);
                        response.statusCode = 500;
                        response.write('Internal Server Error');
                        response.end();
                    })
                ;
                break;
            }
            default: {
                this.setHeaders(response);
                response.statusCode = 404;
                response.write('Not found');
                response.end();

                break;
            }
        };
    }

    setHeaders(response, headers = this.defaultResponseHeaders) {
        for (const [ key, value ] of Object.entries(headers)) {
            response.setHeader(key, value);
        }
    }
}

module.exports = Object.freeze(new Router());