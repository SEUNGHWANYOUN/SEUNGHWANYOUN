"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Subscription {
    roomUpdates(id: Int!): Message
  }
`;
//# sourceMappingURL=roomUpdates.typeDefs.js.map