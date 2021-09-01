import { withFilter } from "apollo-server";
import client from "../../client";
import {  NEW_ORDER } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    orderUpdates: {
     // subscribe: () => pubsub.asyncIterator(NEW_ORDER),
      subscribe: async (root, args, context, info) => {
      
        const orders = await client.store.findFirst({
          where: {
            id: args.id,
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
          async ({ orderUpdates }, { id }, { loggedInUser }) => {
            //검증하는 절차 볼 스토어의 값과 업데이트하는 내요이 같으면 
          
            if (orderUpdates.storeId === id) {
              const orders = await client.store.findFirst({
                where: {
                  id: args.id,
                },
                select: {
                  id: true,
                },
              });

              console.log(orders);
              if (!orders) {
                console.log("실패?");
                return false;
              }
              console.log("orderUpdates 성공");
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};