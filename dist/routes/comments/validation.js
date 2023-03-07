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
exports.isAuthor = exports.validateUpdate = exports.validateCreate = exports.validateID = void 0;
const constants_1 = require("./../../lib/constants");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("../../model/Comment"));
const repository_1 = __importDefault(require("../../repository"));
const createSchema = joi_1.default.object({
    comment: joi_1.default.string().min(10).max(150).required(),
    postId: mongoose_1.Types.ObjectId,
    authorId: mongoose_1.Types.ObjectId,
});
const updateSchema = joi_1.default.object({
    comment: joi_1.default.string().min(10).max(150).required(),
}).or('comment');
const validateID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
    next();
});
exports.validateID = validateID;
const validateCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createSchema.validateAsync(req.body);
    }
    catch (error) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: `Field ${error.message.replace(/"/g, '')}` });
    }
    next();
});
exports.validateCreate = validateCreate;
const validateUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield updateSchema.validateAsync(req.body);
    }
    catch (error) {
        return res.status(400).json({ message: `Field ${error.message.replace(/"/g, '')}` });
    }
    next();
});
exports.validateUpdate = validateUpdate;
const isAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user } = res.locals;
    const comment = yield repository_1.default.findById(Comment_1.default, id);
    if (!user._id.equals(comment.authorId))
        return res.status(404).json({ message: 'you are not author' });
    next();
});
exports.isAuthor = isAuthor;
