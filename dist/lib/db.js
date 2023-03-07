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
const mongoose_1 = __importDefault(require("mongoose"));
const { connect, connection, set } = mongoose_1.default;
set('strictQuery', false);
const uri = process.env.URI_DB || '';
const db = connect(uri, {});
connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});
connection.on('err', err => {
    console.log(`Mongoose connection error: ${err.message}`);
});
connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    connection.close();
    console.log('Connection DB Close');
    process.exit(1);
}));
exports.default = db;
