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
const Post_1 = __importDefault(require("../model/Post"));
const repository_1 = __importDefault(require("../repository"));
const createPost = (userId, post) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.create(Post_1.default, { author: userId, description: post });
});
const updatePost = (postId, post) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.updateOne(Post_1.default, postId, { description: post });
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository_1.default.deleteOne(Post_1.default, postId);
});
const getAllFriendsPosts = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository_1.default.findMany(Post_1.default, { author: { $in: user.friends } }, query);
    const total = yield repository_1.default.findManyCount(Post_1.default, { author: { $in: user.friends } });
    return { total, result };
});
exports.default = { createPost, updatePost, deletePost, getAllFriendsPosts };
