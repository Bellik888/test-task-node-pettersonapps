"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../../controllers/comments");
const guard_1 = __importDefault(require("../../middleware/guard"));
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/create', guard_1.default, validation_1.validateCreate, comments_1.createComment);
router.put('/update/:id', guard_1.default, validation_1.validateID, validation_1.validateUpdate, comments_1.updateComment);
router.delete('/delete/:id', guard_1.default, validation_1.validateID, comments_1.deleteComment);
exports.default = router;
