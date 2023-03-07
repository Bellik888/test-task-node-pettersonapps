"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./lib/constants");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const comments_1 = __importDefault(require("./routes/comments"));
const oauth_1 = __importDefault(require("./routes/oauth"));
const errors_1 = __importDefault(require("./lib/errors"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use((0, express_session_1.default)({ secret: 'secret', resave: false, saveUninitialized: false, cookie: { maxAge: 60000 } }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: constants_1.LIMIT_JSON }));
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use(passport_1.default.session());
app.use(passport_1.default.initialize());
//routing
app.use('/api/auth', auth_1.default);
app.use('/oauth', oauth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/post', posts_1.default);
app.use('/api/comment', comments_1.default);
//error handlers
app.use((req, res) => {
    res.status(constants_1.HttpCode.NOT_FOUND).json({
        status: 'error',
        code: constants_1.HttpCode.NOT_FOUND,
        message: errors_1.default.NOT_FOUND,
    });
});
app.use((err, _req, res, _next) => {
    res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        code: constants_1.HttpCode.INTERNAL_SERVER_ERROR,
        message: err.message,
    });
});
exports.default = app;
