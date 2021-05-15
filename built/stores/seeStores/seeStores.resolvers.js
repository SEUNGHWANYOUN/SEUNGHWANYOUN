"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeStores: (_, { adress }) => client_1.default.store.findMany({
            where: {
                adress
            },
        }),
    }
};
//# sourceMappingURL=seeStores.resolvers.js.map