import client from "../../client"

export default {
    Query :{
        seeOrders_OWNER: (_, { id }) =>    
            client.order.findMany({
                where:{
                    storeId:id,
                }
 
            }),
              
}
}