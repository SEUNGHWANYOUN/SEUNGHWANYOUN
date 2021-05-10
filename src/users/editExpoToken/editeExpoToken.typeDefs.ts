import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editeExpoToken(id: Int!, expotoken: String!): MutationResponse!
  }
`;
