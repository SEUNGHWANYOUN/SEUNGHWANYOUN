"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
exports.default = {
    Room: {
        users: ({ id }) => client_1.default.room.findUnique({ where: { id } }).users(),
        messages: ({ id }) => client_1.default.message.findMany({
            where: {
                roomId: id,
            },
            orderBy: {
                createdAt: "asc",
            },
        }),
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0;
            }
            return client_1.default.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id,
                        },
                    },
                },
            });
        },
    },
    Message: {
        user: ({ id }) => client_1.default.message.findUnique({ where: { id } }).user(),
    },
};
//# sourceMappingURL=messages.resolvers.js.map