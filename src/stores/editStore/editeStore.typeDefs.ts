import { gql } from "apollo-server";

export default gql`
    type Mutation {
        editStore(id: Int,mainimg: String!, name: String!, adress: String!, phone: String!): MutationResponse!
    }
`;

