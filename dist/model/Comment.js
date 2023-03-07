"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, SchemaTypes } = mongoose_1.default;
const commentSchema = new Schema({
    comment: { type: String, default: '', required: true },
    postId: { type: SchemaTypes.ObjectId, required: true },
    authorId: { type: SchemaTypes.ObjectId, required: true },
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
const Comment = model('comment', commentSchema);
exports.default = Comment;
