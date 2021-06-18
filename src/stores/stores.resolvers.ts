import client from "../client";

export default {
     Store: {

     user: ({ id }) => client.store.findUnique({ where: { id } }).user(),
      
        products: ({ id }) => client.store.findUnique({ where: { id } }).products(),
        orders: ({ id }) => client.store.findUnique({ where: { id } }).orders(),
        
    },

     Product: {
        
     },

     Order :{
          // order list 에서 추가적인 정보 및 다이렉트 메시지 보내기 위해여 6/ 18일 추가
          user: ({ id }) => client.order.findUnique({ where: { id } }).user(),
          // order list 에서 추가적인 정로블 보기 위해여 6/18 일 추가 
          store: ({id}) => client.order.findUnique({where: {id} }).store(),
          //user: ({ userId }) => client.order.findUnique({ where: { id :userId } }).user(),
          order_items: ({ id }) => client.order.findUnique({ where: { id } }).order_items(),
     },

     Order_Item :{

          // productId: ({ id }) => client.order_Item.findUnique({ where: { id } }).product(),
     }

};
