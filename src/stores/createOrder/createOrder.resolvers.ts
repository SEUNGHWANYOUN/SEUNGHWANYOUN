import { json } from "express";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{

    
    Mutation: {
        createOrder: protectedResolver(async(_,{ input: {storeId, items, owner_commit, rider_commit }}, {loggedInUser})=>{
            try {
            const store = await client.store.findUnique(({
                where: {
                    id : storeId,
                }
            }));
            if(!store){
                return {
                    ok: false,
                    error: 'Store not found',
                  };
            }

                //유저의 최종 합계 넣어줌
                let orderFinalPrice = 0;
                //유저가 선택한 값만 넣어줌
                var orderItems = [];

                //for문 들어가기전에 임시로 주문을 만들어줌
                const order = await client.order.create({
                    data:{        
                        storeId: store.id,
                        userId:loggedInUser.id,
                        total: orderFinalPrice,
                        adress:loggedInUser.adress,
                        owner_commit,
                        rider_commit,
                    }
                });
                

                for (const item of items) {
                    const product = await client.product.findFirst({
                        where : {
                            id:item.productId,
                        }
                    });
                    if (!product) {
                      return {
                        ok: false,
                        error: 'Product not found.',
                      };
                    }
                    //기본 제품의 가격을 가져와서 넣어준다
                    let productFinalPrice = product.price;
                    //console.log(productFinalPrice);

                    //제품의 옵션값이 없으면 예외처리
                    if(item.options && item.options !== "null" && item.options !=="undefined"){
                     for(const itemOption of JSON.parse(item.options)){
                        console.log(itemOption);

                        //DB에서 유저가 선택한 값이 맞는지 검사해준다 
                        const productOption = JSON.parse(product.options).find(
                            productOption => productOption.name === itemOption.name,);
                    
                            console.log("찾은 값" +productOption);

                        //유저가 선택한 메뉴가 DB에 있다면
                        if(productOption){
                            //메뉴의 가격이 있다면                    
                            if(productOption.extra){
                                productFinalPrice = productFinalPrice + productOption.extra;
                                console.log(productOption.extra);
                            }else{
                                //유저가 선택한 값이 진짜로 있는지 확인해 보기
                                const productOptionChoice = productOption.choices?.find(
                                    optinChoice => optinChoice.name === itemOption.choice,
                                );

                                //추가로 선택한 옵션에 설정한 가격이 있다면
                                if(productOptionChoice.extra){
                                    productFinalPrice = productFinalPrice + productOptionChoice.extra;

                                }
                            }
                        }
                        //DB에서 유저가 선택한 값 내용으로 변경
                        orderItems=productOption;
                    }
                    console.log("옵션 예외처리 정상");

                }


                    //총 합산한급액
                    orderFinalPrice = orderFinalPrice + productFinalPrice;
                    console.log(orderItems);

                    //주문한거에 맞는 메뉴내용을 만들어줘서 연결해 줍니다~
                   await client.order_Item.create({
                        data:{
                            productId:product.id,
                            options: JSON.stringify(orderItems),
                            orderId: order.id,
                            

                        }
                    });
                 
                }
                
                //임시로 만들어준 주문을 정확하게 가격을 수정
                 await client.order.update({
                    where:{
                        id: order.id,
                    },
                    data:{        
                        //stroeId: store.id,
                        //userId:loggedInUser.id,

                        //최종 가격에 + 배달비 추가해주기
                        total: orderFinalPrice+store.riderprice,
                    }
                });
                return{
                    ok :true,
            };
                
            } catch (error) {
                return{
                    ok :false,
                    error: "can't create order"
                
            };
                
            }

        })
        // createOrder: protectedResolver(async(_,{userId, StoreID, total, status}, {loggedInUser})=>{
        //     const ok = client.order.create({
        //         data: {
        //             userId: loggedInUser,
        //             StoreID,
        //             total,
        //             status,
        //         }
        //     });
        //     return{
        //         ok: true,
        //     };
        // }),
    }
}