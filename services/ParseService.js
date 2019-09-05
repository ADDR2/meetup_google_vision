const defaultSafeSearchValues = {
    UNKNOWN: 0,
    VERY_UNLIKELY: 1,
    UNLIKELY: 2,
    POSSIBLE: 3,
    LIKELY: 4,
    VERY_LIKELY: 5
};

class ParseService {
    static parseFaceResults(faceDetectionResult) {
        const result = [];

        for(const face of faceDetectionResult) {
            result.push({
                Box: ParseService.generateSquareSvg(face.boundingPoly.vertices),
                Landmarks: face.landmarks.map(({ type, position }) => ({ type, ...position }))
            });
        }

        return result;
    }

    static parseModerationResults({ adult, racy }) {
        const adultValue = defaultSafeSearchValues[adult];
        const racyValue = defaultSafeSearchValues[racy];

        return {
            IsAdultContent: adultValue > 2,
            IsSpicyContent: racyValue > 2,
            AdultScore: adultValue / 5,
            SpicyScore: racyValue / 5
        };
    }

    static generateSquareSvg([ v1, v2, v3 ]) {
        const width = Math.abs(v2.x - v1.x);
        const height = Math.abs(v3.y - v2.y);

        return {
            Top: v1.y,
            Left: v1.x,
            Width: width,
            Height: height
        };
    }
}

module.exports = Object.freeze(ParseService);