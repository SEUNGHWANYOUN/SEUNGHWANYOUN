import client from "../../client"

export default {
    subscription :{
        orderUpdates: (_, { storeId }) =>    
            client.order.findMany({
                where:{
                    storeId,
                }
 
            }),
              
}
}