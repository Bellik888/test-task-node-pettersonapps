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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../lib/constants");
const user_1 = __importDefault(require("../repository/user"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || '123';
const verifyToken = (token) => {
    try {
        if (!token)
            return false;
        const verify = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return !!verify;
    }
    catch (error) {
        return false;
    }
};
const guard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Not authorized / Token not found' });
    }
    const isValidToken = verifyToken(token);
    if (!isValidToken) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Not authorized' });
    }
    const payload = jsonwebtoken_1.default.decode(token);
    const user = yield user_1.default.findById(payload.id);
    if (!user || user.token !== token) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Not authorized' });
    }
    // res.locals.user = user
    res.locals.user = user;
    next();
});
exports.default = guard;
