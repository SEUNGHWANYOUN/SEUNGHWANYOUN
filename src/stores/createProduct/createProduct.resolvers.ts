import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        createProduct: protectedResolver(async(_,{photo, name, price, storeId, options},{loggedInUser}) =>{
            const ok = await client.store.findFirst({
                where:{
                    userId : loggedInUser.id,
                },         
            });
            if(!ok.userId){
                return{
                    ok: false,
                    error: "Store is not found ",
                };
            // }else if (ok.userId !==  storeId){
            //     return{
            //         ok: false,
            //         error: "this Store is not your"            
            //     }
            }else{

                const fileUrl = await uploadToS3(photo, loggedInUser.id, "products");
                await client.product.create({
                    data:{
                        photo: fileUrl,
                        name,
                        price,  
                        //폴링키라서 입력된 값으로 넣을려고 하면 안됨 storeId [x]
   //                     storeId: ok.id,    
                        storeId,
                        options,   
                    }
                });
                return {
                    ok: true
                };
            }

        }),
    }
}