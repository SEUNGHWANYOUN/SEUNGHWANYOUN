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
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeFollowers: (_, { username, page }) => __awaiter(void 0, void 0, void 0, function* () {
            const ok = yield client_1.default.user.findUnique({
                where: { username },
                select: { id: true },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            const followers = yield client_1.default.user
                .findUnique({ where: { username } })
                .followers({
                take: 5,
                skip: (page - 1) * 5,
            });
            const totalFollowers = yield client_1.default.user.count({
                where: { following: { some: { username } } },
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            };
        }),
    },
};
//# sourceMappingURL=seeFollowers.resolvers.js.map