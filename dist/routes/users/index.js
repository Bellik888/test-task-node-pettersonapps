"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users/");
const guard_1 = __importDefault(require("../../middleware/guard"));
const isUserExist_1 = __importDefault(require("../../middleware/isUserExist"));
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', guard_1.default, isUserExist_1.default, users_1.getUser);
router.get('/all-friends', guard_1.default, isUserExist_1.default, validation_1.validateQuery, users_1.getFriends);
router.post('/send-request/:id', [guard_1.default, validation_1.validateID, isUserExist_1.default, validation_1.isUserAlreadyAdded], users_1.sendFriendsRequest);
router.post('/confirm-request/:id', [guard_1.default, validation_1.validateID, isUserExist_1.default, validation_1.isUserInFriends, validation_1.isInIncoming], users_1.confirmFriendsRequest);
router.post('/reject-request/:id', [guard_1.default, validation_1.validateID, isUserExist_1.default, validation_1.isInIncoming], users_1.rejectFriendsRequest);
router.delete('/delete-friend/:id', [guard_1.default, validation_1.validateID, isUserExist_1.default, validation_1.isUserInFriends], users_1.deleteFriend);
router.get('/find-by', guard_1.default, validation_1.validateFindBy, isUserExist_1.default, users_1.findUserBy);
exports.default = router;
