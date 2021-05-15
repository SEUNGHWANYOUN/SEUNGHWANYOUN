"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const graphql_tools_1 = require("graphql-tools");
const loadedTypes = graphql_tools_1.loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = graphql_tools_1.loadFilesSync(`${__dirname}/**/*.resolvers.js`);
exports.typeDefs = graphql_tools_1.mergeTypeDefs(loadedTypes);
exports.resolvers = graphql_tools_1.mergeResolvers(loadedResolvers);
//# sourceMappingURL=schema.js.map