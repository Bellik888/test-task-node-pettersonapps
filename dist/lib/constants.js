"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUD_FOLDER_AVATARS = exports.Role = exports.HttpCode = exports.FRIENDS_POSTS_SKIP = exports.FRIENDS_POSTS_LIMIT = exports.LIMIT_JSON = exports.MAX_AGE = exports.MIN_AGE = void 0;
exports.MIN_AGE = 14;
exports.MAX_AGE = 75;
exports.LIMIT_JSON = 5000;
exports.FRIENDS_POSTS_LIMIT = 20;
exports.FRIENDS_POSTS_SKIP = 0;
exports.HttpCode = {
    OK: 200,
    CREATED: 201,
    ACCEPPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};
exports.Role = {
    ADMIN: 'administrator',
    USER: 'user',
};
exports.CLOUD_FOLDER_AVATARS = 'Avatars';
