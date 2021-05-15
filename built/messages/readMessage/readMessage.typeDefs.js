"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Mutation {
    readMessage(id: Int!): MutationResponse!
  }
`;
//# sourceMappingURL=readMessage.typeDefs.js.map