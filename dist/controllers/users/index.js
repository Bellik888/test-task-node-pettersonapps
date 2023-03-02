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
exports.findUserBy = exports.deleteFriend = exports.rejectFriendsRequest = exports.sendFriendsRequest = exports.confirmFriendsRequest = exports.getFriends = exports.getUser = void 0;
const constants_1 = require("../../lib/constants");
const user_1 = __importDefault(require("../../repository/user"));
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname } = res.locals.user;
    const user = { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname };
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, data: { user: user } });
});
exports.getUser = getUser;
const findUserBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const { name, nickname } = req.body;
    if (name && nickname) {
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Only name or nickname' });
    }
    if (!name && !nickname) {
    }
    const result = yield user_1.default.findUserBy(user, req.body);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ status: 'error', code: constants_1.HttpCode.NOT_FOUND, message: 'NOT FOUND' });
    }
    const users = result.users.map(friend => {
        const { id, name, friends, nickname } = friend;
        return { id, name, friends, nickname };
    });
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, data: { total: result.total, users } });
});
exports.findUserBy = findUserBy;
const getFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const result = yield user_1.default.getFriends(user);
    if (!result) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ status: 'error', code: constants_1.HttpCode.NOT_FOUND, message: 'NOT FOUND' });
    }
    const friends = result.friends.map(friend => {
        const { id, name, friends } = friend;
        return { id, name, friends };
    });
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, data: { total: result.total, friends } });
});
exports.getFriends = getFriends;
const sendFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const isInField = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'friends');
    const isInIncomingRequests = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'incomingFriendsRequests');
    const isIOutputRequests = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'outputFriendsRequests');
    if (isInField || isInIncomingRequests || isIOutputRequests) {
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Friend already added' });
    }
    const updatedUser = yield user_1.default.sendFriendRequest(user.id, friendId);
    if (!updatedUser) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, message: 'success' });
});
exports.sendFriendsRequest = sendFriendsRequest;
const confirmFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const isInFriends = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'friends');
    if (isInFriends) {
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Friend already added' });
    }
    const response = yield user_1.default.confirmFriendsRequest(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, message: 'success' });
});
exports.confirmFriendsRequest = confirmFriendsRequest;
const rejectFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const isInIncomingRequests = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'incomingFriendsRequests');
    if (!isInIncomingRequests) {
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'There are no requests' });
    }
    const response = yield user_1.default.rejectFriendsRequest(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ status: 'error', code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, message: 'success' });
});
exports.rejectFriendsRequest = rejectFriendsRequest;
const deleteFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    if (!user) {
        return res
            .status(constants_1.HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
    }
    const isInFriends = yield user_1.default.isFriendAlreadyInField(user.id, friendId, 'friends');
    if (!isInFriends) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ status: 'error', code: constants_1.HttpCode.NOT_FOUND, message: 'NOT FOUND' });
    }
    const response = yield user_1.default.deleteFriend(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ status: 'error', code: constants_1.HttpCode.NOT_FOUND, message: 'NOT FOUND' });
    }
    return res.status(constants_1.HttpCode.OK).json({ status: 'success', code: constants_1.HttpCode.OK, message: 'success' });
});
exports.deleteFriend = deleteFriend;
