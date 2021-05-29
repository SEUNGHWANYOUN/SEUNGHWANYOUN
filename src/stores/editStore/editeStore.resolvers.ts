import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editStore: protectedResolver(async(_,{id, address,name, phone, mainimg}, {loggedInUser})=> {

            const ok = await client.store.findFirst({
                where :{
                    id,
                    userId: loggedInUser.id,
                },
                // include : {
                //     products : {
                //         select :{
                //             photo: true,
                //             name: true,
                //             price : true,
                //             description: true,
                //             options: true,

                //         }
                //     }
                // }
            
            });
            if(!ok){
                return{
                    ok :false,
                    error: "Store is not found",
                };
            } 
   
            await client.store.update({

                where:{
                    id,
                },
                data:{
                    address,
                    phone,
                    mainimg,
                    name,
                    // products: {

                    // }
           


                }
            });
            return{
                ok :true,
            
            };
            
        }),
    }
};