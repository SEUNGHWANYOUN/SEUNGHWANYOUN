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
        readMessage: users_utils_1.protectedResolver((_, { id }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const message = yield client_1.default.message.findFirst({
                where: {
                    id,
                    userId: {
                        not: loggedInUser.id,
                    },
                    room: {
                        users: {
                            some: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                },
            });
            if (!message) {
                return {
                    ok: false,
                    error: "Message not found.",
                };
            }
            yield client_1.default.message.update({
                where: {
                    id,
                },
                data: {
                    read: true,
                },
            });
            return {
                ok: true,
            };
        })),
    },
};
//# sourceMappingURL=readMessage.resolvers.js.map