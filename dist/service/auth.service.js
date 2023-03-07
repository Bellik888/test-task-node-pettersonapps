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
const User_1 = __importDefault(require("../model/User"));
const repository_1 = __importDefault(require("../repository"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || '123';
const isUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repository_1.default.findOne(User_1.default, { email });
    return !!user;
});
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, friends } = yield repository_1.default.create(User_1.default, body);
    return {
        id,
        name,
        email,
        friends,
    };
});
const getUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repository_1.default.findOne(User_1.default, { email });
    const isValidPassword = yield (user === null || user === void 0 ? void 0 : user.isValidPassword(password));
    if (!isValidPassword)
        return null;
    return user;
});
const getToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = user;
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
});
const setToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    yield repository_1.default.updateOne(User_1.default, id, { token });
});
const removeToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield repository_1.default.updateOne(User_1.default, id, { token: null });
});
exports.default = { createUser, isUserExist, getUser, getToken, setToken, removeToken };
