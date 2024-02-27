import { HttpResponse } from "../utils/http.response.js";
import errorsDictionary from "../utils/errors.dictionary.js";

const httpResponse = new HttpResponse()

export const errorHandler = (error, req, res, next) => {

    console.log(error);

    const status = error.statusCode || 500;
    const message = error.message || errorsDictionary.DEFAULT;

    console.log(status);

    switch (status) {
        case 200:
            return httpResponse.Ok(res, message);
        case 400:
            return httpResponse.BadRequest(res, message);
        case 404:
            return httpResponse.NotFound(res, message);
        case 401:
            return httpResponse.Unauthorized(res, message);
        case 403:
            return httpResponse.Forbidden(res, message);
        case 409:
            return httpResponse.Conflict(res, message);
        default:
            return httpResponse.ServerError(res, message);
    }

}