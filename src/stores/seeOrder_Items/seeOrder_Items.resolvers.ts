import client from "../../client"

export default {
    Query :{
        seeOrder_Items: (_, { orderId }) =>    
            client.order_Item.findMany({
                where:{
                    orderId,
                }
 
            }),
              
}
}