"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
const users_utils_1 = require("../../users/users.utils");
exports.default = {
    Mutation: {
        createOrder: users_utils_1.protectedResolver((_, { input: { storeId, items, owner_commit, rider_commit } }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const store = yield client_1.default.store.findUnique(({
                    where: {
                        id: storeId,
                    }
                }));
                if (!store) {
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
                const order = yield client_1.default.order.create({
                    data: {
                        storeId: store.id,
                        userId: loggedInUser.id,
                        total: orderFinalPrice,
                        adress: loggedInUser.adress,
                        owner_commit,
                        rider_commit,
                    }
                });
                for (const item of items) {
                    const product = yield client_1.default.product.findFirst({
                        where: {
                            id: item.productId,
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
                    if (item.options && item.options !== "null" && item.options !== "undefined") {
                        for (const itemOption of JSON.parse(item.options)) {
                            console.log(itemOption);
                            //DB에서 유저가 선택한 값이 맞는지 검사해준다 
                            const productOption = JSON.parse(product.options).find(productOption => productOption.name === itemOption.name);
                            console.log("찾은 값" + productOption);
                            //유저가 선택한 메뉴가 DB에 있다면
                            if (productOption) {
                                //메뉴의 가격이 있다면                    
                                if (productOption.extra) {
                                    productFinalPrice = productFinalPrice + productOption.extra;
                                    console.log(productOption.extra);
                                }
                                else {
                                    //유저가 선택한 값이 진짜로 있는지 확인해 보기
                                    const productOptionChoice = (_a = productOption.choices) === null || _a === void 0 ? void 0 : _a.find(optinChoice => optinChoice.name === itemOption.choice);
                                    //추가로 선택한 옵션에 설정한 가격이 있다면
                                    if (productOptionChoice.extra) {
                                        productFinalPrice = productFinalPrice + productOptionChoice.extra;
                                    }
                                }
                                //DB에서 유저가 선택한 값 내용으로 변경 []배열 안으로 다시 넣어줌
                                orderItems.push(productOption);
                            }
                            //DB에서 유저가 선택한 값 내용으로 변경 []배열 안으로 다시 넣어줌
                            // orderItems=[productOption];
                        }
                    }
                    //총 합산한급액
                    orderFinalPrice = orderFinalPrice + productFinalPrice;
                    //console.log(orderItems);
                    //주문한거에 맞는 메뉴내용을 만들어줘서 연결해 줍니다~
                    yield client_1.default.order_Item.create({
                        data: {
                            productId: product.id,
                            options: JSON.stringify(orderItems),
                            orderId: order.id,
                        }
                    });
                    //한개의 주문_아이템을 만들고 배열 초기화
                    orderItems = [];
                }
                //임시로 만들어준 주문을 정확하게 가격을 수정
                yield client_1.default.order.update({
                    where: {
                        id: order.id,
                    },
                    data: {
                        //stroeId: store.id,
                        //userId:loggedInUser.id,
                        //최종 가격에 + 배달비 추가해주기
                        total: orderFinalPrice + store.riderprice,
                    }
                });
                return {
                    ok: true,
                };
            }
            catch (error) {
                return {
                    ok: false,
                    error: "can't create order"
                };
            }
        }))
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
};
//# sourceMappingURL=createOrder.resolvers.js.map