import { withFilter } from "apollo-server";
import client from "../../client";
import {  NEW_ORDER } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    orderUpdates: {
     // subscribe: () => pubsub.asyncIterator(NEW_ORDER),
      subscribe: async (root, args, context, info) => {
        console.log(11);
        const orders = await client.store.findFirst({
          where: {
            // id: args.id,
            // users: {
            //   some: {
            //     id: context.loggedInUser.id,
            //   },
            // },
            id: args.id,
          },
          select: {
            id: true,
            
          },
        });
        if (!orders) {
          throw new Error("You shall not see this.");
        }
        console.log(orders);

        
        return withFilter(
          () => pubsub.asyncIterator(NEW_ORDER),
          async ({ orderUpdates }, { id }, { loggedInUser }) => {
            //검증하는 절차 볼 스토어의 값과 업데이트하는 내요이 같으면 
            console.log("여가꺼자 오")
            console.log(orderUpdates);
            console.log(orderUpdates.id);
            if (orderUpdates.storeId === id) {
              const orders = await client.store.findFirst({
                where: {
                  // id,
                  // users: {
                  //   some: {
                  //     id: loggedInUser.id,
                  //   },
                  // },
                  id: args.id,
                },
                select: {
                  id: true,
                },
              });
              if (!orders) {
                console.log("실패?");
                return false;
              }
              console.log("성공?");
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};