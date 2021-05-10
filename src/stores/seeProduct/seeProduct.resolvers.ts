import client from "../../client"

export default {
    Query :{
        seeProduct: (_, { id }) =>    
            client.product.findUnique({
                where:{
                    id
                }
 
            }),
              
}
}