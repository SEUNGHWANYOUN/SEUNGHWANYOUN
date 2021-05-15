"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const users_utils_1 = require("./users/users.utils");
const PORT = process.env.PORT || '5000';
const RootSchema = apollo_server_express_1.gql `
     extend type Query {
      root: String
  }

`;
const RootResolver = {
    Dumy: {
        root: () => 'Root resolver is running!',
    },
};
const apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: [schema_1.typeDefs, RootSchema],
    resolvers: [schema_1.resolvers],
    playground: true,
    introspection: true,
    context: (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.req) {
            return {
                loggedInUser: yield users_utils_1.getUser(ctx.req.headers.token),
            };
        }
        else {
            const { connection: { context }, } = ctx;
            return {
                loggedInUser: context.loggedInUser,
            };
        }
    }),
    subscriptions: {
        onConnect: (token) => __awaiter(void 0, void 0, void 0, function* () {
            if (!token) {
                throw new Error("You can't listen.");
            }
            const loggedInUser = yield users_utils_1.getUser(token);
            return {
                loggedInUser,
            };
        }),
    },
});
let app = express_1.default();
app.use(morgan_1.default("dev"));
apollo.applyMiddleware({ app });
app.use("/static", express_1.default.static("uploads"));
const httpServer = http_1.default.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀Server is running on http://localhost:${PORT} good!!!!✅`);
});
//# sourceMappingURL=server.js.map