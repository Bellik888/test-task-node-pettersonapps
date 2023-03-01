"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../../lib/constants");
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(3).max(20).required(),
    nickname: joi_1.default.string().min(3).max(20).optional(),
    password: joi_1.default.string().alphanum().min(8).max(15).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const validateRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield registerSchema.validateAsync(req.body);
    }
    catch (error) {
        return res.status(400).json({ message: `Field ${error.message.replace(/"/g, '')}` });
    }
    next();
});
exports.validateRegistration = validateRegistration;
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loginSchema.validateAsync(req.body);
    }
    catch (error) {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(constants_1.HttpCode.UNAUTHORIZED).json({ message: `Field ${error.message.replace(/"/g, '')}` });
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    next();
});
exports.validateLogin = validateLogin;
