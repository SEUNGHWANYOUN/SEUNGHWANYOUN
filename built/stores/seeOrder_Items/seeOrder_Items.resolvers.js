"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
exports.default = {
    Query: {
        seeOrder_Items: (_, { orderId }) => client_1.default.order_Item.findMany({
            where: {
                orderId,
            },
        }),
    }
};
//# sourceMappingURL=seeOrder_Items.resolvers.js.map