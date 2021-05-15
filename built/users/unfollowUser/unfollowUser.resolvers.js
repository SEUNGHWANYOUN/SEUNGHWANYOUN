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
const users_utils_1 = require("../users.utils");
exports.default = {
    Mutation: {
        unfollowUser: users_utils_1.protectedResolver((_, { username }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const ok = yield client_1.default.user.findUnique({
                where: { username },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Can't unfollow user.",
                };
            }
            yield client_1.default.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        })),
    },
};
//# sourceMappingURL=unfollowUser.resolvers.js.map