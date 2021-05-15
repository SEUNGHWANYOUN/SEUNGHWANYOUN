"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
    type Mutation {
        createProduct( name: String!, price: Int!, photo: Upload!, storeId: Int! ,options: String): MutationResponse!
    }
`;
//# sourceMappingURL=createProduct.typeDefs.js.map