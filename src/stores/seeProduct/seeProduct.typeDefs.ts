import { gql } from "apollo-server";

export default gql`

      type Query{
          seeProduct(id :Int!) :Product! 
      }
`;