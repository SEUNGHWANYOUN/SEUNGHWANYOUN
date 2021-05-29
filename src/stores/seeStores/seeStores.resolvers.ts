import client from "../../client"

export default {
    Query :{
        seeStores: async(_, { address }) =>  {
        const dsa =address.split(" ");
        const address_search = dsa[0]+" "+dsa[1]+" "+dsa[2];
        const result = await client.$queryRaw(
            'SELECT * FROM "Store" WHERE address ilike $1 ORDER BY state DESC', // Using %$2 here would not work
            `%${address_search}%`, 
        );
        return result;
        }


        }  
            // client.store.findMany({
            //     where:{
            //         address
            //     },
                
            // }),
            //}
}