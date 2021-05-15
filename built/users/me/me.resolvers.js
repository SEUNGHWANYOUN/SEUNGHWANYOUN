"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../users.utils");
exports.default = {
    Query: {
        me: users_utils_1.protectedResolver((_, __, { loggedInUser }) => client_1.default.user.findUnique({
            where: {
                id: loggedInUser.id,
            },
        })),
    },
};
//# sourceMappingURL=me.resolvers.js.map