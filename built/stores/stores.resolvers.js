"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
exports.default = {
    Store: {
        products: ({ id }) => client_1.default.store.findUnique({ where: { id } }).products(),
        orders: ({ id }) => client_1.default.store.findUnique({ where: { id } }).orders(),
    },
    Product: {},
    Order: {
        order_items: ({ id }) => client_1.default.order.findUnique({ where: { id } }).order_items(),
    },
    Order_Item: {
    // productId: ({ id }) => client.order_Item.findUnique({ where: { id } }).product(),
    }
};
//# sourceMappingURL=stores.resolvers.js.map