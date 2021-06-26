import client from "../../client"

export default {
    Query :{
        seeOrders_OWNER: (_, { storeId }) =>    
            client.order.findMany({
                where:{
                    storeId,
                }
 
            }),
              
}
}