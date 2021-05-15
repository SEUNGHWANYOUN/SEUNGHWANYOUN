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
exports.protectedResolver = exports.getUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../client"));
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return null;
        }
        const { id } = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield client_1.default.user.findUnique({ where: { id } });
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (_a) {
        return null;
    }
});
exports.getUser = getUser;
function protectedResolver(ourResolver) {
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            const query = info.operation.operation === "query";
            if (query) {
                return null;
            }
            else {
                return {
                    ok: false,
                    error: "Please log in to perform this action.",
                };
            }
        }
        return ourResolver(root, args, context, info);
    };
}
exports.protectedResolver = protectedResolver;
//# sourceMappingURL=users.utils.js.map