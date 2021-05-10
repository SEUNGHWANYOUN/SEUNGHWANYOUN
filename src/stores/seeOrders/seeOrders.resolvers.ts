import client from "../../client"

export default {
    Query :{
        seeOrders: (_, { userId }) =>    
            client.order.findMany({
                where:{
                    userId,
                }
 
            }),
              
}
}