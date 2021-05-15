"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
  type Query {
    seePhoto(id: Int!): Photo
  }
`;
//# sourceMappingURL=seePhoto.typeDefs.js.map