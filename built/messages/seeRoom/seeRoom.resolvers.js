"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Query: {
        seeRoom: users_utils_1.protectedResolver((_, { id }, { loggedInUser }) => client_1.default.room.findFirst({
            where: {
                id,
                users: {
                    some: {
                        id: loggedInUser.id,
                    },
                },
            },
        })),
    },
};
//# sourceMappingURL=seeRoom.resolvers.js.map