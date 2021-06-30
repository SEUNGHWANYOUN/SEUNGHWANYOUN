import { withFilter } from "apollo-server";
import client from "../../client";
import {  NEW_ORDER } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    orderUpdates: {
 
     // subscribe: () => pubsub.asyncIterator(NEW_ORDER),
      subscribe: async (root, args, context, info) => {
       // console.log(11);
        const orders = await client.order.findFirst({
          where: {
            // id: args.id,
            // users: {
            //   some: {
            //     id: context.loggedInUser.id,
            //   },
            // },
            storeId: args.storeId,
          },
          select: {
            id: true,
          },
        });
        if (!orders) {
          throw new Error("You shall not see this.");
        }
        //console.log(orders);

        
        return withFilter(
          () => pubsub.asyncIterator(NEW_ORDER),
          async ({ orderUpdates }, { storeId }, { loggedInUser }) => {
            //검증하는 절차 볼 스토어의 값과 업데이트하는 내요이 같으면 
            if (orderUpdates.storeId === storeId) {
              const orders = await client.order.findFirst({
                where: {
                  // id,
                  // users: {
                  //   some: {
                  //     id: loggedInUser.id,
                  //   },
                  // },
                  storeId: args.storeId,
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