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
exports.logout = exports.login = exports.registration = void 0;
const auth_service_1 = __importDefault(require("../../service/auth.service"));
const constants_1 = require("../../lib/constants");
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isUserExist = yield auth_service_1.default.isUserExist(email);
        if (isUserExist) {
            return res
                .status(constants_1.HttpCode.CONFLICT)
                .json({ status: 'error', code: constants_1.HttpCode.CONFLICT, message: 'Email os already exist' });
        }
        const data = yield auth_service_1.default.createUser(req.body);
        res.status(constants_1.HttpCode.CREATED).json({ status: 'success', code: constants_1.HttpCode.CREATED, data });
    }
    catch (error) {
        next(error);
    }
});
exports.registration = registration;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield auth_service_1.default.getUser(email, password);
        if (!user) {
            return res
                .status(constants_1.HttpCode.UNAUTHORIZED)
                .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
        }
        const token = yield auth_service_1.default.getToken(user);
        if (token)
            yield auth_service_1.default.setToken(user.id, token);
        res.status(constants_1.HttpCode.OK).json({
            status: 'success',
            code: constants_1.HttpCode.OK,
            data: {
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield auth_service_1.default.getUser(email, password);
        if (!user) {
            return res
                .status(constants_1.HttpCode.UNAUTHORIZED)
                .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
        }
        yield auth_service_1.default.removeToken(user.id);
        res.status(constants_1.HttpCode.OK).json({
            status: 'success',
            code: constants_1.HttpCode.OK,
            message: 'SUCCESS',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
