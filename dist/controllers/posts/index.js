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
const errors_1 = __importDefault(require("../../lib/errors"));
const post_service_1 = __importDefault(require("../../service/post.service"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { post } = req.body;
    const result = yield post_service_1.default.createPost(user.id, post);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: { post: result } });
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { post } = req.body;
    const result = yield post_service_1.default.updatePost(id, post);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: { post: result } });
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield post_service_1.default.deletePost(id);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'DELETED' });
});
exports.deletePost = deletePost;
const getAllFriendsPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const posts = yield post_service_1.default.getAllFriendsPosts(user, req.query);
    if (!posts) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: posts });
});
exports.getAllFriendsPosts = getAllFriendsPosts;
