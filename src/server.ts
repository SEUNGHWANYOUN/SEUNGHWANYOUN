require("dotenv").config();
import  http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";


const PORT = process.env.PORT || 5000;
const RootSchema = gql`
     extend type Query {
      root: String
  }

`;
const RootResolver = {
  Dumy: {
    root: () => 'Root resolver is running!',
  },
};


const apollo = new ApolloServer({ 
  typeDefs: [typeDefs, RootSchema],
  resolvers: [resolvers], 
  playground : true,
  introspection : true,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ( token ) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});


let app = express();
app.use(logger("dev"));
apollo.applyMiddleware({ app }); 
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} good!!!!✅`);
});
