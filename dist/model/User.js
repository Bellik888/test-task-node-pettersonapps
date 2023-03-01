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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Set  user name'] },
    nickname: { type: String, default: null },
    email: {
        type: String,
        require: [true, 'Set email for user'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/;
            return re.test(String(value).trim().toLocaleLowerCase());
        },
    },
    password: { type: String, require: [true, 'Set password for user'] },
    token: { type: String, default: null },
    friends: { type: [String], default: [] },
    incomingFriendsRequests: { type: [String], default: [] },
    outputFriendsRequests: { type: [String], default: [] },
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            return ret;
        },
    },
    toObject: {},
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const salt = yield bcryptjs_1.default.genSalt(6);
            this.password = yield bcryptjs_1.default.hash(this.password, salt);
        }
        next();
    });
});
userSchema.method('isValidPassword', function isValidPassword(password) {
    return bcryptjs_1.default.compare(password, this.password);
});
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
