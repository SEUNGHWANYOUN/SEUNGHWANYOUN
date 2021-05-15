"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeStore: (_, { id }) => client_1.default.store.findUnique({
            where: {
                id,
            },
        }),
    }
};
//# sourceMappingURL=seeStore.resolvers.js.map