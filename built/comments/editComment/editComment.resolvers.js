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
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Mutation: {
        editComment: users_utils_1.protectedResolver((_, { id, payload }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const comment = yield client_1.default.comment.findUnique({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!comment) {
                return {
                    ok: false,
                    error: "Comment not found.",
                };
            }
            else if (comment.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "Not authorized.",
                };
            }
            else {
                yield client_1.default.comment.update({
                    where: {
                        id,
                    },
                    data: {
                        payload,
                    },
                });
                return {
                    ok: true,
                };
            }
        })),
    },
};
//# sourceMappingURL=editComment.resolvers.js.map