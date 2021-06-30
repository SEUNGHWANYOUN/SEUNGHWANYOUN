import client from "../../client"
import { protectedResolver } from "../../users/users.utils";

export default {
    Query :{
        seeOrders: protectedResolver(async(_, { userId },{loggedInUser}) =>    
            client.order.findMany({
                where:{
                    userId,
                }
 
            }),
        )
              
}
}