"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users/");
const guard_1 = __importDefault(require("../../middleware/guard"));
const router = (0, express_1.Router)();
router.get('/', guard_1.default, users_1.getUser);
// router.get('/all-friends', guard, getFriends)
// router.post('/send-request/:id', guard, validateID, sendFriendsRequest)
// router.post('/confirm-request/:id', guard, validateID, confirmFriendsRequest)
// router.post('/reject-request/:id', guard, validateID, rejectFriendsRequest)
// router.delete('/delete-friend/:id', guard, validateID, deleteFriend)
// router.get('/find-by', guard, validateFindBy, findUserBy)
exports.default = router;
