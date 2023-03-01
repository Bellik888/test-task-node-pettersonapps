"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const guard_1 = __importDefault(require("../../middleware/guard"));
const rate_limiter_1 = __importDefault(require("../../middleware/rate-limiter"));
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/registration', (0, rate_limiter_1.default)(15 * 60 * 1000, 10), validation_1.validateRegistration, auth_1.registration);
router.post('/login', validation_1.validateLogin, auth_1.login);
router.post('/logout', guard_1.default, auth_1.logout);
exports.default = router;
