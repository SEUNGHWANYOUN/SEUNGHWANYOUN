import client from "../../client"

export default {
    Query :{
        seeProducts: (_, { storeId }) =>    
            client.product.findMany({
                where:{
                    storeId
                }
 
            }),
              
}
}