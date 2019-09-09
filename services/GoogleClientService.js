const vision = require('@google-cloud/vision');

class GoogleClientService {
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    getAllAvailableDetections() {
        return Object.keys(Object.getPrototypeOf(this.client));
    }

    async completeAnalysis(filePath) {
        try {
            const [
                [ { labelAnnotations } ],
                [ { faceAnnotations } ],
                [ { safeSearchAnnotation } ]
            ] = await Promise.all([
                this.client.labelDetection(filePath),
                this.client.faceDetection(filePath),
                this.client.safeSearchDetection(filePath)
            ]);

            return {
                labelDetection: labelAnnotations,
                faceDetection: faceAnnotations,
                safeSearchDetection: safeSearchAnnotation
            };
        } catch(error) {
            console.error('Could not execute analysis', error);
            return {};
        }
    }

    specificAnalysis(detectionMethod = 'labelDetection', filePath) {
        const detectionFunctions = Object.getPrototypeOf(this.client);
        if (!(detectionMethod in detectionFunctions)) throw new Error('Detection method not found');

        return this.client[detectionMethod](filePath);
    }
}

module.exports = Object.freeze(new GoogleClientService());