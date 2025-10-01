
export enum HTTP_STATUS {
    Continue = 100,

    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,

    MovedPermanently = 301,
    SeeOther = 303,
    NotModified = 304,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    UnprocessableContent = 422,
    TooManyRequests = 429,

    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
}
