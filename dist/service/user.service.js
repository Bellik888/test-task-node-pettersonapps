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
const repository_1 = __importDefault(require("../repository"));
const User_1 = __importDefault(require("../model/User"));
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repository_1.default.findById(User_1.default, id);
    return user;
});
const findBy = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository_1.default.findMany(User_1.default, Object.assign({ _id: { $ne: user.id } }, body));
    const total = yield repository_1.default.findManyCount(User_1.default, Object.assign({ _id: { $ne: user.id } }, body));
    if (!result)
        return null;
    const users = result.map((friend) => {
        const { id, name, friends, nickname } = friend;
        return { id, name, friends, nickname };
    });
    return { total, users };
});
const getFriends = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository_1.default.findMany(User_1.default, { _id: { $in: user.friends } }, query);
    const total = yield repository_1.default.findManyCount(User_1.default, { _id: { $in: user.friends } });
    if (!result)
        return null;
    const friends = result.map((friend) => {
        const { id, name, friends } = friend;
        return { id, name, friends };
    });
    return { total, friends };
});
const sendFriendRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repository_1.default.updateOne(User_1.default, userId, { $addToSet: { outputFriendsRequests: friendId } });
        yield repository_1.default.updateOne(User_1.default, friendId, { $addToSet: { incomingFriendsRequests: userId } });
        return true;
    }
    catch (error) {
        return null;
    }
});
const confirmFriendsRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repository_1.default.updateOne(User_1.default, userId, { $pull: { incomingFriendsRequests: friendId }, $push: { friends: friendId } });
        yield repository_1.default.updateOne(User_1.default, friendId, { $pull: { outputFriendsRequests: userId }, $push: { friends: userId } });
        return true;
    }
    catch (error) {
        return null;
    }
});
const rejectFriendsRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repository_1.default.updateOne(User_1.default, userId, { $pull: { incomingFriendsRequests: friendId } });
        yield repository_1.default.updateOne(User_1.default, friendId, { $pull: { outputFriendsRequests: userId } });
        return true;
    }
    catch (error) {
        return null;
    }
});
const deleteFriend = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repository_1.default.updateOne(User_1.default, userId, { $pull: { friends: friendId } });
        yield repository_1.default.updateOne(User_1.default, friendId, { $pull: { friends: userId } });
        return true;
    }
    catch (error) {
        return null;
    }
});
exports.default = {
    findBy,
    getFriends,
    sendFriendRequest,
    confirmFriendsRequest,
    rejectFriendsRequest,
    deleteFriend,
    findById,
};
