import client from "../../client"

export default {
    Query :{
        seeStores: (_, { adress }) =>    
            client.store.findMany({
                where:{
                    adress
                },
            }),
              
}
}