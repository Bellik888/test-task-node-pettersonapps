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
const constants_1 = require("../lib/constants");
const Post_1 = __importDefault(require("../model/Post"));
const createPost = (userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.default.create({ author: userId, description: text });
});
const updatePost = (id, text) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.default.findOneAndUpdate({ _id: id }, { description: text }, { new: true });
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.default.findOneAndDelete({ _id: id });
});
const getAllFriendsPosts = (user, { limit = constants_1.FRIENDS_POSTS_LIMIT, skip = constants_1.FRIENDS_POSTS_SKIP }) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Post_1.default.find({ author: { $in: user.friends } })
        .skip(Number(skip))
        .limit(Number(limit));
    const total = yield Post_1.default.find({ author: { $in: user.friends } }).countDocuments();
    return { total, posts: result };
});
exports.default = { createPost, updatePost, deletePost, getAllFriendsPosts };
