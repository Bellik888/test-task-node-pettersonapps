"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../../controllers/posts");
const guard_1 = __importDefault(require("../../middleware/guard"));
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/create', guard_1.default, validation_1.validateCreate, posts_1.createPost);
router.put('/update/:id', guard_1.default, validation_1.validateID, validation_1.validateUpdate, posts_1.updatePost);
router.delete('/delete/:id', guard_1.default, validation_1.validateID, posts_1.deletePost);
router.get('/friends-posts', guard_1.default, validation_1.validateQuery, posts_1.getAllFriendsPosts);
exports.default = router;
