"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const constants_1 = require("../lib/constants");
const limiter = (duration, limit) => {
    return (0, express_rate_limit_1.rateLimit)({
        windowMs: duration,
        max: limit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            return res.status(constants_1.HttpCode.TOO_MANY_REQUESTS).json({
                status: 'error',
                code: constants_1.HttpCode.TOO_MANY_REQUESTS,
                message: 'Too many requests, please try again later.',
            });
        },
    });
};
exports.default = limiter;
