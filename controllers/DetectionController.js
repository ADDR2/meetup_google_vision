const GoogleClientService = require('../services/GoogleClientService');
const TransferFileService = require('../services/TransferFileService');

class DetectionController {
    static async postAnalyzeImage(request, response) {
        const responseBody = { method: request.method, url: request.url };
        
        try {
            const path = await TransferFileService.transferFileWithStream(request);

            if (!path) throw new Error('Could not transfer file');

            const result = await GoogleClientService.completeAnalysis(path);
        
            response.statusCode = 200;
            responseBody.body = result;
        } catch(error) {
            response.statusCode = 500;
            responseBody.body = error.message;
        }

        return responseBody;
    }
}

module.exports = Object.freeze(DetectionController);