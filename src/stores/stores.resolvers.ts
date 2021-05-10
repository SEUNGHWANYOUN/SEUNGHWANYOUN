import client from "../client";

export default {
     Store: {
      
        products: ({ id }) => client.store.findUnique({ where: { id } }).products(),
        orders: ({ id }) => client.store.findUnique({ where: { id } }).orders(),
        
    },

     Product: {
        
     },

     Order :{

          order_items: ({ id }) => client.order.findUnique({ where: { id } }).order_items(),
     },

     Order_Item :{

          // productId: ({ id }) => client.order_Item.findUnique({ where: { id } }).product(),
     }

};
