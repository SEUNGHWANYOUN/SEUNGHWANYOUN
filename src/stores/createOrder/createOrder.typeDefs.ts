import { gql } from "apollo-server";

export default gql`
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