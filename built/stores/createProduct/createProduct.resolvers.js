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
const shared_utils_1 = require("../../shared/shared.utils");
exports.default = {
    Mutation: {
        createProduct: users_utils_1.protectedResolver((_, { photo, name, price, storeId, options }, { loggedInUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const ok = yield client_1.default.store.findFirst({
                where: {
                    userId: loggedInUser.id,
                },
            });
            if (!ok.userId) {
                return {
                    ok: false,
                    error: "Store is not found ",
                };
                // }else if (ok.userId !==  storeId){
                //     return{
                //         ok: false,
                //         error: "this Store is not your"            
                //     }
            }
            else {
                const fileUrl = yield shared_utils_1.uploadToS3(photo, loggedInUser.id, "products");
                yield client_1.default.product.create({
                    data: {
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
        })),
    }
};
//# sourceMappingURL=createProduct.resolvers.js.map