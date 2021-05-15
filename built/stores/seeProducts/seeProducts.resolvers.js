"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeProducts: (_, { storeId }) => client_1.default.product.findMany({
            where: {
                storeId
            }
        }),
    }
};
//# sourceMappingURL=seeProducts.resolvers.js.map