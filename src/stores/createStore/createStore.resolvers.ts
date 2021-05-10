import client from "../../client"
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        createStore:protectedResolver(async(_, {name, mainimg, phone, adress }, { loggedInUser }) => {
        try {   

            const fileUrl = await uploadToS3(mainimg, loggedInUser.id, "stores");
                const ok =  await client.store.create({
                    data: {
                        name,
                        mainimg : fileUrl,
                        phone,
                        adress,
                    
                    user: {
                        connect :{
                            id :loggedInUser.id,
                        }
                    },
                },
                
                });
                return {
                    ok :true
                } ;
            
            
        } catch (e) {
            return {
                ok :false,
                error: "cant create store"+e,
            };
        }

    }
),
},
};

