import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfileAdress(
      address: String
      address_detail: String!
      roadAddress: String
      roadAddress_detail: String!
      
    ): MutationResponse!
  }
`;
