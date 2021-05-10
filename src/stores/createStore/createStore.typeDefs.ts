import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createStore(
            name: String! 
            mainimg: Upload!
            adress: String
            phone: String
    ): MutationResponse!
  }
`;


