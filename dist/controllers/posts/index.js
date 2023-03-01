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
exports.getAllFriendsPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const constants_1 = require("../../lib/constants");
const posts_1 = __importDefault(require("../../repository/posts"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const post = req.body.post;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const result = yield posts_1.default.createPost(user === null || user === void 0 ? void 0 : user.id, post);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({
            status: 'error',
            code: constants_1.HttpCode.NOT_FOUND,
            message: 'Not found',
        });
    return res
        .status(constants_1.HttpCode.OK)
        .json({ status: 'success', code: constants_1.HttpCode.OK, data: { message: 'success', post: result } });
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const result = yield posts_1.default.updatePost(id, req.body.post);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({
            status: 'error',
            code: constants_1.HttpCode.NOT_FOUND,
            message: 'Not found',
        });
    }
    return res
        .status(constants_1.HttpCode.OK)
        .json({ status: 'success', code: constants_1.HttpCode.OK, data: { message: 'success', post: result } });
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const result = yield posts_1.default.deletePost(id);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({
            status: 'error',
            code: constants_1.HttpCode.NOT_FOUND,
            message: 'Not found',
        });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, message: 'DELETED' });
});
exports.deletePost = deletePost;
const getAllFriendsPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const posts = yield posts_1.default.getAllFriendsPosts(user, req.query);
    if (!posts) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ status: 'error', code: constants_1.HttpCode.NOT_FOUND, message: 'NOT FOUND' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, data: posts });
});
exports.getAllFriendsPosts = getAllFriendsPosts;
