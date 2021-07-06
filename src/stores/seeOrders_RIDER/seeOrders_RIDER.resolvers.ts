import client from "../../client"
import { protectedResolver } from "../../users/users.utils";

export default {
    Query :{
        seeOrders_RIDER: protectedResolver(async(_, { address },  {loggedInUser} ) =>    
            client.order.findMany({
                where:{
                    address,
                    OR:[
                        {
                            status: {
                                not: "Pending",
                              },
                        },
                        // {
                        //     riderId:loggedInUser.id
                        // },
                        // {
                        //     riderId:null
                        // },
                        



                    ]

                    

                      //추가로 아직 라이더가 잡히지 않은거

                    // OR:[
                    //     {
                    //         //수거할 배탕 용품
                    //         status:{
                    //             equals:"Apccept",
                    //         },

                    //     },
                    //     {
                    //         //배송해야할 배배탈
                    //         status:{
                    //             equals:"WC",
                    //         },
                    //     }
                    
                    // ]



                },
                
                
 
            }),
              
        )}
}