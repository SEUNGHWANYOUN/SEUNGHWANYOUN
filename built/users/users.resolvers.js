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
const client_1 = __importDefault(require("../client"));
exports.default = {
    User: {
        totalFollowing: ({ id }) => client_1.default.user.count({
            where: {
                followers: {
                    some: {
                        id,
                    },
                },
            },
        }),
        totalFollowers: ({ id }) => client_1.default.user.count({
            where: {
                following: {
                    some: {
                        id,
                    },
                },
            },
        }),
        totalPosts: ({ id }) => client_1.default.user.count({
            where: {
                photos: {
                    some: {
                        id,
                    },
                },
            },
        }),
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: ({ id }, _, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!loggedInUser) {
                return false;
            }
            const exists = yield client_1.default.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id,
                        },
                    },
                },
            });
            return Boolean(exists);
        }),
        stores: ({ id }) => client_1.default.user.findUnique({ where: { id } }).stores(),
        photos: ({ id }) => client_1.default.user.findUnique({ where: { id } }).photos(),
        orders: ({ id }) => client_1.default.user.findUnique({ where: { id } }).orders(),
    },
};
//# sourceMappingURL=users.resolvers.js.map