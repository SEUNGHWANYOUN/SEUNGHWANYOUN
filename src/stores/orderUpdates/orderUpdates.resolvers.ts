import { withFilter } from "apollo-server";
import client from "../../client";
import {  NEW_ORDER } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    orderUpdates: {
     // subscribe: () => pubsub.asyncIterator(NEW_ORDER),
      subscribe: async (root, args, context, info) => {
        const orders = await client.order.findFirst({
          where: {
            // id: args.id,
            // users: {
            //   some: {
            //     id: context.loggedInUser.id,
            //   },
            // },
            storeId: context.loggedInUser.id,
          },
          select: {
            id: true,
          },
        });
        if (!orders) {
          throw new Error("You shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_ORDER),
          async ({ orderUpdates }, { storeId }, { loggedInUser }) => {
            if (orderUpdates.storeId === storeId) {
              const orders = await client.order.findFirst({
                where: {
                  // id,
                  // users: {
                  //   some: {
                  //     id: loggedInUser.id,
                  //   },
                  // },
                  storeId: context.loggedInUser.id,
                },
                select: {
                  id: true,
                },
              });
              if (!orders) {
                return false;
              }
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};