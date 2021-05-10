import { gql } from "apollo-server";

export default gql`
    type Mutation {
        createProduct( name: String!, price: Int!, photo: Upload!, storeId: Int! ,options: String): MutationResponse!
    }
`;