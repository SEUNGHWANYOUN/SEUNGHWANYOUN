"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Query: {
        seeFeed: users_utils_1.protectedResolver((_, { offset }, { loggedInUser }) => client_1.default.photo.findMany({
            take: 2,
            skip: offset,
            where: {
                OR: [
                    {
                        user: {
                            followers: {
                                some: {
                                    id: loggedInUser.id,
                                },
                            },
                        },
                    },
                    {
                        userId: loggedInUser.id,
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        })),
    },
};
//# sourceMappingURL=seeFeed.resolvers.js.map