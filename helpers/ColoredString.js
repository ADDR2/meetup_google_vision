class ColoredString extends String {
    constructor(...params) {
        super(...params);
    }

    get blue() {
        return `\x1b[34m${this}\x1b[0m`;
    }

    get red() {
        return `\x1b[31m${this}\x1b[0m`;
    }

    get green() {
        return `\x1b[32m${this}\x1b[0m`;
    }

    get white() {
        return `\x1b[37m${this}\x1b[0m`;
    }

    get cyan() {
        return `\x1b[36m${this}\x1b[0m`;
    }

    get yellow() {
        return `\x1b[33m${this}\x1b[0m`;
    }
}

module.exports = ColoredString;