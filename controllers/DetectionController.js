const GoogleClientService = require('../services/GoogleClientService');
const TransferFileService = require('../services/TransferFileService');
const ParseService = require('../services/ParseService');

class DetectionController {
    static async postAnalyzeImage(request, response) {
        const responseBody = { method: request.method, url: request.url };
        
        try {
            const path = await TransferFileService.transferFileWithStream(request);

            if (!path) throw new Error('Could not transfer file');

            const googleResult = await GoogleClientService.completeAnalysis(path);
            const result = {
                JsonResults: googleResult,
                Moderation: ParseService.parseModerationResults(googleResult.safeSearchDetection),
                Faces: ParseService.parseFaceResults(googleResult.faceDetection)
            };
        
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