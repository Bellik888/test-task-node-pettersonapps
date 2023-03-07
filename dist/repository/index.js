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
Object.defineProperty(exports, "__esModule", { value: true });
const create = (Model, body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.create(body);
});
const updateOne = (Model, id, body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.findOneAndUpdate({ _id: id }, body, { new: true });
});
const deleteOne = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.findOneAndDelete({ _id: id });
});
const findOne = (Model, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.findOne(query);
});
const findById = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.findById(id).select('-password');
});
const findMany = (Model, options, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip = 0, limit = 0 } = query || {};
    return yield Model.find(options).skip(Number(skip)).limit(Number(limit));
});
const findManyCount = (Model, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Model.find(options).countDocuments();
});
exports.default = { create, updateOne, deleteOne, findOne, findMany, findManyCount, findById };
