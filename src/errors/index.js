/* eslint-disable constructor-super */
/* eslint-disable max-classes-per-file */
class HttpError extends Error {
    constructor() {
        super();
        this.status = 200;
    }
}

export class BadRequest extends HttpError {
    constructor(message = 'Bad Request') {
        super(message);
        this.status = 400;
    }
}

export class Unauthorized extends HttpError {
    constructor(message = 'Unauthorized') {
        super(message);
        this.status = 401;
    }
}
