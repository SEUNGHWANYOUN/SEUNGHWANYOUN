import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createStore(
            name: String! 
            mainimg: Upload!
            address: String
            phone: String
    ): MutationResponse!
  }
`;


