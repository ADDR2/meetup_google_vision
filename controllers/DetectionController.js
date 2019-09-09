const GoogleClientService = require('../services/GoogleClientService');
const TransferFileService = require('../services/TransferFileService');
const ParseService = require('../services/ParseService');

class DetectionController {
    static async postAnalyzeImage(request, response) {
        let responseBody = {};
        
        try {
            const path = await TransferFileService.transferFileWithStream(request);

            if (!path) throw new Error('Could not transfer file');

            const googleResult = await GoogleClientService.completeAnalysis(path); 

            const result = {
                JsonResults: googleResult,
                Moderation: ParseService.parseModerationResults(googleResult.safeSearchDetection),
                Faces: ParseService.parseFaceResults(googleResult.faceDetection)
            };
        
            response.statusCode = !('safeSearchDetection' in googleResult) || !('faceDetection' in googleResult) ? 206 : 200;
            responseBody = result;
        } catch(error) {
            response.statusCode = 500;
            responseBody = error.message;
        }

        return responseBody;
    }
}

module.exports = Object.freeze(DetectionController);