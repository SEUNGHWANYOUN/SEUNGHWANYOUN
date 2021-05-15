"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Query {
    searchUsers(keyword: String!): [User]
  }
`;
//# sourceMappingURL=searchUsers.typeDefs.js.map