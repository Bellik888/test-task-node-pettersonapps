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
const Comment_1 = __importDefault(require("../model/Comment"));
const repository_1 = __importDefault(require("../repository"));
const createComment = (userId, postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.create(Comment_1.default, { authorId: userId, postId, comment });
});
const updateComment = (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.updateOne(Comment_1.default, id, { comment });
});
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.deleteOne(Comment_1.default, id);
});
exports.default = { createComment, updateComment, deleteComment };
