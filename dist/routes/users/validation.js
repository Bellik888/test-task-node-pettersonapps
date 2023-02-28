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
exports.validateFindBy = exports.validateID = void 0;
const constants_1 = require("./../../lib/constants");
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const findBySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(25).optional(),
    nickname: joi_1.default.string().min(3).max(25).optional(),
});
const validateID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id))
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
    next();
});
exports.validateID = validateID;
const validateFindBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield findBySchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` });
    }
    next();
});
exports.validateFindBy = validateFindBy;
