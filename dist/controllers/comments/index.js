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
exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const constants_1 = require("../../lib/constants");
const errors_1 = __importDefault(require("../../lib/errors"));
const comment_service_1 = __importDefault(require("../../service/comment.service"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { comment, postId } = req.body;
    const result = yield comment_service_1.default.createComment(user.id, postId, comment);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: result });
});
exports.createComment = createComment;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment } = req.body;
    const { id } = req.params;
    const result = yield comment_service_1.default.updateComment(id, comment);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: result });
});
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield comment_service_1.default.deleteComment(id);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'DELETED' });
});
exports.deleteComment = deleteComment;
