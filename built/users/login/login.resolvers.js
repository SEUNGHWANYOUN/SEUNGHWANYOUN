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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Mutation: {
        login: (_, { username, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield client_1.default.user.findFirst({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            const passwordOk = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                };
            }
            const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        }),
    },
};
//# sourceMappingURL=login.resolvers.js.map