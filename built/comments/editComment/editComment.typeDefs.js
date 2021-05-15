"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Mutation {
    editComment(id: Int!, payload: String!): MutationResponse!
  }
`;
//# sourceMappingURL=editComment.typeDefs.js.map