import { gql } from "apollo-server";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    statusUpdate: protectedResolver(async (_, { id, status }, { loggedInUser }) => {
      try {
        
        //상태값 변경
        if(status==="Pending"){
            status = "Apccept"

        }else if (status==="Apccept"){
            status = "Collecting"

        }else if (status==="Delivery"){
            status = "DC"

        }else if (status==="Collecting"){
            status = "CC"

        }else if (status==="CC"){
            status = "Washing"

        }else if (status==="Washing"){
            status = "WC"

        }else if (status==="WC"){
            status = "Delivery"

        }
          const order = await client.order.findFirst({
              where:{
                  store:{
                      userId:loggedInUser.id,
                  }
              }
          })
          if(!order){
              return{
                ok :false,
                error: "가지고 있는 (가게)권한이 없습니다."
              }
          }

          console.log(status)

          const status_update = await client.order.update({
              where: {
                  id:id,

              },
              data:{
                  status,

              }
          })
        //   if(!status_update){
        //     return{
        //         ok :false,
        //         error: "수정할 주문이 없습니다."
        //       }

        //   }

        //ok로 오면 화면 재갱신

          return{
              ok:true
          }

      } catch (error) {
        return{
            ok :false,
            error: "상태값을 수정할 수 없습니다."+error
          }
      }
    }),
  },
};
