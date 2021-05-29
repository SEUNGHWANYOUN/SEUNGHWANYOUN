import client from "../../client"

export default {
    Query :{
        seeStores: (_, { address }) =>    
            client.store.findMany({
                where:{
                    address
                },
                
            }),
              
}
}