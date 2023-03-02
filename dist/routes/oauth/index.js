"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const oauth_1 = require("../../controllers/oauth");
const router = (0, express_1.Router)();
router.get('/', oauth_1.authPage);
router.get('/success', oauth_1.getSuccessPage);
router.get('/error', oauth_1.getErrorPage);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/oauth/error', session: false }), oauth_1.redirectToSuccess);
exports.default = router;
