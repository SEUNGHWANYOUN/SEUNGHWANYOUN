import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editOrder(id: Int!, status: String!): MutationResponse!
  }
`;
