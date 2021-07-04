import { gql } from "apollo-server";

export default gql`
 type Mutation{
    statusUpdate(id: Int!, status: String!): MutationResponse!
 }
`;