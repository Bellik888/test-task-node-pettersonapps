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
const User_1 = __importDefault(require("../model/User"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(id).select('-password');
});
const updateToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.updateOne({ _id: id }, { token });
});
const removeToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.updateOne({ _id: id }, { token: null });
});
const isFriendAlreadyInField = (userId, friendId, field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ _id: userId });
    if ((_a = user === null || user === void 0 ? void 0 : user.get(field)) === null || _a === void 0 ? void 0 : _a.includes(friendId)) {
        return true;
    }
});
const getFriends = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield User_1.default.find({ _id: { $in: user.friends } });
    const total = yield User_1.default.find({ _id: { $in: user.friends } }).countDocuments();
    return { total, friends };
});
const sendFriendRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.updateOne({ _id: userId }, { $addToSet: { outputFriendsRequests: friendId } }, { new: true });
        yield User_1.default.updateOne({ _id: friendId }, { $addToSet: { incomingFriendsRequests: userId } }, { new: true });
        return true;
    }
    catch (error) {
        return null;
    }
});
const confirmFriendsRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.updateOne({ _id: userId }, { $pull: { incomingFriendsRequests: friendId }, $push: { friends: friendId } }, { new: true });
        yield User_1.default.updateOne({ _id: friendId }, { $pull: { outputFriendsRequests: userId }, $push: { friends: userId } }, { new: true });
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
const rejectFriendsRequest = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.updateOne({ _id: userId }, { $pull: { incomingFriendsRequests: friendId } }, { new: true });
        yield User_1.default.updateOne({ _id: friendId }, { $pull: { outputFriendsRequests: userId } }, { new: true });
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
const deleteFriend = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.updateOne({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
        yield User_1.default.updateOne({ _id: friendId }, { $pull: { friends: userId } }, { new: true });
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
const findUserBy = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find(Object.assign({ _id: { $ne: user.id } }, query));
    const total = yield User_1.default.find(Object.assign({ _id: { $ne: user.id } }, query)).countDocuments();
    return { total, users };
});
exports.default = {
    findByEmail,
    updateToken,
    removeToken,
    findById,
    getFriends,
    sendFriendRequest,
    confirmFriendsRequest,
    isFriendAlreadyInField,
    rejectFriendsRequest,
    deleteFriend,
    findUserBy,
};
