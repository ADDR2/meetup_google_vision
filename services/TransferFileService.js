const { createWriteStream } = require('fs');
const { promisify } = require('util');
const { pipeline: callbackPipeline } = require('stream');
const ColoredString = require('../helpers/ColoredString');

const pipeline = promisify(callbackPipeline);
let counter = 1n;

class TransferFileService {
    constructor() {
        this.filePath = process.env.FILE_PATH || './upload';
        this.fileExtension = process.env.FILE_EXTENSION || '.jpg';
    }

    async transferFileWithStream(readStream = null) {
        if(!readStream) throw new Error('Could not transfer file');

        const completePath = `${this.filePath}-${counter++}${this.fileExtension}`;

        try {
            await pipeline(
                readStream,
                createWriteStream(completePath),
            );
            console.log(new ColoredString('Pipeline succeeded').green);

            return completePath;
        } catch (error) {
            console.error(
                new ColoredString(`Pipeline failed: ${error.message}`).red,
                error
            );
        }
    }
}

module.exports = Object.freeze(new TransferFileService());