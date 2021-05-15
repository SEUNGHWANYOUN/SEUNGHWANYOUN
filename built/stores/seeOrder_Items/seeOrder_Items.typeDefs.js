"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
type Query {
    seeOrder_Items(orderId : Int!):[Order_Item]
}

`;
//# sourceMappingURL=seeOrder_Items.typeDefs.js.map