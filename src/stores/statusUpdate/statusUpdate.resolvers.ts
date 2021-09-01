import { gql } from "apollo-server";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import pubsub from "../../pubsub"
import { NEW_ORDER } from "../../constants";

export default {
  Mutation: {
    statusUpdate: protectedResolver(async (_, { id, status }, { loggedInUser }) => {
      try {
        


        console.log(status);
        //오더라면 스토어 가기 주인인지 확인해 주고
        if(loggedInUser.role ==="OWNER"){
            console.log("여기오노?_OWNER")
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

        //라이더라면 상태값을 바꾸면서 아이디 값을 본인 값을 넣어준다
        }else if(loggedInUser.role ==="RIDER"){
            console.log("여기오노?_RIDER")
            //만약에 상태값이 Apccept 라면 아직 라이더가 잡지 않은 상태라고 판단하여 본인의 아이디 값을 넣어준다
            if(status==="Apccept"){
                await client.order.update({
                    where:{
                        id,
                    },
                    data: {
                        riderId: loggedInUser.id,
                    }
                    
                })
            }

            //상태값이 다른 값이라면 본인의 잡아둔 배달인지 확인해 준다
            const order_RIDER = await client.order.findFirst({
                where:{
                    riderId: loggedInUser.id,
                }
            })
            if(!order_RIDER){
                return{
                  ok :false,
                  error: "내가 소유한 배달이 아닙니다."
                }
            }
        }
        
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
          //갱신할수 있도록 해당 내영올
          pubsub.publish (NEW_ORDER, {orderUpdates:{...status_update}} );
          
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
