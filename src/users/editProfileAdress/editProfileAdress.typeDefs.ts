import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfileAdress(
      adress: String
      adress_road: String
      adress_detail: String!
    ): MutationResponse!
  }
`;
