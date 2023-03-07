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
const errors_1 = __importDefault(require("../../lib/errors"));
const user_service_1 = __importDefault(require("../../service/user.service"));
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname } = res.locals.user;
    const user = { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname };
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: { user: user } });
});
exports.getUser = getUser;
const findUserBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const result = yield user_service_1.default.findBy(user, req.body);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: result });
});
exports.findUserBy = findUserBy;
const getFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const result = yield user_service_1.default.getFriends(user, req.query);
    if (!result)
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, data: result });
});
exports.getFriends = getFriends;
const sendFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { id: friendId } = req.params;
    const result = yield user_service_1.default.sendFriendRequest(user.id, friendId);
    if (!result) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'success' });
});
exports.sendFriendsRequest = sendFriendsRequest;
const confirmFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { id: friendId } = req.params;
    const response = yield user_service_1.default.confirmFriendsRequest(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'success' });
});
exports.confirmFriendsRequest = confirmFriendsRequest;
const rejectFriendsRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    const response = yield user_service_1.default.rejectFriendsRequest(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ code: constants_1.HttpCode.BAD_REQUEST, message: 'Fail' });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'success' });
});
exports.rejectFriendsRequest = rejectFriendsRequest;
const deleteFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const { id: friendId } = req.params;
    const response = yield user_service_1.default.deleteFriend(user.id, friendId);
    if (!response) {
        return res.status(constants_1.HttpCode.NOT_FOUND).json({ code: constants_1.HttpCode.NOT_FOUND, message: errors_1.default.NOT_FOUND });
    }
    return res.status(constants_1.HttpCode.OK).json({ code: constants_1.HttpCode.OK, message: 'success' });
});
exports.deleteFriend = deleteFriend;
