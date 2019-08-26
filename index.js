const http = require('http');
const { pipeline: callbackPipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { promisify } = require('util');

const pipeline = promisify(callbackPipeline);

async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    console.log(Object.getOwnPropertyNames(client), Object.getPrototypeOf(client));
    const [ result ] = await client.labelDetection('./upload.jpg');
    console.table(result.labelAnnotations);
}

http.createServer(async (request, response) => {
  const { headers, method, url } = request;

  request.on('end', async () => {
    quickstart().catch(console.error);

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body: "yes" };

    response.write(JSON.stringify(responseBody));
    response.end();
  });

  try {
    await pipeline(
      request,
      createWriteStream('./upload.jpg'),
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
}).listen(3000);