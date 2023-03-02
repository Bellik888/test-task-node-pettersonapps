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
exports.redirectToSuccess = exports.getErrorPage = exports.getSuccessPage = exports.authPage = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = require("passport-google-oauth");
const constants_1 = require("../../lib/constants");
const auth_service_1 = __importDefault(require("../../service/auth.service"));
const user_1 = __importDefault(require("../../repository/user"));
let userProfile;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'secret';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'secret';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'secretUrl';
passport_1.default.use(new passport_google_oauth_1.OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${GOOGLE_CALLBACK_URL}/oauth/google/callback`,
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name } = profile._json;
        try {
            const isUserExist = yield auth_service_1.default.isUserExist(email);
            if (!isUserExist) {
                yield auth_service_1.default.createUser({
                    email,
                    name,
                    nickname: name,
                });
            }
            const user = yield user_1.default.findByEmail(email);
            if (!user)
                return;
            const token = yield auth_service_1.default.getToken(user);
            if (token)
                yield auth_service_1.default.setToken(user.id, token);
            userProfile = Object.assign(Object.assign({}, profile), { token });
            return done(null, userProfile);
        }
        catch (error) {
            return done(error, null);
        }
    });
}));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
const authPage = (req, res, next) => {
    res.render('pages/auth');
};
exports.authPage = authPage;
const getSuccessPage = (req, res, next) => {
    console.log(userProfile);
    res.render('pages/success', { user: userProfile });
};
exports.getSuccessPage = getSuccessPage;
const getErrorPage = (req, res, next) => {
    res
        .status(constants_1.HttpCode.UNAUTHORIZED)
        .json({ status: 'error', code: constants_1.HttpCode.UNAUTHORIZED, message: 'Invalid credentials' });
};
exports.getErrorPage = getErrorPage;
const redirectToSuccess = (req, res, next) => {
    res.redirect('/oauth/success');
};
exports.redirectToSuccess = redirectToSuccess;
