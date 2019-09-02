const http = require('http');
const { pipeline: callbackPipeline } = require('stream');
const { createReadStream, createWriteStream, writeFile: writeCallback } = require('fs');
const { promisify } = require('util');
const vision = require('@google-cloud/vision');

const pipeline = promisify(callbackPipeline);
const writeFile = promisify(writeCallback);

const client = new vision.ImageAnnotatorClient();

async function quickstart() {
    console.log(Object.getOwnPropertyNames(client), Object.getPrototypeOf(client));

    const [ { labelAnnotations } ] = await client.labelDetection('./upload.jpg');
    const [ { faceAnnotations } ] = await client.faceDetection('./upload.jpg');

    return { labelDetection: labelAnnotations, faceDetection: faceAnnotations };
}

http.createServer(async (request, response) => {
  const { headers, method, url } = request;
  //let result = '';

  //request.setEncoding('binary');

  request.on('end', async () => {
    /*try {
      const dataBuffer = Buffer.from(result, 'binary');
      await writeFile('./upload.jpg', dataBuffer);
    } catch(error) {
      console.error('Got an error', error);
    } finally {
      result = '';
    }*/

    response.on('error', (err) => {
      console.error(err);
    });

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    response.setHeader('Access-Control-Max-Age', '3600');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With, remember-me');
    let responseBody = { headers, method, url };

    try {
      const result = await quickstart();

      response.statusCode = 200;
      responseBody.body = result;
    } catch(error) {
      response.statusCode = 500;
      responseBody.body = error.message;
    }

    response.write(JSON.stringify(responseBody));
    response.end();
  });

  /*request.on('data', data => {
    result += data;
  });*/

  try {
    await pipeline(
      request,
      createWriteStream('./upload.jpg'),
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
}).listen(3001);