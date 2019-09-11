const DetectionController = require('./controllers/DetectionController');
const ColoredString = require('./helpers/ColoredString');

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
        const [ domain, queryParams ] = url.split('?');

        console.log(
            new ColoredString(`${method} Request to: ${url}`).cyan
        );

        switch(`${method} - ${domain}`) {
            case 'POST - /analyze-image': {

                console.log(new ColoredString(`Endpoint found`).green);

                DetectionController.postAnalyzeImage(request, response)
                    .then(body => {
                        this.setHeaders(response);
                        response.write(JSON.stringify(body));
                        response.end();

                        console.log(new ColoredString(`Endpoint ${domain} responded with 200`).green);
                    })
                    .catch(error => {
                        console.error(
                            new ColoredString(`Internal Server Error: ${error.message}`).red,
                            error
                        );

                        this.setHeaders(response);
                        response.statusCode = 500;
                        response.write('Internal Server Error');
                        response.end();
                    })
                ;
                break;
            }
            default: {
                console.log(new ColoredString(`Endpoint not found`).red);

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