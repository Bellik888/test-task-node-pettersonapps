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
exports.isInIncoming = exports.isUserInFriends = exports.isUserAlreadyAdded = exports.validateQuery = exports.validateFindBy = exports.validateID = void 0;
const constants_1 = require("./../../lib/constants");
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const querySchema = joi_1.default.object({
    limit: joi_1.default.number().min(0).max(1000).optional(),
    skip: joi_1.default.number().min(0).optional(),
});
const validateID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
    next();
});
exports.validateID = validateID;
const validateFindBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, nickname } = req.body || {};
    if (name && nickname) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ code: constants_1.HttpCode.BAD_REQUEST, message: 'Only name or nickname' });
    }
    if (!name && !nickname) {
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ code: constants_1.HttpCode.BAD_REQUEST, message: 'Name or nickname is required' });
    }
    next();
});
exports.validateFindBy = validateFindBy;
const validateQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield querySchema.validateAsync(req.query);
    }
    catch (err) {
        return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` });
    }
    next();
});
exports.validateQuery = validateQuery;
const isUserAlreadyAdded = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { id: friendId } = req.params;
    if (user.friends.includes(friendId) ||
        user.incomingFriendsRequests.includes(friendId) ||
        user.outputFriendsRequests.includes(friendId)) {
        return res.status(constants_1.HttpCode.CONFLICT).json({ code: constants_1.HttpCode.CONFLICT, message: 'Friend already added' });
    }
    if (user.id === friendId)
        return res
            .status(constants_1.HttpCode.BAD_REQUEST)
            .json({ code: constants_1.HttpCode.BAD_REQUEST, message: "Can't sent request to yourself" });
    next();
});
exports.isUserAlreadyAdded = isUserAlreadyAdded;
const isUserInFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { id: friendId } = req.params;
    if (user.friends.includes(friendId)) {
        return res.status(constants_1.HttpCode.CONFLICT).json({ code: constants_1.HttpCode.CONFLICT, message: 'Friend already added' });
    }
    next();
});
exports.isUserInFriends = isUserInFriends;
const isInIncoming = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { id: friendId } = req.params;
    if (user.incomingFriendsRequests.includes(friendId)) {
        return res.status(constants_1.HttpCode.CONFLICT).json({ code: constants_1.HttpCode.CONFLICT, message: 'Friend already added' });
    }
    next();
});
exports.isInIncoming = isInIncoming;
