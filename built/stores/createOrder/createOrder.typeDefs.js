"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
    type Mutation{
        createOrder( input: createOrderInput ): MutationResponse! 


    }

    input createOrderInput {
     storeId: Int!
     items: [createOrderItemInput],
     owner_commit: String
     rider_commit: String
    }

    input createOrderItemInput {
     productId: Int!
     options: String,

    }

    input OrderItemOptionInputTypeInput{
       name: String
       extra: Int
       choice: String
   }


  
`;
//# sourceMappingURL=createOrder.typeDefs.js.map